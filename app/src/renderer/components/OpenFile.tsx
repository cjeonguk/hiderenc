import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import GetPasswd from './GetPasswd';

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

  let contentText = 'Type the password to use for ';
  function handleClickOpen() {
    if (encrypt) contentText += 'encryption';
    else contentText += 'decryption';
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
      <GetPasswd
        openDialog={openDialog}
        cancel={handleClose}
        setPasswd={setPasswd}
        nextAct={getPasswd}
        contentText={contentText}
      />
    </>
  );
}
