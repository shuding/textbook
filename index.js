/**
 * Created by shu on 7/3/2017.
 */

const {app, BrowserWindow} = require('electron')
const createRPC = require('./src/common/rpc')

const fontLoader = require('./src/common/loader')

app.on('window-all-closed', function () {
  app.quit()
})

app.on('ready', function () {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    show: false,
    titleBarStyle: 'hidden-inset',
    minHeight: 190,
    minWidth: 370,
    webPreferences: {
      experimentalFeatures: true
    }
  })
  mainWindow.loadURL(`file://${__dirname}/src/view/index.html`)
  mainWindow.on('closed', function () {
    mainWindow = null
    app.quit()
  })

  // mainWindow.webContents.openDevTools()
  const rpc = createRPC(mainWindow)
  start(rpc)
})

function start(rpc) {
  rpc.on('init', () => {
    mainWindow.show()
  })
  rpc.on('load_fonts', () => {
    fontLoader.load().then(fonts => {
      rpc.send('fonts_loaded', fonts)
    })
  })
}
