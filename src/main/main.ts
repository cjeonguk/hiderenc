import { app, BrowserWindow, ipcMain, dialog, Menu } from 'electron';
import { autoUpdater } from 'electron-updater';
import { encryptFile, decryptFile } from './modules/encrypt';
import path from 'path';

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

  autoUpdater.checkForUpdatesAndNotify();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

// autoUpdater.on('update-available', () => {
//   const options = {
//     message: 'Available updates exist.',
//     title: 'Update',
//     type: 'question',
//     buttons: ['Not now', 'Quit the program and update'],
//     defaultId: 1,
//   };

//   const res = dialog.showMessageBoxSync(mainWindow, options);
//   if (res) autoUpdater.downloadUpdate();
// });

// autoUpdater.on('update-downloaded', () => {
//   autoUpdater.quitAndInstall();
// });

// autoUpdater.on('error', (err) => {
//   dialog.showErrorBox('Error', err.toString());
// });

ipcMain.on('open-file', (event) => {
  const selectedFiles = dialog.showOpenDialogSync(mainWindow, {
    defaultPath: require('os').homedir(),
  });
  event.returnValue = selectedFiles;
});

ipcMain.on('file-opened', (event) => {
  if (process.argv.length >= 2 && !isDev) {
    event.returnValue = true;
  } else event.returnValue = false;
});

ipcMain.on('get-file-path', (event) => {
  event.returnValue = process.argv[1];
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
    dialog.showMessageBox(mainWindow, options);
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
      dialog.showMessageBox(mainWindow, options);
    } else
      dialog.showErrorBox(
        'ERROR',
        'Maybe this error is because the password you entered is wrong.'
      );
  }
});
