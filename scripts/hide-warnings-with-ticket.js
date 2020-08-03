// ==UserScript==
// @name         [Managed Workplace] Hide Warnings with Ticket
// @namespace    https://ece24.net/
// @version      0.1
// @description  On the warnings overview page hide warnings that have a ticket assigned
// @author       Sean Nicholas Dieterle - ECE GmbH
// @match        https://eu01.mw-rmm.barracudamsp.com/SC/AlertStatus.aspx
// @grant        none
// ==/UserScript==

;(function () {
  'use strict'

  // SETTINGS START

  const localstorageKey = 'eceHideTickets'

  // SETTINGS END

  const helpers = {
    createHTMLElement: (html) => {
      const template = document.createElement('template')
      template.innerHTML = html.trim()
      return template.content.firstChild
    },
    runMultipleTimes: (func, options) => {
      const { times = 60, ms = 500, completed = () => {} } = options
      let iterations = 1

      let intervalID = setInterval(() => {
        if (iterations === times) {
          clearInterval(intervalID)
          completed()
          return
        }

        func()
        iterations++
      }, ms)
    },
  }

  function getPanel() {
    return document.querySelector(
      '#ctl00_SCPageContent_totalAlerts_panelActions',
    )
  }

  function getTabelRows() {
    return Array.from(document.querySelectorAll('.rgMasterTable tr'))
  }

  function getTicketRows() {
    return getTabelRows().filter(
      (row) => row.innerHTML.search(/ID [1-9][0-9]{2,4}/) !== -1,
    )
  }

  function hide() {
    getTicketRows().forEach((row) => {
      row.style.display = 'none'
    })
  }

  function unhide() {
    getTicketRows().forEach((row) => {
      row.style.display = 'table-row'
    })
  }

  function doHiding(active) {
    if (active === undefined) {
      active = getState()
    }

    if (active) {
      hide()
    } else {
      unhide()
    }

    document.querySelector('#eceHideTickets').checked = active
  }

  function setState(active) {
    localStorage.setItem(localstorageKey, active)
  }

  function getState() {
    return JSON.parse(localStorage.getItem(localstorageKey))
  }

  function listenOnExanderInputs() {
    document.querySelectorAll('.rgExpandCol input').forEach((input) =>
      input.addEventListener(
        'click',
        () => {
          console.log('clicked')
          helpers.runMultipleTimes(
            () => {
              doHiding()
            },
            { completed: () => listenOnExanderInputs() },
          )
        },
        { times: 4 },
      ),
    )
  }

  const checkboxContent = `
        <div class="btn-group" style="margin-left: 3px;">
          <div class="btn btn-default" style="width: 150px; height: 34px; text-align: center; display: flex; align-items: center; justify-content: center;">
            <input type="checkbox" id="eceHideTickets" name="eceHideTickets" style="margin: 0; padding: 0;">
            <label for="eceHideTickets" style="margin: 0; margin-left: 4px; padding: 0;">Tickets verstecken</label>
          </div>
        </div>
    `

  const checkbox = helpers.createHTMLElement(checkboxContent)
  getPanel().appendChild(checkbox)

  document.querySelector('#eceHideTickets').onclick = (event) => {
    const active = event.srcElement.checked
    doHiding(active)
    setState(active)
  }

  doHiding()
  listenOnExanderInputs()
})()
