import React from 'react';
import {
  Box,
  ButtonGroup,
  createTheme,
  ThemeProvider,
  useMediaQuery,
  CssBaseline,
  Container,
} from '@mui/material';
const OpenFile = React.lazy(() => import('./components/OpenFile'));
const SavePasswd = React.lazy(() => import('./components/SavePasswd'));

export default function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode]
  );
  return (
    <div id="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container>
          <Box display="flex" justifyContent="center" alignItems="center">
            <ButtonGroup
              orientation="vertical"
              variant="contained"
              size="large"
            >
              <OpenFile />
              <SavePasswd />
            </ButtonGroup>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
}
