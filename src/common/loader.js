/**
 * Created by shu on 7/3/2017.
 */

const fontManager = require('font-manager')

class FontLoader {
  constructor() {
    this.fonts = []
    this.lastSync = null
  }

  /**
   * Load all system fonts via `font-manager`, returns a promise
   */
  load() {
    return new Promise((resolve, reject) => {
      fontManager.getAvailableFonts(fonts => {
        this.fonts = fonts
        this.lastSync = new Date()

        resolve(fonts)
      })
    })
  }

  getFonts() {
    return this.fonts
  }
}

module.exports = new FontLoader()
