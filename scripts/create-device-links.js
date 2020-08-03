// ==UserScript==
// @name         [Managed Workplace] Create Device Links
// @namespace    https://ece24.net
// @version      0.1
// @description  Adds three links to every warning that lets you open the overview, alerts and remotetools of that device in a new tab
// @author       Sean Nicholas Dieterle - ECE GmbH
// @match        https://eu01.mw-rmm.barracudamsp.com/SC/Status/Site/Alerts.aspx*
// @match        https://eu01.mw-rmm.barracudamsp.com/SC/AlertStatus.aspx*
// @grant        none
// ==/UserScript==

;(function () {
  'use strict'

  const helpers = {
    createHTMLElement: (html) => {
      const template = document.createElement('template')
      template.innerHTML = html.trim()
      return template.content.firstChild
    },
  }

  function createLinks() {
    Array.from(document.querySelectorAll('a'))
      .filter((el) => el.onclick && el.onclick.toString().includes('cmh'))
      .forEach((el) => {
        const match = el.onclick.toString().match(/cmh\(([0-9]+),/)
        if (!match || match.length < 2) return
        const deviceId = match[1]

        const buttons = [
          {
            link: `https://eu01.mw-rmm.barracudamsp.com/SC/DeviceInfo/Overview.aspx?DeviceID=${deviceId}&Menu=Overview`,
            title: 'Overview',
            content: 'O',
            backgroundColor: '#4f8edc',
            additionalCss: '',
          },
          {
            link: `https://eu01.mw-rmm.barracudamsp.com/SC/DeviceInfo/DeviceAlerts.aspx?DeviceID=${deviceId}&Menu=Alerts`,
            title: 'Alters',
            content: 'A',
            backgroundColor: '#e74c3c',
            additionalCss: 'margin-left: 2px;',
          },
          {
            link: `https://eu01.mw-rmm.barracudamsp.com/SC/RemoteManagement/ManagementTools.aspx?DeviceID=${deviceId}&Menu=RemoteTools&SelectedTab=RemoteTools`,
            title: 'Remotetools',
            content: 'R',
            backgroundColor: '#4CAF50',
            additionalCss: 'margin-left: 2px;',
          },
        ]

        el.parentElement.prepend(helpers.createHTMLElement('<br>'))

        for (const button of buttons.reverse()) {
          const html = `<a href="${button.link}" target="_blank" style="padding: 2px 6px; background: ${button.backgroundColor}; border-radius: 4px; color:white; ${button.additionalCss}" title="${button.title}">${button.content}</a>`
          const buttonElement = helpers.createHTMLElement(html)
          el.parentElement.prepend(buttonElement)
        }
      })

    function onClickCreateLinksAgain(el) {
      el.addEventListener('click', () => setTimeout(createLinks, 1500))
    }

    document.querySelectorAll('.rgExpand').forEach(onClickCreateLinksAgain)
    document.querySelectorAll('.rgHeader').forEach(onClickCreateLinksAgain)
  }

  createLinks()
})()
