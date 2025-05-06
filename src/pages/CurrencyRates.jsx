import { Box, Container, Typography, Button, Paper } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { ArrowLeft, Globe } from 'lucide-react';
import CurrencyRatesTable from '../components/CurrencyRatesTable';
import { useCurrency } from '../contexts/CurrencyContext';

const CurrencyRates = () => {
  const { baseCurrency } = useCurrency();

  return (
    <Container maxWidth="lg">
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <Button
          component={RouterLink}
          to="/"
          startIcon={<ArrowLeft />}
          sx={{ mr: 2 }}
        >
          Back to Calculator
        </Button>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
          Currency Exchange Rates
        </Typography>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Paper 
          elevation={0} 
          sx={{ 
            p: 3, 
            display: 'flex', 
            alignItems: 'center',
            borderRadius: 2
          }}
        >
          <Globe size={24} style={{ marginRight: '16px' }} />
          <Box>
            <Typography variant="h6" gutterBottom>
              Base Currency: {baseCurrency.name} ({baseCurrency.code})
            </Typography>
            <Typography variant="body2" color="text.secondary">
              All exchange rates are displayed relative to {baseCurrency.code}. Rates are updated periodically to reflect market changes.
            </Typography>
          </Box>
        </Paper>
      </Box>

      <CurrencyRatesTable />
      
      <Box sx={{ mt: 4, p: 3, bgcolor: 'background.paper', borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom>
          About Currency Conversion
        </Typography>
        <Typography variant="body2" paragraph>
          Exchange rates are the value of one currency for the purpose of conversion to another. They affect everything from your loan payments when traveling abroad to the value of your international investments.
        </Typography>
        <Typography variant="body2">
          Note: These exchange rates are for informational purposes only and may vary from rates used by financial institutions for actual transactions.
        </Typography>
      </Box>
    </Container>
  );
};

export default CurrencyRates;
