import React from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';

export default function RecentFiles() {
  const listArray = [];
  for (let i = 0; i < 5; i++) {
    listArray.push(
      <ListItem disablePadding key={i}>
        <ListItemButton>
          <ListItemText primary={i} />
        </ListItemButton>
      </ListItem>
    );
  }
  return (
    <div>
      <Box display="flex" justifyContent="center" alignItems="center">
        <List className="list">{listArray}</List>
      </Box>
    </div>
  );
}
