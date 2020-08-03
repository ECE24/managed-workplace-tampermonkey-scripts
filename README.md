# Managed Workplace Tampermonkey Scripts

These scripts should make the Barracuda Managed Workplace UI more usable.

## Usage

- Install [Tampermonkey](https://www.tampermonkey.net/) in
  [Chrome](https://www.tampermonkey.net/?ext=dhdg&browser=chrome),
  [Firefox](https://www.tampermonkey.net/?ext=dhdg&browser=firefox),
  [Edge](https://www.tampermonkey.net/?ext=dhdg&browser=edge) or use another supported browser.
- Open the extension in your browser and select "Create new Script"
- Paste the content of one of our scripts into the editor
- Save the script
- Reload the corresponding page and check if the script works

## Scripts

Currently we offer the following scripts:

- **[Clear Warnings via Shortcut](./scripts/clear-warnings-via-shortcut.js):** Hit F2 on the warnings screen to clear a warning and focus the textarea for the notes (nice if you have more warnings than fit on your screen and you need to constantly scroll up to go to the clear button).
- **[Hide Clear-All Button](./scripts/hide-clear-all-button.js):** Hides the clear-all button to prevent clicking it by accident.
- **[Create Device Links](./scripts/create-device-links.js):** Adds three links to every warning that lets you open the overview, alerts and remotetools of that device in a new tab
- **[Run-Script Textarea Monospaced](./scripts/run-script-textarea-monospaced.js):** Use a monospaced font in the textarea that displays the results from a script execution (useful if you print tables in your scripts)
- **[Hide Warnings with Ticket](./scripts/hide-warnings-with-ticket.js):** On the warnings overview page hide warnings that have a ticket assigned (show me only the new stuff 😉)
- **[Send Warning via Mail](./scripts/send-warning-via-mail.js):** Adds a button to send a warning via your default mailing program on the create-ticket page
