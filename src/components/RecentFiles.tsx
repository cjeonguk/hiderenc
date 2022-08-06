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
      <ListItem disablePadding key={`listitem${i}`}>
        <ListItemButton>
          <ListItemText primary={i} secondary={i * 2} />
        </ListItemButton>
      </ListItem>
    );
  }
  return (
    <div>
      <List className="list" disablePadding style={{ display: 'flex', flexDirection: 'row' }}>{listArray}</List>
    </div>
  );
}
