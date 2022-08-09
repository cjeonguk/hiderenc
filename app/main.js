const { app, BrowserWindow, ipcMain, dialog, Menu } = require('electron');
const { encryptFile, decryptFile } = require('../modules/encrypt');
const path = require('path');

let mainWindow;

const createWindow = () => {
  mainWindow = new BrowserWindow({
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

  mainWindow.loadFile(path.join(__dirname, 'dist', 'index.html'));

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();
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

ipcMain.on('is-mac', (event) => {
  event.returnValue = process.platform === 'darwin';
});

ipcMain.on('close', () => {
  mainWindow.quit();
});

ipcMain.on('maximize', () => {
  mainWindow.isMaximized() ? mainWindow.unmaximize() : mainWindow.maximize();
});

ipcMain.on('minimize', () => {
  mainWindow.minimize();
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
