import React from 'react';
import { render } from 'react-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import App from './components/App';

//---------------------------------------------------------------------

const theme = createTheme({
  palette: {
    primary: {
      main: '#003366',
    },
  },
});

function Root() {
  return (
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </React.StrictMode>
  );
}

// eslint-disable-next-line no-undef
render(<Root />, document.getElementById('root'));
