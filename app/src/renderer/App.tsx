import React from 'react';
import { Box, ButtonGroup, createTheme, ThemeProvider } from '@mui/material';
const OpenFile = React.lazy(() => import('./components/OpenFile'));
const SavePasswd = React.lazy(() => import('./components/SavePasswd'));

export default function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#808080',
      },
      secondary: {
        main: '#A9A9A9',
      },
      info: {
        main: '#FFFFFF',
      },
    },
  });
  return (
    <div id="App">
      <ThemeProvider theme={theme}>
        <Box
          id="contents"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <ButtonGroup
            orientation="vertical"
            color="info"
            variant="contained"
            size="large"
          >
            <OpenFile />
            <SavePasswd />
          </ButtonGroup>
        </Box>
      </ThemeProvider>
    </div>
  );
}
