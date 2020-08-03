// ==UserScript==
// @name         [Managed Workplace] Run-Script Textarea Monospaced
// @namespace    https://ece24.net/
// @version      0.1
// @description  Use a monospaced font in the textarea that displays the results from a script execution
// @author       Sean Nicholas Dieterle - ECE GmbH
// @match        https://eu01.mw-rmm.barracudamsp.com/SC/DeviceInfo/OneDeviceOneScriptExecutionResult.aspx*
// @match        https://eu01.mw-rmm.barracudamsp.com/SC/Automation/Calendar/ResultPageDispatcher.aspx*
// @match        https://eu01.mw-rmm.barracudamsp.com/SC/Automation/Calendar/OneDeviceOneScriptExecutionResult.aspx*
// @grant        none
// ==/UserScript==

;(function () {
  'use strict'

  function addGlobalStyle(css) {
    const head = document.getElementsByTagName('head')[0]

    if (!head) return

    const style = document.createElement('style')
    style.type = 'text/css'
    style.innerHTML = css

    head.appendChild(style)
  }

  addGlobalStyle('textarea  { font-family: monospace !important; }')
})()
