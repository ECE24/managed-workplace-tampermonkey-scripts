// ==UserScript==
// @name         [Managed Workplace] Script Result in New Tab
// @namespace    https://ece24.net/
// @version      0.1
// @description  Opens the results of scripts in a new tab
// @author       Sean Nicholas Dieterle - ECE GmbH
// @match        https://eu01.mw-rmm.barracudamsp.com/SC/Automation/Calendar/MultiDevicesOneScriptExecutionResult.aspx*
// @grant        none
// ==/UserScript==

;(function () {
  'use strict'

  const oldCodeRegex = /window\.location\.href=(.{1,3}\.content);/

  const newFuncText = Sys.WebForms.PageRequestManager.prototype._parseDelta
    .toString()
    .replace(oldCodeRegex, "window.open($1,'_blank');")
  const newFunc = eval(`(${newFuncText})`)
  Sys.WebForms.PageRequestManager.prototype._parseDelta = newFunc
})()
