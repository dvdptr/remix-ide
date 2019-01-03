var yo = require('yo-yo')
var csjs = require('csjs-inject')
const remixLib = require('remix-lib')

const styleguide = require('../ui/styles-guide/theme-chooser')
const styles = styleguide.chooser()

class SwapPanelComponent {
  constructor () {
    // list of contents
    this.contents = {}
    // name of the current displayed content
    this.currentNode
  }

  showContent (moduleName) {
    // hiding the current view and display the `moduleName`
    if (this.contents[moduleName]) {
      // display this.nodes[moduleName]
      // hide this.currentNode
      return
    }
    console.log(`${moduleName} not found`)
  }

  
  add (moduleName, content) {
    this.contents[moduleName, content]
    // add it to the DOM hidden
  }
  

  render () {
    this.view = yo`
      <div id='plugins' class=${css.plugins} >
        <div class=${css.plugItIn} >
            <h1> Plugin 1 </h1>
            <ul> <li> Some Text </li> </ul>
        </div>
        <div class=${css.plugItIn} >
            <h1> Plugin 2 </h1>
            <ul> <li> Some Text </li> </ul>
        </div>
        <div class=${css.plugItIn} >
            <h1> Plugin 3 </h1>
            <ul> <li> Some Text </li> </ul>
        </div>
      </div>
    `
  }
}

module.exports = SwapPanelComponent

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
