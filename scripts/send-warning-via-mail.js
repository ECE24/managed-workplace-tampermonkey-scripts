// ==UserScript==
// @name         [Managed Workplace] - Send Warning via Mail
// @namespace    https://ece24.net/
// @version      0.1
// @description  Adds a button to send a warning via your default mailing program on the create-ticket page
// @author       Sean Nicholas Dieterle - ECE GmbH
// @match        https://eu01.mw-rmm.barracudamsp.com/SC/TroubleTickets*
// @grant        none
// ==/UserScript==

;(function () {
  'use strict'

  // SETTINGS START

  const sendTo = 'your-mail@example.com'

  // SETTINGS END

  const helpers = {
    createHTMLElement: (html) => {
      const template = document.createElement('template')
      template.innerHTML = html.trim()
      return template.content.firstChild
    },
  }

  function addButton() {
    const titleEl = document.querySelector('#ctl00_SCPageContent_txbTitle')
    const title = titleEl.value

    const siteEl = document.querySelector('#ctl00_SCPageContent_ddlSite')
    const site = siteEl.options[siteEl.selectedIndex].text

    const contentEl = document.querySelector(
      '#ctl00_SCPageContent_llTextContextData',
    )
    const content = contentEl.innerText

    const subject = `[${encodeURIComponent(site)}] ${encodeURIComponent(title)}`
    const body = encodeURIComponent(content)

    const mailto = `mailto:${sendTo}?subject=${subject}&body=${body}`

    const button = helpers.createHTMLElement(
      `<a href="${mailto}" class="btn btn-primary">Send Warning via Mail</a>`,
    )

    const buttonList = document.querySelector('.panel-footer.text-right')
    buttonList.appendChild(button)
  }

  addButton()
})()
