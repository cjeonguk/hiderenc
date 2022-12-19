import React, { useState, useEffect } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
} from '@mui/material';

export default function OpenFile() {
  const [openDialog, setOpenDialog] = useState(false);
  const [passwd, setPasswd] = useState('');
  // Update this to state with redux
  const [encrypt, setEncrypt] = useState(true);
  const [filePaths, setFilePaths] = useState<string[]>([]);

  useEffect(() => {
    const opened: boolean = window.ipcRenderer.sendSync('file-opened');
    if (opened) {
      const [filePath, isEncrypt]: [string, boolean] =
        window.ipcRenderer.sendSync('get-file-path');
      setFilePaths([filePath]);
      setEncrypt(isEncrypt);
      handleClickOpen();
    }
  }, []);

  function handleClickOpen() {
    setOpenDialog(true);
  }

  function handleClose() {
    setOpenDialog(false);
  }

  function openFile(encryptOrNot: boolean) {
    const selectedFiles = window.ipcRenderer.sendSync(
      'open-file',
      encryptOrNot
    );

    if (selectedFiles !== undefined) {
      setFilePaths(JSON.parse(JSON.stringify(selectedFiles)));
      setEncrypt(encryptOrNot);
      handleClickOpen();
    }
  }

  function getPasswd() {
    handleClose();
    window.ipcRenderer.send('encrypt-or-decrypt', passwd, encrypt, filePaths);
  }

  return (
    <>
      <Button onClick={() => openFile(true)} fullWidth>
        Encrypt
      </Button>
      <Button onClick={() => openFile(false)} fullWidth>
        Decrypt
      </Button>
      <Dialog open={openDialog} onClose={handleClose} fullScreen>
        <DialogTitle>Password</DialogTitle>
        <DialogContent>
          <DialogContentText>Enter your password:</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="passwd"
            label="Password"
            type="password"
            fullWidth
            variant="standard"
            onChange={(e) => {
              setPasswd(e.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={getPasswd}>Enter</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
