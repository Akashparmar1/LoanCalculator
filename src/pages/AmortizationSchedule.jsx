import { useEffect, useState } from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Grid, 
  Card, 
  CardContent, 
  Chip,
  Button
} from '@mui/material';
import { ArrowLeft, DollarSign, TrendingUp, Calendar } from 'lucide-react';
import { Link as RouterLink } from 'react-router-dom';
import AmortizationTable from '../components/AmortizationTable';
import { useLoanCalculation } from '../hooks/useLoanCalculation';

const AmortizationSchedule = () => {
  const [loanResult] = useState(null);
  const { calculate } = useLoanCalculation();

  // Default loan for demonstration purposes
  useEffect(() => {
    const defaultLoan = {
      principal: 250000,
      interestRate: 5.5,
      loanTerm: 240, // 20 years
    };
    
    calculate(defaultLoan);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

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
          Amortization Schedule
        </Typography>
      </Box>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Card elevation={0}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <DollarSign size={20} color="#1976d2" />
                <Typography variant="h6" sx={{ ml: 1 }}>
                  Loan Amount
                </Typography>
              </Box>
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                {formatCurrency(250000)}
              </Typography>
              <Chip 
                label="Principal" 
                size="small" 
                color="primary" 
                sx={{ mt: 2 }} 
              />
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card elevation={0}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <TrendingUp size={20} color="#9c27b0" />
                <Typography variant="h6" sx={{ ml: 1 }}>
                  Interest Rate
                </Typography>
              </Box>
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                5.5%
              </Typography>
              <Chip 
                label="Annual" 
                size="small" 
                color="secondary" 
                sx={{ mt: 2 }} 
              />
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card elevation={0}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Calendar size={20} color="#ff9800" />
                <Typography variant="h6" sx={{ ml: 1 }}>
                  Loan Term
                </Typography>
              </Box>
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                20 Years
              </Typography>
              <Chip 
                label="240 Months" 
                size="small" 
                color="warning" 
                sx={{ mt: 2 }} 
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <AmortizationTable result={loanResult} />
      
      <Box sx={{ mt: 4, p: 3, bgcolor: 'background.paper', borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom>
          Understanding Your Amortization Schedule
        </Typography>
        <Typography variant="body2" paragraph>
          An amortization schedule shows the breakdown of each payment towards principal and interest over the life of the loan.
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" gutterBottom>
              Principal Payment
            </Typography>
            <Typography variant="body2" paragraph>
              The portion of each payment that reduces your loan balance.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" gutterBottom>
              Interest Payment
            </Typography>
            <Typography variant="body2" paragraph>
              The cost of borrowing, calculated on the remaining balance.
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default AmortizationSchedule;
