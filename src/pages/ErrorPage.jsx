import { useState, useEffect } from 'react';
import { Box, Button, Container, Typography, Paper } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { RefreshCw, Home } from 'lucide-react';

const ErrorPage = () => {
  const [errorDetails, setErrorDetails] = useState<string>('Unknown error occurred');

  useEffect(() => {
    // In a real application, we might capture error details from 
    // a global error handler or URL parameters
    const mockErrorDetails = 'Application encountered an unexpected error';
    setErrorDetails(mockErrorDetails);
  }, []);

  const handleReload = () => {
    window.location.reload();
  };

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          py: 10,
        }}
      >
        <Typography
          variant="h2"
          component="h1"
          sx={{
            mb: 2,
            fontWeight: 700,
            color: 'error.main',
          }}
        >
          Something Went Wrong
        </Typography>

        <Typography variant="h6" component="h2" sx={{ mb: 4, color: 'text.secondary' }}>
          We're sorry, but we encountered an unexpected error
        </Typography>

        <Paper 
          elevation={0} 
          sx={{ 
            p: 3, 
            mb: 6, 
            width: '100%',
            maxWidth: 500,
            borderLeft: 4,
            borderColor: 'error.main',
            bgcolor: 'error.light',
            color: 'error.contrastText'
          }}
        >
          <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
            Error Details:
          </Typography>
          <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
            {errorDetails}
          </Typography>
        </Paper>

        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<RefreshCw />}
            onClick={handleReload}
            sx={{ 
              px: 3, 
              py: 1.5,
              borderRadius: 2,
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-2px)',
              }
            }}
          >
            Reload Page
          </Button>
          
          <Button
            component={RouterLink}
            to="/"
            variant="outlined"
            startIcon={<Home />}
            sx={{ 
              px: 3, 
              py: 1.5,
              borderRadius: 2,
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-2px)',
              }
            }}
          >
            Return Home
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ErrorPage;