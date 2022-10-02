import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableCell,
  TableRow,
  Paper,
} from '@mui/material';

export default function SavePasswd() {
  interface PasswdInfo {
    whereToUse: string;
    password: string;
  }
  const [openFirstPasswd, setOpenFirstPasswd] = useState(false);
  const [openCheckPasswd, setOpenCheckPasswd] = useState(false);
  const [openNewPasswd, setOpenNewPasswd] = useState(false);
  const [openShowPasswd, setOpenShowPasswd] = useState(false);
  const [getNewPasswd, setGetNewPasswd] = useState(true);
  const [firstPasswdText, setFirstPasswdText] = useState('');
  const [checkPasswdText, setCheckPasswdText] = useState('');
  const [passwd, setPasswd] = useState('');
  const [againPasswd, setAgainPasswd] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [whereToUse, setWhereToUse] = useState('');
  const [passwordList, setPasswordList] = useState<PasswdInfo[]>([]);
  function handleFirstPasswdClose() {
    setOpenFirstPasswd(false);
  }
  function handleCheckPasswdClose() {
    setOpenCheckPasswd(false);
  }
  function handleNewPasswdClose() {
    setOpenNewPasswd(false);
  }
  function handleShowPasswdClose() {
    setOpenShowPasswd(false);
  }
  function checkFileExists() {
    if (!window.ipcRenderer.sendSync('check-passwd-file-exists')) {
      setFirstPasswdText(
        "A new password to use when you want to read passwords you'll record."
      );
      setOpenFirstPasswd(true);
      return false;
    } else return true;
  }
  function checkPasswdSame() {
    if (passwd !== againPasswd) {
      handleFirstPasswdClose();
      setFirstPasswdText('The password is not same. Try again.');
      setOpenFirstPasswd(true);
    } else {
      window.ipcRenderer.send('write-first-data', passwd);
      handleFirstPasswdClose();
      setPasswd('');
      setAgainPasswd('');
    }
  }
  function checkPasswdCorrect() {
    if (!window.ipcRenderer.sendSync('check-passwd-correct', passwd)) {
      handleCheckPasswdClose();
      setPasswd('');
      setCheckPasswdText('The password is not correct. Try again.');
      setOpenCheckPasswd(true);
      return false;
    } else {
      handleCheckPasswdClose();
      return true;
    }
  }
  function recordNewPasswd() {
    window.ipcRenderer.send(
      'record-new-passwd',
      passwd,
      whereToUse,
      newPassword
    );
    handleNewPasswdClose();
    setPasswd('');
    setNewPassword('');
  }
  function newPasswd() {
    if (checkFileExists()) {
      setGetNewPasswd(true);
      setCheckPasswdText('Check the password is correct.');
      setOpenCheckPasswd(true);
    }
  }
  function afterCheck() {
    if (checkPasswdCorrect()) {
      if (getNewPasswd) setOpenNewPasswd(true);
      else {
        setPasswordList(window.ipcRenderer.sendSync('read-passwords', passwd));
        setPasswd('');
        setOpenShowPasswd(true);
      }
    }
  }
  function showPasswords() {
    if (checkFileExists()) {
      setGetNewPasswd(false);
      setCheckPasswdText('Check the password is correct.');
      setOpenCheckPasswd(true);
    }
  }
  return (
    <>
      <Button fullWidth color="secondary" onClick={newPasswd}>
        New Password
      </Button>
      <Button fullWidth color="secondary" onClick={showPasswords}>
        Passwords
      </Button>
      <Dialog
        open={openFirstPasswd}
        onClose={handleFirstPasswdClose}
        fullScreen
      >
        <DialogTitle>New password</DialogTitle>
        <DialogContent>
          <DialogContentText>{firstPasswdText}</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="A new password"
            type="password"
            fullWidth
            variant="standard"
            onChange={(e) => {
              setPasswd(e.target.value);
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            label="Write it again"
            type="password"
            fullWidth
            variant="standard"
            onChange={(e) => {
              setAgainPasswd(e.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleFirstPasswdClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={checkPasswdSame} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openCheckPasswd}
        onClose={handleCheckPasswdClose}
        fullScreen
      >
        <DialogTitle>Password</DialogTitle>
        <DialogContent>
          <DialogContentText>{checkPasswdText}</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
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
          <Button onClick={handleCheckPasswdClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={afterCheck} color="primary">
            Enter
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openNewPasswd} onClose={handleNewPasswdClose} fullScreen>
        <DialogTitle>New password</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Record a new password and where to use it
          </DialogContentText>
          <TextField
            variant="standard"
            autoFocus
            label="Where to use"
            fullWidth
            margin="dense"
            onChange={(e) => setWhereToUse(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Password"
            type="password"
            fullWidth
            variant="standard"
            onChange={(e) => {
              setNewPassword(e.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleNewPasswdClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={recordNewPasswd} color="primary">
            Record
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openShowPasswd} onClose={handleShowPasswdClose} fullScreen>
        <DialogTitle>Passwords</DialogTitle>
        <DialogContent>
          <TableContainer component={Paper}>
            <Table
              /*sx={{ minWidth: 650 }}*/ size="small"
              aria-label="a dense table"
            >
              <TableHead>
                <TableRow>
                  <TableCell>Where to use</TableCell>
                  <TableCell align="right">Password</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {passwordList.map((row) => (
                  <TableRow
                    key={row.whereToUse}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.whereToUse}
                    </TableCell>
                    <TableCell align="right">{row.password}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleShowPasswdClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
