
var yo = require('yo-yo')
var csjs = require('csjs-inject')
const remixLib = require('remix-lib')

const styleguide = require('../ui/styles-guide/theme-chooser')
const styles = styleguide.chooser()
  
  // Component
  class VerticalIconComponent {
  
    constructor() {
    }
  
    addIcon (item) {

    }

    removeIcon (item) {

    }

    _iconClick (event) {
      // called when an icon has been clicked
      this.event.emit('showContent', event.target.name)
    }

    render() {
        yo`
          <div id='plugins' class=${css.plugins} >
            <h3>example</h3>${this._iconClick}
          </div>
        `
    }
  }

  module.exports = VerticalIconComponent
