var yo = require('yo-yo')
var csjs = require('csjs-inject')
const remixLib = require('remix-lib')

const styleguide = require('../ui/styles-guide/theme-chooser')
const styles = styleguide.chooser()

// API
class VerticalIconsApi {

  constructor(verticalIconsComponent, pluginManagerComponent) {
    this.component = verticalIconsComponent
    pluginManagerComponent.event.on('internalActivated', (mod, content) => verticalIconsComponent.addIcon(mod.name, content) )
  }

  add(moduleName, icon) {
    this.component.addIcon(moduleName, icon)
  }

  removeIcon(icon) {
    this.component.removeIcon(icon)
  }
}
module.exports = VerticalIconsApi
