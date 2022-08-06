import React from 'react';
import { Button, Box } from '@mui/material';

export default function OpenFile() {
  return (
    <div>
      <Box display="flex" justifyContent="center" alignItems="center">
        <Button variant="outlined" size="large">
          Open
        </Button>
      </Box>
    </div>
  );
}
