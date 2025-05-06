import { Suspense, lazy, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import { useTheme } from './contexts/ThemeContext';
import Layout from './components/Layout';
import LoadingFallback from './components/LoadingFallback';
import ErrorBoundary from './components/ErrorBoundary';

// Lazy loaded components for better performance
const Home = lazy(() => import('./pages/Home'));
const AmortizationSchedule = lazy(() => import('./pages/AmortizationSchedule'));
const CurrencyRates = lazy(() => import('./pages/CurrencyRates'));
const NotFound = lazy(() => import('./pages/NotFound'));
const ErrorPage = lazy(() => import('./pages/ErrorPage'));

function App() {
  const { theme } = useTheme();

  useEffect(() => {
    document.body.style.backgroundColor = theme.palette.background.default;
  }, [theme]);

  return (
    <>
      <CssBaseline />
      <ErrorBoundary fallback={<ErrorPage />}>
        <Layout>
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/amortization" element={<AmortizationSchedule />} />
              <Route path="/currency-rates" element={<CurrencyRates />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </Layout>
      </ErrorBoundary>
    </>
  );
}

export default App;