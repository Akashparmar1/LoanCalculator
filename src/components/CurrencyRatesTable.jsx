import { useState, useEffect } from 'react';
import { 
  Box, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Typography,
  TablePagination,
  TextField,
  InputAdornment,
  CircularProgress
} from '@mui/material';
import { Search } from 'lucide-react';
import { useCurrency } from '../contexts/CurrencyContext';

const CurrencyRatesTable = () => {
  const { baseCurrency, exchangeRates, currencies, isLoading } = useCurrency();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [currencyRates, setCurrencyRates] = useState([]);

  useEffect(() => {
    if (exchangeRates) {
      const rates = currencies.map(currency => ({
        currency,
        rate: exchangeRates[currency.code] || 0
      }));
      setCurrencyRates(rates);
    }
  }, [exchangeRates, currencies]);

  const handleChangePage = (_event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(0);
  };

  const filteredRates = currencyRates.filter(
    (rate) =>
      rate.currency.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rate.currency.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedRates = filteredRates.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const formatExchangeRate = (rate) => {
    return new Intl.NumberFormat('en-US', {
      style: 'decimal',
      minimumFractionDigits: 4,
      maximumFractionDigits: 4,
    }).format(rate);
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%', mb: 4 }}>
      <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
        Currency Exchange Rates (Base: {baseCurrency.code})
      </Typography>
      
      <Box sx={{ mb: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search currency..."
          value={searchTerm}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search size={20} />
              </InputAdornment>
            ),
          }}
        />
      </Box>
      
      <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 'none' }}>
        <Table size="small" aria-label="currency rates table">
          <TableHead>
            <TableRow
              sx={{
                '& th': {
                  fontWeight: 'bold',
                  backgroundColor: 'primary.main',
                  color: 'primary.contrastText',
                },
              }}
            >
              <TableCell>Currency Code</TableCell>
              <TableCell>Currency Name</TableCell>
              <TableCell>Symbol</TableCell>
              <TableCell align="right">Exchange Rate</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedRates.map((rate) => (
              <TableRow
                key={rate.currency.code}
                sx={{
                  '&:nth-of-type(odd)': {
                    backgroundColor: 'action.hover',
                  },
                  '&:hover': {
                    backgroundColor: 'action.selected',
                  },
                }}
              >
                <TableCell component="th" scope="row" sx={{ fontWeight: 'medium' }}>
                  {rate.currency.code}
                </TableCell>
                <TableCell>{rate.currency.name}</TableCell>
                <TableCell>{rate.currency.symbol}</TableCell>
                <TableCell align="right">{formatExchangeRate(rate.rate)}</TableCell>
              </TableRow>
            ))}
            {paginatedRates.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} align="center" sx={{ py: 3 }}>
                  No currencies found matching "{searchTerm}"
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[10, 20, 50]}
          component="div"
          count={filteredRates.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Box>
  );
};

export default CurrencyRatesTable;
