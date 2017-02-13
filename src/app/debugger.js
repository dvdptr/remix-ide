'use strict'

var remix = require('ethereum-remix')
var ace = require('brace')
var Range = ace.acequire('ace/range').Range

/**
 * Manage remix and source highlighting
 */
function Debugger (id, editor, compiler, executionContextEvent, switchToFile, offsetToLineColumnConverter) {
  this.el = document.querySelector(id)
  this.offsetToLineColumnConverter = offsetToLineColumnConverter
  this.debugger = new remix.ui.Debugger()
  this.sourceMappingDecoder = new remix.util.SourceMappingDecoder()
  this.el.appendChild(this.debugger.render())
  this.editor = editor
  this.switchToFile = switchToFile
  this.compiler = compiler
  this.markers = {}

  var self = this
  executionContextEvent.register('contextChanged', this, function (context) {
    self.switchProvider(context)
  })

  this.debugger.event.register('traceUnloaded', this, function () {
    self.removeMarkers()
  })

  // unload if a file has changed (but not if tabs were switched)
  editor.event.register('contentChanged', function () {
    self.debugger.unLoad()
  })

  // register selected code item, highlight the corresponding source location
  this.debugger.codeManager.event.register('changed', this, function (code, address, index) {
    if (self.compiler.lastCompilationResult) {
      this.debugger.callTree.sourceLocationTracker.getSourceLocationFromInstructionIndex(address, index, self.compiler.lastCompilationResult.data.contracts, function (error, rawLocation) {
        if (!error) {
          var lineColumnPos = self.offsetToLineColumnConverter.offsetToLineColumn(rawLocation, rawLocation.file, self.editor, self.compiler.lastCompilationResult.data)
          self.highlight(lineColumnPos, rawLocation)
        } else {
          self.unhighlight()
        }
      })
    }
  })
}

/**
 * Start debugging using Remix
 *
 * @param {String} txHash    - hash of the transaction
 */
Debugger.prototype.debug = function (txHash) {
  var self = this
  this.debugger.web3().eth.getTransaction(txHash, function (error, tx) {
    if (!error) {
      self.debugger.setCompilationResult(self.compiler.lastCompilationResult.data)
      self.debugger.debug(tx)
    }
  })
}

/**
 * highlight the given @arg lineColumnPos
 *
 * @param {Object} lineColumnPos - position of the source code to hightlight {start: {line, column}, end: {line, column}}
 * @param {Object} rawLocation - raw position of the source code to hightlight {start, length, file, jump}
 */
Debugger.prototype.highlight = function (lineColumnPos, rawLocation) {
  this.unhighlight()
  var name = this.editor.getCacheFile() // current opened tab
  var source = this.compiler.lastCompilationResult.data.sourceList[rawLocation.file] // auto switch to that tab
  if (name !== source) {
    this.switchToFile(source) // command the app to swicth to the next file
  }
  var range = new Range(lineColumnPos.start.line, lineColumnPos.start.column, lineColumnPos.end.line, lineColumnPos.end.column)
  this.markers['highlightcode'] = this.editor.addMarker(range, 'highlightcode')
  if (lineColumnPos.start.line === lineColumnPos.end.line) {
    var fullrange = new Range(lineColumnPos.start.line, 0, lineColumnPos.start.line + 1, 0)
    this.markers['highlightcode_fullLine'] = this.editor.addMarker(fullrange, 'highlightcode_fullLine')
  }
}

/**
 * unhighlight the given @arg lineColumnPos
 *
 * @param {Object} lineColumnPos - position of the source code to hightlight {start: {line, column}, end: {line, column}}
 * @param {Object} rawLocation - raw position of the source code to hightlight {start, length, file, jump}
 */
Debugger.prototype.unhighlight = function (lineColumnPos, rawLocation, cssCode) {
  this.removeMarker('highlightcode')
  this.removeMarker('highlightcode_fullLine')
}

/**
 * add a new web3 provider to remix
 *
 * @param {String} type - type/name of the provider to add
 * @param {Object} obj  - provider
 */
Debugger.prototype.addProvider = function (type, obj) {
  this.debugger.addProvider(type, obj)
}

/**
 * switch the provider
 *
 * @param {String} type - type/name of the provider to use
 */
Debugger.prototype.switchProvider = function (type) {
  this.debugger.switchProvider(type)
}

/**
 * get the current provider
 */
Debugger.prototype.web3 = function (type) {
  return this.debugger.web3()
}

/**
 * unhighlight highlighted statements
 */
Debugger.prototype.removeMarkers = function () {
  for (var k in this.markers) {
    this.removeMarker(k)
  }
}

/**
 * unhighlight the current highlighted statement
 */
Debugger.prototype.removeMarker = function (key) {
  if (this.markers[key]) {
    this.editor.removeMarker(this.markers[key])
    this.markers[key] = null
  }
}

module.exports = Debugger
