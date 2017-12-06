const {app, BrowserWindow} = require('electron');
const path = require('path');
const url = require('url');

const {ipcMain} = require('electron')


//init window
let win;
let login;

var check = 0;

function createWindow(){
  //create browser window
  win = new BrowserWindow({width:1800, height:800});

  //Load index.html
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  //open devtools
  win.webContents.openDevTools();

  win.on('closed', () => {
    win = null;
  })

login = new BrowserWindow({frame: false,
    width: 800,
    height: 600,
    minWidth: 800,
    minHeight: 600,
    backgroundColor: '#312450',
    show: true,
    //icon: path.join(__dirname, 'assets/icons/png/64x64.png'),
    parent: win
  })

login.loadURL(url.format({
    pathname: path.join(__dirname, 'login2.html'),
    protocol: 'file:',
    slashes: true
  }))

}//end createwindow


//run create window function


ipcMain.on('open-second-window', (event, arg)=> {
    login.show()
})

ipcMain.on('close-second-window', (event, arg)=> {
    login.hide()
})


app.on('ready',createWindow);


//Quit when all windows are closed
app.on('windows-all-closed', () => {
if((process.platform !== 'darwin')){
    app.quit();
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})
