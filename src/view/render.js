/**
 * Created by shu on 8/3/2017.
 */

window.$ = require('jquery')
window.Renderer = function Renderer () {
  this.grids = []
}

Renderer.prototype.renderGrids = function ($el, n) {
  $el.html(`<p class="fonts-info">Viewing ${n} font families</p>`)
  this.grids = []
  for (; n--;) {
    let grid = $('<div class="font-grid"></div>')
    $el.append(grid)
    this.grids.push(grid)
  }
}
Renderer.prototype.renderFont = function (font, n) {
  console.log(font.style)
  this.grids[n].html(`<div>
    <p class="font-name">${font.family}</p>
    <p class="font-preview" style="font-family: '${font.family}'">The recorded voice scratched in the speaker.</p>
  </div>`)
}
Renderer.prototype.renderAll = function (fonts) {
  // console.log(fonts)
  this.renderGrids($('#container #fonts'), fonts.length)
  fonts.forEach((font, i) => this.renderFont(font, i))
}
