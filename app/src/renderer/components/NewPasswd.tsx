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

interface NewPasswdProps {
  openDialog: boolean;
  cancel(): void;
  contentText: string;
  nextAct(): void;
  firstTextFieldLabel?: string;
  firstTextFieldFunc(value: string): void;
  firstTextFieldType?: string;
  secondTextFieldLabel?: string;
  secondTextFieldFunc(value: string): void;
  secondTextFieldType?: string;
}

export default function NewPasswd(props: NewPasswdProps) {
  const textFieldProps = {
    firstTFLabel: 'Password',
    firstTFType: 'password',
    secondTFLabel: 'Password Again',
    secondTFType: 'password',
  };
  if (props.firstTextFieldLabel) {
    textFieldProps.firstTFLabel = props.firstTextFieldLabel;
  }
  if (props.firstTextFieldType) {
    textFieldProps.firstTFType = props.firstTextFieldType;
  }
  if (props.secondTextFieldLabel) {
    textFieldProps.secondTFLabel = props.secondTextFieldLabel;
  }
  if (props.secondTextFieldType) {
    textFieldProps.secondTFType = props.secondTextFieldType;
  }
  return (
    <Dialog open={props.openDialog} onClose={props.cancel} fullScreen>
      <DialogTitle>Password</DialogTitle>
      <DialogContent>
        <DialogContentText>{props.contentText}</DialogContentText>
        <TextField
          variant="standard"
          autoFocus
          label={textFieldProps.firstTFLabel}
          type={textFieldProps.firstTFType}
          fullWidth
          margin="dense"
          onChange={(e) => props.firstTextFieldFunc(e.target.value)}
        />
        <TextField
          margin="dense"
          label={textFieldProps.secondTFLabel}
          type={textFieldProps.secondTFType}
          fullWidth
          variant="standard"
          onChange={(e) => {
            props.secondTextFieldFunc(e.target.value);
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={props.cancel}>Cancel</Button>
        <Button onClick={props.nextAct}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}
