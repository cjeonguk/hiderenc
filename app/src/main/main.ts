import { app, BrowserWindow, ipcMain, dialog, Menu } from 'electron';
import { autoUpdater } from 'electron-updater';
import path from 'path';
import os from 'os';
import fs from 'fs';
import { encFiles, decFiles } from '@hider/core';

const isDev = process.env.NODE_ENV === 'development';

let mainWindow: BrowserWindow;
const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 600,
    height: 360,
    minWidth: 600,
    minHeight: 360,
    autoHideMenuBar: true,
    icon: path.join(__dirname, '..', '..', 'build', '64x64.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      devTools: isDev,
    },
  });

  const isMac = process.platform === 'darwin';
  if (isMac) {
    const menuTemplate: Electron.MenuItemConstructorOptions[] = [
      {
        label: app.name,
        submenu: [
          { role: 'about' },
          { type: 'separator' },
          { role: 'services' },
          { type: 'separator' },
          { role: 'hide' },
          { role: 'hideOthers' },
          { role: 'unhide' },
          { type: 'separator' },
          { role: 'quit' },
        ],
      },
    ];
    Menu.setApplicationMenu(Menu.buildFromTemplate(menuTemplate));
  }

  if (isDev) {
    mainWindow.loadURL('http://localhost:3000');
    mainWindow.webContents.openDevTools();
    console.log(process.env.NODE_ENV);
  } else
    mainWindow.loadFile(path.join(__dirname, '..', 'renderer', 'index.html'));
};

app.whenReady().then(() => {
  createWindow();

  autoUpdater.checkForUpdates();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

autoUpdater.on('update-available', () => {
  const options = {
    message: 'Available updates exist.',
    title: 'Update',
    type: 'question',
    buttons: ['Not now', 'Download update'],
    defaultId: 1,
  };

  const res = dialog.showMessageBoxSync(mainWindow, options);
  if (res) autoUpdater.downloadUpdate();
});

autoUpdater.on('download-progress', (progressObj) => {
  mainWindow.setProgressBar(progressObj.percent / 100);
});

autoUpdater.on('update-downloaded', () => {
  mainWindow.setProgressBar(-1);
  dialog.showMessageBox(mainWindow, {
    title: 'Notice',
    message: 'Update downloaded.',
    type: 'info',
  });
});

autoUpdater.on('error', (err) => {
  dialog.showErrorBox('Error', err.toString());
});

ipcMain.on('open-file', (event) => {
  const selectedFiles = dialog.showOpenDialogSync({
    defaultPath: os.homedir(),
    properties: ['openFile', 'multiSelections'],
  });
  event.returnValue = selectedFiles;
});

ipcMain.on('file-opened', (event) => {
  if (
    process.argv.length >= 2 &&
    !isDev &&
    fs.lstatSync(process.argv[1]).isFile()
  ) {
    event.returnValue = true;
  } else event.returnValue = false;
});

ipcMain.on('get-file-path', (event) => {
  event.returnValue = [
    process.argv[1],
    !(path.extname(process.argv[1]) === '.enc'),
  ];
});

ipcMain.on(
  'encrypt-or-decrypt',
  (event, passwd: string, encrypt: boolean, filePaths: string[]) => {
    mainWindow.setProgressBar(2);
    if (encrypt) {
      const resultFilePath = dialog.showSaveDialogSync({
        defaultPath: os.homedir(),
      });
      if (typeof resultFilePath !== 'undefined') {
        encFiles(filePaths, passwd, resultFilePath + '.enc');
        const options = {
          type: 'info',
          title: 'Information',
          message: 'Encryption succeed.',
        };
        dialog.showMessageBoxSync(mainWindow, options);
      }
    } else {
      let result = true;
      for (let i = 0; i < filePaths.length; i++) {
        result = decFiles(filePaths[i], passwd);
        if (!result) break;
      }
      if (!result) dialog.showErrorBox('ERROR', 'Wrong password.');
      else {
        const options = {
          type: 'info',
          title: 'Information',
          message: 'Decryption succeed.',
        };
        dialog.showMessageBoxSync(mainWindow, options);
      }
    }
    mainWindow.setProgressBar(-1);
  }
);
