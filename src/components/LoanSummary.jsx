import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Divider,
  Paper
} from '@mui/material';
import { CreditCard, TrendingUp, BarChart2 } from 'lucide-react';
import { useCurrency } from '../contexts/CurrencyContext';

const LoanSummary = ({ result }) => {
  const { targetCurrency } = useCurrency();

  if (!result) {
    return null;
  }

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: targetCurrency.code,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  return (
    <Card
      elevation={0}
      sx={{
        width: '100%',
        mb: 4,
        overflow: 'visible',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 12px 24px rgba(0,0,0,0.1)',
        },
        animation: 'fadeIn 0.6s ease-out',
        '@keyframes fadeIn': {
          '0%': {
            opacity: 0,
            transform: 'translateY(20px)'
          },
          '100%': {
            opacity: 1,
            transform: 'translateY(0)'
          },
        },
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Typography
          variant="h5"
          component="h2"
          gutterBottom
          sx={{
            mb: 3,
            fontWeight: 500,
            display: 'flex',
            alignItems: 'center',
            gap: 1
          }}
        >
          <BarChart2 size={24} />
          Loan Summary ({targetCurrency.code})
        </Typography>

        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} md={4}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                textAlign: 'center',
                backgroundColor: 'primary.light',
                color: 'primary.contrastText',
                borderRadius: 2,
              }}
            >
              <CreditCard size={36} />
              <Typography variant="h6" sx={{ mt: 2 }}>
                Monthly Payment
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 700, mt: 1 }}>
                {formatCurrency(result.monthlyPayment)}
              </Typography>
              <Typography variant="body2" sx={{ mt: 2 }}>
                / month
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                textAlign: 'center',
                backgroundColor: 'secondary.light',
                color: 'secondary.contrastText',
                borderRadius: 2,
              }}
            >
              <TrendingUp size={36} />
              <Typography variant="h6" sx={{ mt: 2 }}>
                Total Interest
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 700, mt: 1 }}>
                {formatCurrency(result.totalInterest)}
              </Typography>
              <Typography variant="body2" sx={{ mt: 2 }}>
                {((result.totalInterest / (result.totalPayment - result.totalInterest)) * 100).toFixed(2)}% of principal
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                textAlign: 'center',
                backgroundColor: 'info.light',
                color: 'info.contrastText',
                borderRadius: 2,
              }}
            >
              <BarChart2 size={36} />
              <Typography variant="h6" sx={{ mt: 2 }}>
                Total Payment
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 700, mt: 1 }}>
                {formatCurrency(result.totalPayment)}
              </Typography>
              <Typography variant="body2" sx={{ mt: 2 }}>
                Over {result.amortizationSchedule.length} months
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        <Box>
          <Typography variant="h6" gutterBottom>
            Payment Breakdown
          </Typography>
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={12} sm={6}>
              <Paper
                sx={{
                  p: 2,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  bgcolor: 'background.default',
                }}
              >
                <Typography variant="body1">Principal Amount:</Typography>
                <Typography variant="body1" fontWeight="bold">
                  {formatCurrency(result.totalPayment - result.totalInterest)}
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Paper
                sx={{
                  p: 2,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  bgcolor: 'background.default',
                }}
              >
                <Typography variant="body1">Total Interest:</Typography>
                <Typography variant="body1" fontWeight="bold">
                  {formatCurrency(result.totalInterest)}
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
};

export default LoanSummary;
