import { useState } from 'react';
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
  Chip
} from '@mui/material';
import { useCurrency } from '../contexts/CurrencyContext';

const AmortizationTable = ({ result }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { targetCurrency } = useCurrency();

  if (!result) {
    return null;
  }

  const { amortizationSchedule } = result;

  const handleChangePage = (_event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedRows = amortizationSchedule.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: targetCurrency.code,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const getPercentage = (part, total) => {
    return Math.round((part / total) * 100);
  };

  return (
    <Box sx={{ width: '100%', mb: 4 }}>
      <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
        Amortization Schedule
      </Typography>
      
      <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 'none' }}>
        <Table size="small" aria-label="amortization table">
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
              <TableCell>Payment #</TableCell>
              <TableCell align="right">Payment Amount</TableCell>
              <TableCell align="right">Principal Paid</TableCell>
              <TableCell align="right">Interest Paid</TableCell>
              <TableCell align="right">Remaining Balance</TableCell>
              <TableCell align="center">Breakdown</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedRows.map((row) => {
              const principalPercent = getPercentage(
                row.principalPaid,
                row.paymentAmount
              );
              const interestPercent = getPercentage(
                row.interestPaid,
                row.paymentAmount
              );
              
              return (
                <TableRow
                  key={row.paymentNumber}
                  sx={{
                    '&:nth-of-type(odd)': {
                      backgroundColor: 'action.hover',
                    },
                    animation: 'fadeIn 0.3s ease-out',
                    '@keyframes fadeIn': {
                      '0%': { opacity: 0 },
                      '100%': { opacity: 1 },
                    },
                  }}
                >
                  <TableCell 
                    component="th" 
                    scope="row"
                    sx={{ fontWeight: 'medium' }}
                  >
                    {row.paymentNumber}
                  </TableCell>
                  <TableCell align="right">{formatCurrency(row.paymentAmount)}</TableCell>
                  <TableCell align="right">{formatCurrency(row.principalPaid)}</TableCell>
                  <TableCell align="right">{formatCurrency(row.interestPaid)}</TableCell>
                  <TableCell align="right">{formatCurrency(row.remainingBalance)}</TableCell>
                  <TableCell align="center">
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                      <Chip 
                        label={`Principal: ${principalPercent}%`} 
                        size="small" 
                        sx={{ 
                          backgroundColor: 'success.light',
                          color: 'success.contrastText',
                          height: 24
                        }}
                      />
                      <Chip 
                        label={`Interest: ${interestPercent}%`} 
                        size="small" 
                        sx={{ 
                          backgroundColor: 'secondary.light',
                          color: 'secondary.contrastText',
                          height: 24
                        }}
                      />
                    </Box>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[10, 20, 50, 100]}
          component="div"
          count={amortizationSchedule.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Box>
  );
};

export default AmortizationTable;
