// ==UserScript==
// @name         [Managed Workplace] Clear Warnings via Shortcut
// @namespace    https://ece24.net/
// @version      0.1
// @description  Pressing F2 clears the selected messages. Autofocuses the message input.
// @author       Sean Nicholas Dieterle - ECE GmbH
// @match        https://eu01.mw-rmm.barracudamsp.com/SC/AlertStatus.aspx
// @grant        none
// ==/UserScript==

;(function () {
  'use strict'

  // SETTINGS START

  const textOnClearWarningsButton = 'Bestätigen'
  const clearingKey = 'F2'

  // SETTINGS END

  const helpers = {
    runMultipleTimes: (func, options = {}) => {
      const { times = 60, ms = 500, completed = () => {} } = options
      let iterations = 1

      let intervalID = setInterval(() => {
        const stopRun = () => clearInterval(intervalID)

        if (iterations === times) {
          stopRun()
          completed()
          return
        }

        func({ stopRun })
        iterations++
      }, ms)
    },
  }

  function getButton() {
    return document.querySelector(`input[value="${textOnClearWarningsButton}"]`)
  }

  function focusClearTextInput() {
    helpers.runMultipleTimes(({ stopRun }) => {
      const notes = document.querySelector(
        '#ctl00_SCPageContent_totalAlerts_txtClearNotes',
      )

      if (!notes) return

      const isFocused = document.activeElement === notes

      if (isFocused) {
        stopRun()
        return
      }

      notes.focus()
    })
  }

  function addShortcut() {
    document.addEventListener('keydown', function (event) {
      if (event.key !== clearingKey) return
      getButton().click()
      focusClearTextInput()
    })
  }

  addShortcut()
})()
