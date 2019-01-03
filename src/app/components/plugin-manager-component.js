var yo = require('yo-yo')
var csjs = require('csjs-inject')
const remixLib = require('remix-lib')

const FilePanel = require('../panels/file-panel')
const CompileTab = require('../tabs/compile-tab')
const SettingsTab = require('../tabs/settings-tab')
const AnalysisTab = require('../tabs/analysis-tab')
const DebuggerTab = require('../tabs/debugger-tab')
const SupportTab = require('../tabs/support-tab')
const TestTab = require('../tabs/test-tab')
const RunTab = require('../tabs/run-tab')

var registry = require('../../global/registry')

const styleguide = require('../ui/styles-guide/theme-chooser')
const styles = styleguide.chooser()

const EventManager = remixLib.EventManager

class PluginManagerComponent {

  constructor () {
    this.modulesDefinition = {
      'FilePanel': { name: 'FilePanel', Type: FilePanel, icon: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4nICAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz48c3ZnIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDUwIDUwIiBoZWlnaHQ9IjUwcHgiIGlkPSJMYXllcl8xIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCA1MCA1MCIgd2lkdGg9IjUwcHgiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxyZWN0IGZpbGw9Im5vbmUiIGhlaWdodD0iNTAiIHdpZHRoPSI1MCIvPjxwYXRoIGQ9Ik00NiwxNXYtNCAgYzAtMS4xMDQtMC44OTYtMi0yLTJjMCwwLTI0LjY0OCwwLTI2LDBjLTEuNDY5LDAtMi40ODQtNC00LTRIM0MxLjg5Niw1LDEsNS44OTYsMSw3djR2Mjl2NGMwLDEuMTA0LDAuODk2LDIsMiwyaDM5ICBjMS4xMDQsMCwyLTAuODk2LDItMiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLXdpZHRoPSIyIi8+PHBhdGggZD0iTTEsNDRsNS0yNyAgYzAtMS4xMDQsMC44OTYtMiwyLTJoMzljMS4xMDQsMCwyLDAuODk2LDIsMmwtNSwyNyIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLXdpZHRoPSIyIi8+PC9zdmc+' },
      'Solidity Compile': { name: 'Solidity Compile', Type: CompileTab, icon: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4nICAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz48c3ZnIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDUwIDUwIiBoZWlnaHQ9IjUwcHgiIGlkPSJMYXllcl8xIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCA1MCA1MCIgd2lkdGg9IjUwcHgiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxyZWN0IGZpbGw9Im5vbmUiIGhlaWdodD0iNTAiIHdpZHRoPSI1MCIvPjxwYXRoIGQ9Ik00NiwxNXYtNCAgYzAtMS4xMDQtMC44OTYtMi0yLTJjMCwwLTI0LjY0OCwwLTI2LDBjLTEuNDY5LDAtMi40ODQtNC00LTRIM0MxLjg5Niw1LDEsNS44OTYsMSw3djR2Mjl2NGMwLDEuMTA0LDAuODk2LDIsMiwyaDM5ICBjMS4xMDQsMCwyLTAuODk2LDItMiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLXdpZHRoPSIyIi8+PHBhdGggZD0iTTEsNDRsNS0yNyAgYzAtMS4xMDQsMC44OTYtMiwyLTJoMzljMS4xMDQsMCwyLDAuODk2LDIsMmwtNSwyNyIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLXdpZHRoPSIyIi8+PC9zdmc+' },
      'Test': { name: 'Test', dep: 'Solidity Compile', Type: TestTab, icon: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4nICAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz48c3ZnIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDUwIDUwIiBoZWlnaHQ9IjUwcHgiIGlkPSJMYXllcl8xIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCA1MCA1MCIgd2lkdGg9IjUwcHgiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxyZWN0IGZpbGw9Im5vbmUiIGhlaWdodD0iNTAiIHdpZHRoPSI1MCIvPjxwYXRoIGQ9Ik00NiwxNXYtNCAgYzAtMS4xMDQtMC44OTYtMi0yLTJjMCwwLTI0LjY0OCwwLTI2LDBjLTEuNDY5LDAtMi40ODQtNC00LTRIM0MxLjg5Niw1LDEsNS44OTYsMSw3djR2Mjl2NGMwLDEuMTA0LDAuODk2LDIsMiwyaDM5ICBjMS4xMDQsMCwyLTAuODk2LDItMiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLXdpZHRoPSIyIi8+PHBhdGggZD0iTTEsNDRsNS0yNyAgYzAtMS4xMDQsMC44OTYtMiwyLTJoMzljMS4xMDQsMCwyLDAuODk2LDIsMmwtNSwyNyIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLXdpZHRoPSIyIi8+PC9zdmc+' },
      'Run': { name: 'Run', Type: RunTab, icon: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4nICAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz48c3ZnIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDUwIDUwIiBoZWlnaHQ9IjUwcHgiIGlkPSJMYXllcl8xIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCA1MCA1MCIgd2lkdGg9IjUwcHgiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxyZWN0IGZpbGw9Im5vbmUiIGhlaWdodD0iNTAiIHdpZHRoPSI1MCIvPjxwYXRoIGQ9Ik00NiwxNXYtNCAgYzAtMS4xMDQtMC44OTYtMi0yLTJjMCwwLTI0LjY0OCwwLTI2LDBjLTEuNDY5LDAtMi40ODQtNC00LTRIM0MxLjg5Niw1LDEsNS44OTYsMSw3djR2Mjl2NGMwLDEuMTA0LDAuODk2LDIsMiwyaDM5ICBjMS4xMDQsMCwyLTAuODk2LDItMiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLXdpZHRoPSIyIi8+PHBhdGggZD0iTTEsNDRsNS0yNyAgYzAtMS4xMDQsMC44OTYtMiwyLTJoMzljMS4xMDQsMCwyLDAuODk2LDIsMmwtNSwyNyIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLXdpZHRoPSIyIi8+PC9zdmc+' },
      'Solidity Static Analysis': { name: 'Solidity Static Analysis', Type: AnalysisTab, icon: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4nICAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz48c3ZnIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDUwIDUwIiBoZWlnaHQ9IjUwcHgiIGlkPSJMYXllcl8xIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCA1MCA1MCIgd2lkdGg9IjUwcHgiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxyZWN0IGZpbGw9Im5vbmUiIGhlaWdodD0iNTAiIHdpZHRoPSI1MCIvPjxwYXRoIGQ9Ik00NiwxNXYtNCAgYzAtMS4xMDQtMC44OTYtMi0yLTJjMCwwLTI0LjY0OCwwLTI2LDBjLTEuNDY5LDAtMi40ODQtNC00LTRIM0MxLjg5Niw1LDEsNS44OTYsMSw3djR2Mjl2NGMwLDEuMTA0LDAuODk2LDIsMiwyaDM5ICBjMS4xMDQsMCwyLTAuODk2LDItMiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLXdpZHRoPSIyIi8+PHBhdGggZD0iTTEsNDRsNS0yNyAgYzAtMS4xMDQsMC44OTYtMiwyLTJoMzljMS4xMDQsMCwyLDAuODk2LDIsMmwtNSwyNyIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLXdpZHRoPSIyIi8+PC9zdmc+' },
      'Debugger': { name: 'Debugger', Type: DebuggerTab, icon: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4nICAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz48c3ZnIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDUwIDUwIiBoZWlnaHQ9IjUwcHgiIGlkPSJMYXllcl8xIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCA1MCA1MCIgd2lkdGg9IjUwcHgiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxyZWN0IGZpbGw9Im5vbmUiIGhlaWdodD0iNTAiIHdpZHRoPSI1MCIvPjxwYXRoIGQ9Ik00NiwxNXYtNCAgYzAtMS4xMDQtMC44OTYtMi0yLTJjMCwwLTI0LjY0OCwwLTI2LDBjLTEuNDY5LDAtMi40ODQtNC00LTRIM0MxLjg5Niw1LDEsNS44OTYsMSw3djR2Mjl2NGMwLDEuMTA0LDAuODk2LDIsMiwyaDM5ICBjMS4xMDQsMCwyLTAuODk2LDItMiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLXdpZHRoPSIyIi8+PHBhdGggZD0iTTEsNDRsNS0yNyAgYzAtMS4xMDQsMC44OTYtMiwyLTJoMzljMS4xMDQsMCwyLDAuODk2LDIsMmwtNSwyNyIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLXdpZHRoPSIyIi8+PC9zdmc+' },
      'Support': { name: 'Support', Type: SupportTab, icon: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4nICAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz48c3ZnIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDUwIDUwIiBoZWlnaHQ9IjUwcHgiIGlkPSJMYXllcl8xIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCA1MCA1MCIgd2lkdGg9IjUwcHgiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxyZWN0IGZpbGw9Im5vbmUiIGhlaWdodD0iNTAiIHdpZHRoPSI1MCIvPjxwYXRoIGQ9Ik00NiwxNXYtNCAgYzAtMS4xMDQtMC44OTYtMi0yLTJjMCwwLTI0LjY0OCwwLTI2LDBjLTEuNDY5LDAtMi40ODQtNC00LTRIM0MxLjg5Niw1LDEsNS44OTYsMSw3djR2Mjl2NGMwLDEuMTA0LDAuODk2LDIsMiwyaDM5ICBjMS4xMDQsMCwyLTAuODk2LDItMiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLXdpZHRoPSIyIi8+PHBhdGggZD0iTTEsNDRsNS0yNyAgYzAtMS4xMDQsMC44OTYtMiwyLTJoMzljMS4xMDQsMCwyLDAuODk2LDIsMmwtNSwyNyIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLXdpZHRoPSIyIi8+PC9zdmc+' },
      'Settings': { name: 'Settings', Type: SettingsTab, icon: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4nICAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz48c3ZnIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDUwIDUwIiBoZWlnaHQ9IjUwcHgiIGlkPSJMYXllcl8xIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCA1MCA1MCIgd2lkdGg9IjUwcHgiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxyZWN0IGZpbGw9Im5vbmUiIGhlaWdodD0iNTAiIHdpZHRoPSI1MCIvPjxwYXRoIGQ9Ik00NiwxNXYtNCAgYzAtMS4xMDQtMC44OTYtMi0yLTJjMCwwLTI0LjY0OCwwLTI2LDBjLTEuNDY5LDAtMi40ODQtNC00LTRIM0MxLjg5Niw1LDEsNS44OTYsMSw3djR2Mjl2NGMwLDEuMTA0LDAuODk2LDIsMiwyaDM5ICBjMS4xMDQsMCwyLTAuODk2LDItMiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLXdpZHRoPSIyIi8+PHBhdGggZD0iTTEsNDRsNS0yNyAgYzAtMS4xMDQsMC44OTYtMiwyLTJoMzljMS4xMDQsMCwyLDAuODk2LDIsMmwtNSwyNyIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLXdpZHRoPSIyIi8+PC9zdmc+' }
    }
    this.plugins = []

    this.activateInternal('FilePanel')
    this.activateInternal('Settings')
    this.activateInternal('Support')
  }

  render () {
    var self = this
    // loop over all this.modules and this.plugins
    var view = yo`
      <div id='pluginManager' class=${css.plugins} >
      </div>
    `
  }

  activatePlugin (name, api) {
    let profile = { json: Plugin1Profile, api: pluginManagerApi }
    let plugin = new Plugin(profile, api)
    this.appManager.addPlugin(plugin)
    // Plugin1Profile.location 
    // mainpanel or swappanel or bottom-bar
    // plugin.render() // plugin.create()
  }

  activateInternal (name) {
    const mod = this.modulesDefinition[name]
    let dep
    if (mod.dep) dep = this.activateInternal(mod.dep)
    const instance = new mod.Type(registry, dep)
    registry.put({api: self._components.filePanel, name: mod.name.toLocaleLowerCase()})
    if (instance.profile && typeof instance.profile === 'function') {
      this.event.emit('requestActivation', instance.profile(), instance)
    }
    this.event.emit('internalActivated', mod, instance.render())
    return instance
  }

  _activate (item) {
    this.event.emit('activation', item)
  }

  _deactivate (item) {
    this.event.emit('deactivation', item)
  }

  renderItem (item) {
    this.plugins.push(item)
    var self = this
    var view = yo`
      <div id='pluginManager' class=${css.plugin} >
        ${item.name}
        ${item.url}
        <button onclick=${() => { self._activate(item) }} ></button>
        <button onclick=${() => { self._deactivate(item) }} ></button>
      </div>
    `
  }
}

module.exports = PluginManagerComponent

const css = csjs`
  .plugins        {
    width          : 300px;
  }
  .plugItIn       {
    display        : none;
  }
  .plugItIn.active     {
    display        :block;
  }
  .clearFunds { background-color: lightblue; }
`
