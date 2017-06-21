// Handle Squirrel events for Windows immediately on start
if (require('electron-squirrel-startup')) { return; }

const pack = require('./package.json');
const electron = require('electron');
const os = require('os');
const logger = require('winston');

const appVersion = pack.version;
const { app } = electron;
const { BrowserWindow } = electron;
const { autoUpdater } = electron;
let mainWindow = null;
const { Menu } = electron;
let feedLink = '';

app.setName(pack.productName);

let updateFeed = 'http://localhost:3000/updates/latest';
const isDevelopment = process.env.NODE_ENV === 'development';

logger.level = 'debug';
global.logger = logger;

const path = require('path');

if (!isDevelopment) {
    if (os.platform() === 'darwin') {
        updateFeed = 'http://app-binary.s3.amazonaws.com/updates/latest';
    } else if (os.platform() === 'win32') {
        updateFeed = 'http://app-binary.s3.amazonaws.com/updates/latest/win' + (os.arch() === 'x64' ? '64' : '32');
    }

    autoUpdater.addListener('update-available', (e) => {
        logger.debug('A new update is available');
        if (mainWindow) {
            mainWindow.webContents.send('update-message', 'update-available');
        }
    });
    autoUpdater.addListener('update-downloaded', (event, releaseNotes, releaseName, releaseDate, updateURL) => {
        logger.debug('A new update is ready to install', `Version ${releaseName} is downloaded from ${updateURL} and will be automatically installed on Quit`);
        if (mainWindow) {
            mainWindow.webContents.send('update-message', 'update-downloaded');
            autoUpdater.quitAndInstall();
        }
    });
    autoUpdater.addListener('error', (error) => {
        logger.debug('it fails to update ' + error);
        logger.debug(`error is ${error}`);
        if (mainWindow) {
            mainWindow.webContents.send('update-message', 'update-error');
        }
    });
    autoUpdater.addListener('checking-for-update', (e) => {
        logger.debug('checking-for-update');
        if (mainWindow) {
            mainWindow.webContents.send('update-message', 'checking-for-update');
        }
    });
    autoUpdater.addListener('update-not-available', () => {
        logger.debug('update-not-available');
        if (mainWindow) {
            mainWindow.webContents.send('update-message', 'update-not-available');
        }
    });

    feedLink = updateFeed + '?v=' + appVersion;
    autoUpdater.setFeedURL(feedLink);
}

electron.crashReporter.start({
  productName: 'binary-next-gen',
  companyName: 'binary.com',
  submitURL: 'https://your-domain.com/url-to-submit',
  autoSubmit: true,
});

app.on('window-all-closed', () => {
    app.quit();
});

const name = app.getName();

const template = [
  {
    label: 'View',
    submenu: [
      {
        label: 'Reload',
        accelerator: 'CmdOrCtrl+R',
        click(item, focusedWindow) {
          if (focusedWindow) focusedWindow.reload();
        },
      },
      {
        label: 'Toggle Full Screen',
        accelerator: process.platform === 'darwin' ? 'Ctrl+Command+F' : 'F11',
        click(item, focusedWindow) {
          if (focusedWindow) {
            focusedWindow.setFullScreen(!focusedWindow.isFullScreen());
          }
        },
      },
      {
        label: 'Toggle Developer Tools',
        accelerator: process.platform === 'darwin' ? 'Alt+Command+I' : 'Ctrl+Shift+I',
        click(item, focusedWindow) {
          if (focusedWindow) {
            focusedWindow.webContents.toggleDevTools();
          }
        },
      },
    ],
  },
  {
    label: 'Window',
    role: 'window',
    submenu: [
      {
        label: 'Minimize',
        accelerator: 'CmdOrCtrl+M',
        role: 'minimize',
        click(item, focusedWindow) {
            focusedWindow.minimize();
        },
      },
      {
        label: 'Quit',
        accelerator: 'Command+Q',
        click() {
            app.quit();
        },
      },
       {
        label: 'Hide ' + name,
        accelerator: 'Command+H',
        role: 'hide',
        click(item, focusedWindow) {
            focusedWindow.hide();
        },
      },
    ],
  },
  {
    label: 'Help',
    role: 'help',
    submenu: [
      {
        label: 'Learn More',
        click() { electron.shell.openExternal('http://app.binary.com'); },
      },
    ],
  },
];

if (process.platform === 'darwin') {
  template.unshift({
    label: name,
    submenu: [
      {
        label: 'About ' + name,
        role: 'about',
      },
      {
        type: 'separator',
      },
      {
        label: 'Hide ' + name,
        accelerator: 'Command+H',
        role: 'hide',
        click(item, focusedWindow) {
            focusedWindow.hide();
        },
      },
      {
        type: 'separator',
      },
      {
        label: 'Quit',
        accelerator: 'Command+Q',
        click() {
            app.quit();
        },
      },
    ],
  });
}

app.on('ready', () => {
    const menu = Menu.buildFromTemplate(template);

    logger.debug('Starting application');

    Menu.setApplicationMenu(menu);
    mainWindow = new BrowserWindow({
        name: 'Binary.com',
        width: 1024,
        height: 680,
        toolbar: false,
    });


    mainWindow.loadURL(path.join('file://', __dirname, '/main.html'));

    mainWindow.on('closed', () => {
        mainWindow = null;
    });

    if (!isDevelopment) {
        mainWindow.webContents.on('did-frame-finish-load', () => {
            logger.debug('Checking for updates: ' + feedLink);
            autoUpdater.checkForUpdates();
        });
    }
});

