import { useState } from 'react';
import { Box, Typography, Button, Container, useTheme as useMuiTheme } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { BarChart2, TrendingUp } from 'lucide-react';
import LoanForm from '../components/LoanForm';
import LoanSummary from '../components/LoanSummary';
import AmortizationTable from '../components/AmortizationTable';

const Home = () => {
  const [calculationResult, setCalculationResult] = useState(null);
  const theme = useMuiTheme();

  const handleCalculationResult = (result) => {
    setCalculationResult(result);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 5, mt: 2, textAlign: 'center' }}>
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: 700,
            background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 2
          }}
        >
          Loan Calculator
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto', mb: 4 }}>
          Calculate your monthly loan payments, view amortization schedules, and convert currencies in real-time.
        </Typography>
      </Box>

      <LoanForm onCalculate={handleCalculationResult} />

      {calculationResult && (
        <>
          <LoanSummary result={calculationResult} />
          
          <AmortizationTable result={calculationResult} />
          
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, mb: 5, gap: 2 }}>
            <Button
              variant="contained"
              color="primary"
              component={RouterLink}
              to="/amortization"
              startIcon={<BarChart2 />}
              sx={{ 
                py: 1.5, 
                px: 3,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 20px rgba(25, 118, 210, 0.4)',
                }
              }}
            >
              View Detailed Amortization
            </Button>
            
            <Button
              variant="outlined"
              color="secondary"
              component={RouterLink}
              to="/currency-rates"
              startIcon={<TrendingUp />}
              sx={{ 
                py: 1.5, 
                px: 3,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                }
              }}
            >
              View Currency Rates
            </Button>
          </Box>
        </>
      )}
    </Container>
  );
};

export default Home;
