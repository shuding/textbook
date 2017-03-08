/**
 * Created by shu on 8/3/2017.
 */

window.$ = require('jquery')
window.Renderer = function Renderer () {
  this.grids = []
  this.lock = false
  this.wait = null
  this.lastEv = 0
  this.key = ''
  this.filterHeart = false

  $('body').on('DOMSubtreeModified', '.font-preview', ev => this.applyToAll(ev))
  $('body').on('click', '.heart-font', ev => this.toggleHeart(ev))
  $('.search').on('keyup', ev => this.filter(this.key = ev.target.value))
  $('.search-btn').on('click', () => {
    $('.search-container').toggleClass('hide')
    $('.search').focus()
  })
  $('.layout-btn').on('click', () => {
    $('#fonts').toggleClass('layout-line')
  })
  $('.heart-btn').on('click', () => {
    $('.heart-btn').toggleClass('active')
    this.filterHeart = $('.heart-btn').hasClass('active')
    this.filter()
  })
}

// require('perfect-scrollbar/jquery')(window.$)
// $('#fonts').perfectScrollbar()

Renderer.prototype.applyToAll = function (ev) {
  if (this.lock) {
    return ev.preventDefault()
  }

  let delta = Date.now() - this.lastEv
  if (delta < 500) {
    this.wait = this.lastEv
    setTimeout(() => {
      if (this.wait && Date.now() - this.wait >= 500) {
        this.wait = null
        this.applyToAll(ev)
      }
    }, 500 - delta)
    return
  }
  this.lastEv = Date.now()

  let content = $(ev.target).text()
  let scrPos = ev.target.offsetTop - $('#fonts').scrollTop()
  this.lock = true
  this.grids.map(grid => grid.grid.find('.font-preview')).forEach(preview => {
    preview[0] !== ev.target && preview.text(content)
  })
  this.lock = false
  $('#fonts').scrollTop(ev.target.offsetTop - scrPos)
}
Renderer.prototype.toggleHeart = function (ev) {
  let target = $(ev.target), index = target[0].dataset.index
  target.toggleClass('active')
  this.grids[index].heart = typeof this.grids[index].heart === 'undefined' ? true : !this.grids[target[0].dataset.index].heart
  if (this.filterHeart) {
    this.filter()
  }
}
Renderer.prototype.renderGrids = function ($el, n) {
  $el.html(`<p class="fonts-info">Viewing ${n} font families</p>`)
  this.grids = []
  for (; n--;) {
    let grid = $('<div class="font-grid"></div>')
    $el.append(grid)
    this.grids.push({grid})
  }
}
Renderer.prototype.renderFont = function (font, n) {
  this.grids[n].grid.html(`<div>
    <p class="font-name">${font.family} - ${font.style}<span class="oi heart-font${this.grids[n].heart ? ' active' : ''}" data-glyph="heart" data-index="${n}"></span></p>
    <p class="font-preview" style="font-family: '${font.family}'; font-weight: ${font.weight}; font-style: ${font.italic ? 'italic' : 'normal'}">A quick brown fox jumps over the lazy dog.</p>
  </div>`)
  this.grids[n].font = font
  this.grids[n].key = (font.family + ' ' + font.style).toLowerCase()
}
Renderer.prototype.renderAll = function (fonts) {
  fonts = fonts.sort((a, b) => a.family > b.family ? 1 : -1)
  this.renderGrids($('#container #fonts'), fonts.length)
  fonts.forEach((font, i) => this.renderFont(font, i))
}
Renderer.prototype.filter = function (key = this.key) {
  this.grids.forEach(grid => {
    if (grid.key.match(key.toLowerCase())) {
      if (grid.heart || !this.filterHeart) {
        return grid.grid.removeClass('hide')
      }
    }
    grid.grid.addClass('hide')
  })
}
