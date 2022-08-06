import React from 'react';
import { Button, Box } from '@mui/material';

export default function OpenFile() {
  return (
    <div id='open-file'>
      <Box display="flex" justifyContent="center" alignItems="center" id='open-file-box'>
        <Button variant="contained" size="large" id='open-file-btn'>
          Open
        </Button>
      </Box>
    </div>
  );
}
