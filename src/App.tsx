import React from 'react';
import { Container, Grid } from '@mui/material';
import RecentFiles from './components/RecentFiles';
import OpenFile from './components/OpenFile';

export default function App() {
  return (
    <div id="App">
      <Grid container spacing={2} id="main-grid" style={{ height: '100%' }}>
        <Grid item xs={6}>
          <RecentFiles />
        </Grid>
        <Grid item xs={6}>
          <OpenFile />
        </Grid>
      </Grid>
    </div>
  );
}
