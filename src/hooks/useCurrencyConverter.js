import { useState, useEffect } from 'react';
import { useCurrency } from '../contexts/CurrencyContext';

export const useCurrencyConverter = (amount) => {
  const { 
    baseCurrency, 
    targetCurrency, 
    exchangeRates, 
    convertAmount, 
    isLoading: ratesLoading,
    error: ratesError 
  } = useCurrency();
  
  const [result, setResult] = useState(null);
  const [isConverting, setIsConverting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!amount || amount <= 0 || !exchangeRates) {
      setResult(null);
      return;
    }

    setIsConverting(true);
    setError(null);

    try {
      let rate = 1;

      if (exchangeRates) {
        if (baseCurrency.code === 'USD') {
          rate = exchangeRates[targetCurrency.code];
        } else if (targetCurrency.code === 'USD') {
          rate = 1 / exchangeRates[baseCurrency.code];
        } else {
          const baseToUSD = 1 / exchangeRates[baseCurrency.code];
          const usdToTarget = exchangeRates[targetCurrency.code];
          rate = baseToUSD * usdToTarget;
        }
      }

      const convertedAmount = convertAmount(
        amount,
        baseCurrency.code,
        targetCurrency.code
      );

      setResult({
        convertedAmount,
        fromCurrency: baseCurrency.code,
        toCurrency: targetCurrency.code,
        rate,
      });
    } catch (err) {
      setError('Failed to convert currency. Please try again.');
      console.error(err);
    } finally {
      setIsConverting(false);
    }
  }, [amount, baseCurrency, targetCurrency, exchangeRates, convertAmount]);

  return {
    result,
    isConverting: isConverting || ratesLoading,
    error: error || ratesError,
  };
};
