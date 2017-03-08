/**
 * Created by shu on 7/3/2017.
 */

// modified from https://github.com/zeit/hyper/blob/3fb2e04eae3409eadc03a0b42ac736265c2b7f2a/app/rpc.js
const {ipcMain} = require('electron')

class Server {
  constructor(win) {
    this.win = win
    this.listener = {}

    ipcMain.on('msg', ({sender}, data) => {
      if (data && data.event) {
        if (this.listener[data.event]) {
          this.listener[data.event].forEach(listener => listener(data.data))
        }
      }
    })
  }

  on(event, listener) {
    if (this.listener[event]) {
      this.listener[event].push(listener)
    } else {
      this.listener[event] = [listener]
    }
  }

  send(event, data) {
    this.win.webContents.send(event, data)
  }
}

module.exports = win => {
  return new Server(win)
}
