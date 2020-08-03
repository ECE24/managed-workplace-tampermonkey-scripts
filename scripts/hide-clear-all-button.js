// ==UserScript==
// @name         [Managed Workplace] Hide Clear-All Button
// @namespace    https://ece24.net/
// @version      0.1
// @description  Hides the clear-all button from the warnings view
// @author       Sean Nicholas Dieterle - ECE GmbH
// @match        https://eu01.mw-rmm.barracudamsp.com/SC/AlertStatus.aspx
// @grant        none
// ==/UserScript==

;(function () {
  'use strict'

  document.querySelector('input[value="Alle bestätigen"]').style.display =
    'none'
})()
