const { app, BrowserWindow, ipcMain, dialog, Menu } = require('electron');
const { autoUpdater } = require('electron-updater');
const { encryptFile, decryptFile } = require('./modules/encrypt');
const path = require('path');

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 600,
    height: 360,
    minWidth: 600,
    minHeight: 360,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  const isMac = process.platform === 'darwin';
  const isDev = process.env.NODE_ENV === 'development';
  const menuTemplate = [
    ...(isMac
      ? [
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
        ]
      : []),
  ];

  Menu.setApplicationMenu(Menu.buildFromTemplate(menuTemplate));

  autoUpdater.checkForUpdates();

  if (isDev) {
    mainWindow.loadURL('http://localhost:3000');
    console.log(process.env.NODE_ENV);
  } else mainWindow.loadFile(path.join(__dirname, 'dist', 'index.html'));

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

app.whenReady().then(() => {
  createWindow();

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
    buttons: ['Quit the program and update', 'Not now'],
    defaultId: 0,
  };

  dialog.showMessageBox(null, options).then((res) => {
    if (res === 0) autoUpdater.downloadUpdate();
  });
});

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall();
});

ipcMain.on('open-file', (event) => {
  const selectedFiles = dialog.showOpenDialogSync(null, {
    defaultPath: require('os').homedir(),
  });
  event.returnValue = selectedFiles;
});

ipcMain.on('encrypt-or-decrypt', (event, passwd, encrypt, filePaths) => {
  if (encrypt) {
    for (let i = 0; i < filePaths.length; i++) {
      encryptFile(filePaths[i], passwd);
    }
    const options = {
      type: 'info',
      title: 'Information',
      message: 'Encryption succeed.',
    };
    dialog.showMessageBox(null, options);
  } else {
    let success = true;
    for (let i = 0; i < filePaths.length; i++) {
      success = decryptFile(filePaths[i], passwd);
    }
    if (success) {
      const options = {
        type: 'info',
        title: 'Information',
        message: 'Decryption succeed.',
      };
      dialog.showMessageBox(null, options);
    } else
      dialog.showErrorBox(
        'ERROR',
        'Maybe this error is because the password you entered is wrong.'
      );
  }
});
