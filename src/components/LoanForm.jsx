import { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Slider,
  InputAdornment,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import { DollarSign, PercentIcon, CalendarIcon } from 'lucide-react';
import { useLoanCalculation } from '../hooks/useLoanCalculation';
import { useCurrency } from '../contexts/CurrencyContext';

const LoanForm = ({ onCalculate }) => {
  const { currencies, targetCurrency, setTargetCurrency } = useCurrency();
  const [loanDetails, setLoanDetails] = useState({
    principal: 10000,
    interestRate: 8.5,
    loanTerm: 60,
  });

  const { calculate, result, isCalculating } = useLoanCalculation();

  const handleInputChange = (field) => (event) => {
    const value = parseFloat(event.target.value);
    if (!isNaN(value)) {
      setLoanDetails({ ...loanDetails, [field]: value });
    }
  };

  const handleSliderChange = (field) => (_event, value) => {
    setLoanDetails({ ...loanDetails, [field]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    calculate(loanDetails);
  };

  useEffect(() => {
    if (result) {
      onCalculate(result);
    }
  }, [result, onCalculate]);

  const getPrincipalMarks = () => [
    { value: 10000, label: '10K' },
    { value: 250000, label: '250K' },
    { value: 500000, label: '500K' },
    { value: 750000, label: '750K' },
    { value: 1000000, label: '1M' },
  ];

  const getInterestMarks = () => [
    { value: 1, label: '1%' },
    { value: 5, label: '5%' },
    { value: 10, label: '10%' },
    { value: 15, label: '15%' },
    { value: 20, label: '20%' },
    { value: 25, label: '25%' },
    { value: 30, label: '30%' },
  ];

  const getTermMarks = () => [
    { value: 60, label: '5 yrs' },
    { value: 120, label: '10 yrs' },
    { value: 180, label: '15 yrs' },
    { value: 240, label: '20 yrs' },
    { value: 300, label: '25 yrs' },
    { value: 360, label: '30 yrs' },
  ];

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
        }
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
          <DollarSign size={24} />
          Loan Calculator
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="currency-select-label">Select Currency</InputLabel>
                <Select
                  labelId="currency-select-label"
                  id="currency-select"
                  value={targetCurrency.code}
                  label="Select Currency"
                  onChange={(e) => {
                    const selected = currencies.find(c => c.code === e.target.value);
                    if (selected) setTargetCurrency(selected);
                  }}
                >
                  {currencies.map((currency) => (
                    <MenuItem key={currency.code} value={currency.code}>
                      {currency.code} ({currency.symbol}) - {currency.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box sx={{ mb: 4 }}>
                <Typography
                  variant="subtitle1"
                  gutterBottom
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                  }}
                >
                  <DollarSign size={18} />
                  Loan Amount
                </Typography>
                <TextField
                  fullWidth
                  id="principal"
                  value={loanDetails.principal}
                  onChange={handleInputChange('principal')}
                  variant="outlined"
                  InputProps={{
                    startAdornment: <InputAdornment position="start">{targetCurrency.symbol}</InputAdornment>,
                  }}
                  sx={{ mb: 2 }}
                />
                <Slider
                  value={loanDetails.principal}
                  onChange={handleSliderChange('principal')}
                  min={10000}
                  max={1000000}
                  step={10000}
                  marks={getPrincipalMarks()}
                  valueLabelDisplay="auto"
                  valueLabelFormat={(value) => `${targetCurrency.symbol}${value.toLocaleString()}`}
                />
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box sx={{ mb: 4 }}>
                <Typography
                  variant="subtitle1"
                  gutterBottom
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                  }}
                >
                  <PercentIcon size={18} />
                  Interest Rate (%)
                </Typography>
                <TextField
                  fullWidth
                  id="interestRate"
                  value={loanDetails.interestRate}
                  onChange={handleInputChange('interestRate')}
                  variant="outlined"
                  InputProps={{
                    endAdornment: <InputAdornment position="end">%</InputAdornment>,
                  }}
                  sx={{ mb: 2 }}
                />
                <Slider
                  value={loanDetails.interestRate}
                  onChange={handleSliderChange('interestRate')}
                  min={0.1}
                  max={30}
                  step={0.1}
                  marks={getInterestMarks()}
                  valueLabelDisplay="auto"
                  valueLabelFormat={(value) => `${value}%`}
                />
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ mb: 4 }}>
                <Typography
                  variant="subtitle1"
                  gutterBottom
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                  }}
                >
                  <CalendarIcon size={18} />
                  Loan Term (Months)
                </Typography>
                <TextField
                  fullWidth
                  id="loanTerm"
                  value={loanDetails.loanTerm}
                  onChange={handleInputChange('loanTerm')}
                  variant="outlined"
                  InputProps={{
                    endAdornment: <InputAdornment position="end">months</InputAdornment>,
                  }}
                  sx={{ mb: 2 }}
                />
                <Slider
                  value={loanDetails.loanTerm}
                  onChange={handleSliderChange('loanTerm')}
                  min={12}
                  max={360}
                  step={12}
                  marks={getTermMarks()}
                  valueLabelDisplay="auto"
                  valueLabelFormat={(value) => `${Math.floor(value / 12)} years`}
                />
              </Box>
            </Grid>
          </Grid>

          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              disabled={isCalculating}
              sx={{
                minWidth: 200,
                py: 1.5,
                fontWeight: 500,
                fontSize: '1rem',
                boxShadow: '0 4px 14px rgba(25, 118, 210, 0.3)',
                '&:hover': {
                  boxShadow: '0 6px 20px rgba(25, 118, 210, 0.4)',
                  transform: 'translateY(-2px)',
                }
              }}
            >
              {isCalculating ? 'Calculating...' : 'Calculate'}
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default LoanForm;
