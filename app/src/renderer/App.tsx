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
        palette: !prefersDarkMode
          ? {
              mode: 'light',
              primary: {
                main: '#1976d2',
              },
              background: {
                default: '#fff',
                paper: '#fff',
              },
            }
          : {
              mode: 'dark',
              primary: {
                main: '#757575',
              },
              background: {
                default: '#212121',
                paper: '#212121',
              },
            },
      }),
    [prefersDarkMode]
  );
  return (
    <div id="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container id="container">
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            id="box"
          >
            <ButtonGroup
              orientation="vertical"
              variant="contained"
              size="large"
              className="btngroup"
            >
              <OpenFile />
            </ButtonGroup>
            <ButtonGroup
              orientation="vertical"
              variant="contained"
              size="small"
              className="btngroup"
            >
              <SavePasswd />
            </ButtonGroup>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
}
