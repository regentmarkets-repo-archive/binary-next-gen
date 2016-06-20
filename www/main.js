// Handle Squirrel events for Windows immediately on start
if (require('electron-squirrel-startup')) { return; }

const electron = require('electron');
const { app } = electron;
const { BrowserWindow } = electron;
const { autoUpdater } = electron;
const os = require('os');
var mainWindow = null;
var { Menu } = electron;
var forceQuit = false;
const name = app.getName();
var updateFeed = 'http://localhost:3000/updates/latest';
var isDevelopment = process.env.NODE_ENV === 'development';
var feedURL = '';

// Don't use auto-updater if we are in development 
if (!isDevelopment) {
    if (os.platform() === 'darwin') {
        updateFeed = 'http://app-binary.herokuapp.com/updates/latest'; 
    } else if (os.platform() === 'win32') {
        updateFeed = 'http://app-binary.s3.amazonaws.com/updates/latest/win' + (os.arch() === 'x64' ? '64' : '32');
    }

    autoUpdater.addListener('update-available', function(event) {
        console.log('A new update is available');
        if (mainWindow) {
            mainWindow.webContents.send('update-message', 'update-available');
        }
    });
    autoUpdater.addListener("update-downloaded", function(event, releaseNotes, releaseName, releaseDate, updateURL) {
        console.log('A new update is ready to install', `Version ${releaseName} is downloaded and will be automatically installed on Quit`)
        if (mainWindow) {
            mainWindow.webContents.send('update-message', 'update-downloaded');
        }
    });
    autoUpdater.addListener('error', function (error) {
        console.log(error);
        if (mainWindow) {
            mainWindow.webContents.send('update-message', 'update-error');
        }
    });
    autoUpdater.addListener('checking-for-update', function (event) {
        console.log('checking-for-update');
        if (mainWindow) {
            mainWindow.webContents.send('update-message', 'checking-for-update');
        }
    });
    autoUpdater.addListener("update-not-available", function () {
        console.log('update-not-available');
        if (mainWindow) {
            mainWindow.webContents.send('update-message', 'update-not-available');
        }
    });

    const appVersion = require('./package.json').version;
    const feedLink = updateFeed + '?v=' + appVersion;
    autoUpdater.setFeedURL(feedLink);
}

electron.crashReporter.start({
  productName: 'binary-next-gen',
  companyName: 'binary.com',
  submitURL: 'https://your-domain.com/url-to-submit',
  autoSubmit: true,
});

app.on('window-all-closed', function() {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
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
          if (focusedWindow && isDevelopment) {
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
            forceQuit = true;
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
        click() { require('electron').shell.openExternal('http://app.binary.com'); },
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
            forceQuit = true;
            app.quit();
        },
      },
    ],
  });
}

app.on('ready', function() {

    const menu = Menu.buildFromTemplate(template);

    Menu.setApplicationMenu(menu);
    mainWindow = new BrowserWindow({
        width: 1024,
        height: 680,
    });

    mainWindow.loadURL('file://' + __dirname + '/index.html');

    mainWindow.on('closed', function () {
        console.log('closed');
        mainWindow = null;
        app.quit();
    });

    mainWindow.on('close', function (e) {
        if (!forceQuit) {
            e.preventDefault();
            mainWindow.hide();
        }
    });
    app.on('activate', function () {
       mainWindow.show();
    });

    mainWindow.on('show', function (e) {
        console.log('the window is showing');
        mainWindow.show();
    });

    mainWindow.on('hide', function (e) {
        console.log('the main window is hiding');
    });
});

app.on('activate', function (e) {
  mainWindow.show();
});
app.on('before-quit', function (e) {
  forceQuit = true;
});

