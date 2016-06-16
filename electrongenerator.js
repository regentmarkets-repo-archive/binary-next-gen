const electron = require('electron');
const app = electron.app;  // Module to control application life.
const BrowserWindow = electron.BrowserWindow;  // Module to create native browser window.
var { Menu, MenuItem } = electron;

var force_quit = false;

var menu = Menu.buildFromTemplate([
  {
    label: 'Sample',
    submenu: [
      {label: 'About App', selector: 'orderFrontStandardAboutPanel:'},
      {label: 'Quit', accelerator: 'CmdOrCtrl+Q', click: function() {force_quit=true; app.quit();}}
    ]
  }]);


// Report crashes to our server.
electron.crashReporter.start({
  productName: 'binary-next-gen',
  companyName: 'binary.com',
  submitURL: 'https://your-domain.com/url-to-submit',
  autoSubmit: true
});

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
var mainWindow = null;

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform != 'darwin') {
    app.quit();
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 680,
  });

  // and load the index.html of the app.
  //mainWindow.loadURL('file://' + __dirname + '/../www/index.html',{"userAgent":"Mobile"}); for mobile
  mainWindow.loadURL('file://' + __dirname + '/www/index.html'); 
  // Open the DevTools.
  //mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    console.log("closed");
    mainWindow = null;
    app.quit();
  });

  //emitted during the closing 
  mainWindow.on('close', function(e){
        /*if(!force_quit){
            e.preventDefault();
            mainWindow.hide();
        }*/
  });
});
