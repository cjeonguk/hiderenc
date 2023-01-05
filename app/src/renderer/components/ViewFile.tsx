import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  DialogActions,
  Paper,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
const GetPasswd = React.lazy(() => import('./GetPasswd'));

export default function ViewFile() {
  const [passwd, setPasswd] = useState('');
  const [fileList, setFileList] = useState<
    { name: string; isFolder: boolean }[]
  >([]);
  const [whatToDo, setWhatToDo] = useState('');
  const [openPasswdDialog, setOpenPasswdDialog] = useState(false);
  const [openFilesDialog, setOpenFilesDialog] = useState(false);
  const [relativeDir, setRelativeDir] = useState('');
  const [filePath, setFilePath] = useState('');
  useEffect(() => {
    const opened: boolean = window.ipcRenderer.sendSync('file-opened');
    if (opened) {
      const tmpPath: string = window.ipcRenderer.sendSync('get-file-path');
      setFilePath(tmpPath);
      viewFile('', tmpPath);
      setOpenFilesDialog(true);
    }
  }, []);

  function handlePasswdClose() {
    setOpenPasswdDialog(false);
  }

  function handleFilesClose() {
    setOpenFilesDialog(false);
  }

  function handlePasswdOpen(nextAct: string) {
    handleFilesClose();
    setWhatToDo(nextAct);
    setOpenPasswdDialog(true);
  }

  function openFile() {
    const selectedFile = window.ipcRenderer.sendSync('open-file', false);
    if (selectedFile !== undefined) {
      setFilePath(selectedFile[0]);
      setOpenFilesDialog(true);
      viewFile('', selectedFile[0]);
    }
  }

  function viewFile(relativePath: string, file: string) {
    handleFilesClose();
    setRelativeDir(relativePath);
    setFileList(window.ipcRenderer.sendSync('view-file', file, relativePath));
    setOpenFilesDialog(true);
  }
  function goBack() {
    if (relativeDir !== '') {
      const dirArr = relativeDir.split('/');
      dirArr.splice(dirArr.length - 2, 2);
      let relativePath = `${dirArr.join('/')}/`;
      if (relativePath === '/') relativePath = '';
      viewFile(relativePath, filePath);
    }
  }

  function sendDecrypt() {
    window.ipcRenderer.send('encrypt-or-decrypt', passwd, false, [filePath]);
  }

  function addFiles() {
    window.ipcRenderer.send('add-files', filePath, passwd);
  }

  return (
    <>
      <Button fullWidth onClick={openFile}>
        View
      </Button>
      <GetPasswd
        openDialog={openPasswdDialog}
        cancel={handlePasswdClose}
        setPasswd={setPasswd}
        nextAct={() => {
          handlePasswdClose();
          switch (whatToDo) {
            case 'add-files':
              addFiles();
              break;

            case 'decrypt':
              sendDecrypt();
              break;

            default:
              break;
          }
        }}
        contentText="Type the password to use for viewing"
      />
      <Dialog open={openFilesDialog} onClose={handleFilesClose} fullScreen>
        <DialogTitle>Files</DialogTitle>
        <DialogContent>
          <TableContainer component={Paper}>
            <Table size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell align="right">Type</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {fileList.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.isFolder ? (
                        <button
                          className="text-btn"
                          onClick={() =>
                            viewFile(`${relativeDir}${row.name}/`, filePath)
                          }
                        >
                          {row.name}
                        </button>
                      ) : (
                        row.name
                      )}
                    </TableCell>
                    <TableCell align="right">
                      {row.isFolder ? 'Folder' : 'File'}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={goBack}>&lt;</Button>
          <Button onClick={() => handlePasswdOpen('add-files')}>Add</Button>
          <Button onClick={() => handlePasswdOpen('decrypt')}>Decrypt</Button>
          <Button onClick={handleFilesClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
