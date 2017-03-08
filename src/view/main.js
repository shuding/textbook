/**
 * Created by shu on 7/3/2017.
 */

var ipc = require('electron').ipcRenderer
var ipcSend = (event, data) => ipc.send('msg', {event, data})

function init() {
  ipcSend('init')
  ipcSend('load_fonts')
  ipc.on('fonts_loaded', initFonts)
}

function initFonts(sender, fonts) {
  var render = new Renderer()
  render.renderAll(fonts)
}

init()
