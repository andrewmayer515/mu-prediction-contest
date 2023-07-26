import React from 'react';
import { render } from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import App from './app';

//---------------------------------------------------------------------

const theme = createTheme({
  palette: {
    primary: {
      main: '#003366',
    },
  },
});

const queryClient = new QueryClient();

function Root() {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
}

// eslint-disable-next-line no-undef
render(<Root />, document.getElementById('root'));
