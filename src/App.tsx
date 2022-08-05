import React from 'react';
import { Container, Grid } from '@mui/material';
import RecentFiles from './components/RecentFiles';
import Buttons from './components/Buttons';

export default function App() {
  return (
    <div id="App">
      <Container fixed id="container" style={{ height: '100%' }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <RecentFiles />
          </Grid>
          <Grid item xs={6}>
            <Buttons />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
