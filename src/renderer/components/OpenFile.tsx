import React, { useState, useEffect } from 'react';
import {
  Button,
  ButtonGroup,
  Box,
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
      const filePath: string = window.ipcRenderer.sendSync('get-file-path');
      setFilePaths([filePath]);
      setEncrypt(false);
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
    const selectedFiles = window.ipcRenderer.sendSync('open-file');

    // Re-rendering problem caused
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
    <div id="open-file">
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        id="open-file-box"
      >
        <ButtonGroup variant="contained">
          <Button
            size="large"
            onClick={() => openFile(true)}
            id="open-file-btn1"
          >
            Encrypt
          </Button>
          <Button
            size="large"
            onClick={() => openFile(false)}
            id="open-file-btn2"
          >
            Decrypt
          </Button>
        </ButtonGroup>
      </Box>
      <Dialog open={openDialog} onClose={handleClose} fullScreen>
        <DialogTitle>Subscribe</DialogTitle>
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
    </div>
  );
}
