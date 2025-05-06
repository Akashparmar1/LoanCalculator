import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// Default currency (USD)
const defaultCurrency = { code: 'USD', name: 'United States Dollar', symbol: '$' };

const CurrencyContext = createContext(null);

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};

export const CurrencyProvider = ({ children }) => {
  const [baseCurrency, setBaseCurrency] = useState(defaultCurrency);
  const [targetCurrency, setTargetCurrency] = useState(defaultCurrency);
  const [exchangeRates, setExchangeRates] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currencies, setCurrencies] = useState([defaultCurrency]);

  const API_KEY = import.meta.env.VITE_EXCHANGE_RATE_API_KEY;
  const API_BASE_URL = import.meta.env.VITE_EXCHANGE_RATE_API_BASE_URL;

  // Fetch available currencies
  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/${API_KEY}/codes`);
        if (response.data.result === 'success') {
          const currencyList = response.data.supported_codes.map(([code, name]) => ({
            code,
            name,
            symbol: new Intl.NumberFormat('en-US', { style: 'currency', currency: code })
              .format(0)
              .charAt(0),
          }));
          setCurrencies(currencyList);
        }
      } catch (err) {
        console.error('Error fetching currencies:', err);
        setError('Failed to fetch available currencies');
      }
    };

    fetchCurrencies();
  }, []);

  // Fetch exchange rates
  useEffect(() => {
    const fetchExchangeRates = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `${API_BASE_URL}/${API_KEY}/latest/${baseCurrency.code}`
        );
        if (response.data.result === 'success') {
          setExchangeRates(response.data.conversion_rates);
        } else {
          throw new Error('Failed to fetch exchange rates');
        }
      } catch (err) {
        setError('Failed to fetch exchange rates. Please try again later.');
        console.error('Error fetching exchange rates:', err);
        
      } finally {
        setIsLoading(false);
      }
    };

    fetchExchangeRates();

    const refreshInterval = setInterval(fetchExchangeRates, 3600000); 
    return () => clearInterval(refreshInterval);
  }, [baseCurrency]);

  const convertAmount = (amount, from, to) => {
    if (!exchangeRates) return 0;
    const fromRate = exchangeRates[from];
    const toRate = exchangeRates[to];
    return amount * (toRate / fromRate);
  };

  const value = {
    baseCurrency,
    setBaseCurrency,
    targetCurrency,
    setTargetCurrency,
    exchangeRates,
    isLoading,
    error,
    convertAmount,
    currencies
  };

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
};
