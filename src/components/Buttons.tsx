import React from 'react';
import { Button, ButtonGroup, Box } from '@mui/material';

export default function Quit() {
  return (
    <div>
      <Box textAlign="center">
        <ButtonGroup orientation="vertical" variant="outlined">
          <Button>Open</Button>
          <Button>Quit</Button>
        </ButtonGroup>
      </Box>
    </div>
  );
}
