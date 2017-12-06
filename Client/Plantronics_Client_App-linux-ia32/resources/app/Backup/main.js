const {app, BrowserWindow} = require('electron');
const path = require('path');
const url = require('url');

//init window
let win;

function createWindow(){
  //create browser window
  win = new BrowserWindow({width:1800, height:800});

  //Load index.html
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'login2.html'),
    // pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  //open devtools
  win.webContents.openDevTools();

  win.on('closed', () => {
    win = null;
  })
}//end createwindow

//run create window function
app.on('ready', createWindow);

//Quit when all windows are closed
app.on('windows-all-closed', () => {
  if(process.platform !== 'darwin'){
    app.quit();
  }
})
