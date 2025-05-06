import { useState, useCallback } from 'react';

export const useLoanCalculation = () => {
  const [result, setResult] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [error, setError] = useState(null);

  const calculateLoan = useCallback((loanDetails) => {
    try {
      const { principal, interestRate, loanTerm } = loanDetails;

      const monthlyRate = interestRate / 12 / 100;

      const monthlyPayment =
        principal *
        monthlyRate *
        Math.pow(1 + monthlyRate, loanTerm) /
        (Math.pow(1 + monthlyRate, loanTerm) - 1);

      const totalPayment = monthlyPayment * loanTerm;
      const totalInterest = totalPayment - principal;

      const amortizationSchedule = [];
      let remainingBalance = principal;

      for (let i = 1; i <= loanTerm; i++) {
        const interestPaid = remainingBalance * monthlyRate;
        const principalPaid = monthlyPayment - interestPaid;
        remainingBalance -= principalPaid;

        amortizationSchedule.push({
          paymentNumber: i,
          paymentAmount: monthlyPayment,
          principalPaid,
          interestPaid,
          remainingBalance: Math.max(0, remainingBalance),
        });
      }

      return {
        monthlyPayment,
        totalPayment,
        totalInterest,
        amortizationSchedule,
      };
    } catch (err) {
      console.error("Error calculating loan:", err);
      throw new Error('Failed to calculate loan details. Please check your inputs.');
    }
  }, []);

  const calculate = useCallback((loanDetails) => {
    setIsCalculating(true);
    setError(null);

    try {
      setTimeout(() => {
        const result = calculateLoan(loanDetails);
        setResult(result);
        setIsCalculating(false);
      }, 500);
    } catch (err) {
      setError(err.message);
      setIsCalculating(false);
    }
  }, [calculateLoan]);

  return {
    result,
    isCalculating,
    error,
    calculate,
  };
};
