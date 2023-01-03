import React from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
} from '@mui/material';

interface GetPasswdProps {
  openDialog: boolean;
  contentText: string;
  cancel(): void;
  setPasswd(value: string): void;
  nextAct(): void;
}

export default function GetPasswd(props: GetPasswdProps) {
  return (
    <Dialog open={props.openDialog} onClose={props.cancel} fullScreen>
      <DialogTitle>Password</DialogTitle>
      <DialogContent>
        <DialogContentText>{props.contentText}</DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="passwd"
          label="Password"
          type="password"
          fullWidth
          variant="standard"
          onChange={(e) => {
            props.setPasswd(e.target.value);
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={props.cancel}>Cancel</Button>
        <Button onClick={props.nextAct}>Enter</Button>
      </DialogActions>
    </Dialog>
  );
}
