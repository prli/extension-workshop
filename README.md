# Chrome Extension Workshop

## Initialize project

Every extension has a JSON-formatted manifest file, named manifest.json, that provides important information.

We will create and load the extension for development.

[git commit](https://github.com/prli/extension-workshop/commit/f0dd0e952ce30f20cbb0daf5000423d86b1c6597)

1. Create a new folder for our project
2. Create git repository with `git init`
3. Create a directory within the project with `mkdir src`
4. Create a manifest json file with `touch manifest.json`
5. open Chrome browser and navigate to `chrome://extensions`
6. Enable "Developer mode"
7. Click "Load unpacked" and select `<path-to-repository>` ![how-to-load-extension](https://raw.githubusercontent.com/prli/extension-workshop/master/load_extension.png)
8. The extension is now running successfully
    - Observe the ID generated
    - Click "Details" to see info of extension

## Content Script

Content scripts are files that run in the context of web pages. They are able to interact with the DOM of the web page the browser visits. Even though they are scripts that interacts with the web page, they run in its own isolated environment.

We will create contentScript which will `spongemock` all `TEXT_NODE` on the current webpage.

[git commit](https://github.com/prli/extension-workshop/commit/a302d3c705b2a4c20faefba11ad7ee22b06dfc8c)

1. Create `contentScript.js`
    - This will contain all our code that will read and modify the DOM of the webpage visited
2. Register the content script in `manifest.json`
    - Content script will only be injected into the webpage visited if the url matches the pattern provided
3. Reload the extension and navigate to the url to see the new changes in action
   - update `matches` to `"https://*.nytimes.com/*"` in `manifest.json` to see extension only work on specific webpages
   - webpage must be refreshed, or a new webpage opened to see the new changes in `contentScript`

## User Options

We will create extension options which will allow user to define regex, so that only sentences matching the regex will be `spongemocked`.

Allow users to customise the behavior of an extension by providing an options page. A user can view an extension's options by right-clicking the extension icon in the toolbar then selecting options or by navigating to the extension management page at `chrome://extensions`, locating the desired extension, clicking Details, then select the options link.

[git commit](https://github.com/prli/extension-workshop/commit/a7dcccfd29ff53f626d4bdf0af5468257ee3f606)

1. Create `options.html` and `options.js`
   - allows user to set regex, so only sentences that match regex will be processed by content script
   - ensure to add `<script src="options.js"></script>`
   - uses `chrome.storage.sync.set` api to persist the value set by user
2. Update `contentScript.js` to process data based on stored regex string
   - uses `chrome.storage.sync.get` api to fetch values in chrome storage
3. Update `manifest.json` to use `options.html` for extension options, as well as request permission to use `storage` API

## Popup

A popup is an HTML file that is displayed in a special window when the user clicks the toolbar icon. A popup works very similarly to a web page; it can contain links to stylesheets and script tags, but does not allow inline JavaScript.

We will create a popup that appears when user clicks on the extension icon in the browser. It allows user to input text, and contains a button that will `spongemock` the user input.

[git commit](https://github.com/prli/extension-workshop/commit/7fd04824ba8c323516f7937eb4f14e3d30c33051)

1. Create `popup.html` and `popup.js`
2. Register `popup.html` in `manifest.json` as `browser_action`
   - Use browser actions to put icons in the main Google Chrome toolbar, to the right of the address bar. Consider `page_action` if extension icon should not always be active
3. Reload the extension and click the extension icon to see the popup

## Background Scripts

The background script is the extension's event handler; it contains listeners for browser events that are important to the extension. Events are browser triggers, such as navigating to a new page, removing a bookmark, or closing a tab. Extensions monitor these events in their background script, then react with specified instructions. It lies dormant until an event is fired then performs the instructed logic. An effective background script is only loaded when it is needed and unloaded when it goes idle.

![extension-architecture](https://raw.githubusercontent.com/prli/extension-workshop/master/extension_%20architecture.png)

```text
Some examples of events include:

- The extension is first installed or updated to a new version.
- The background page was listening for an event, and the event is dispatched.
- A content script or other extension sends a message.
- Another view in the extension, such as a popup, calls runtime.getBackgroundPage.
```

On extension install, we will create an option to the context menu, which will open an url when click. We will create an `mouseup` event for the current webpage, using `contentScript`, that will send a message to indicate user have highlighted some text. The highlighted text will be sent to the extension background and saved. Then the extension popup can use this data to display the text.

[git commit](https://github.com/prli/extension-workshop/commit/a7dc8cd6a78e51ebe53efc86477e53ae82681b5f)

1. Update `contentScript.js` to include an event which will call `sendMessage` when user highlight text
2. Create `background.js` and add listeners
   - onMessage listener is added to handle messages sent from contentScript or other sources
   - onInstall listener is added to handle any initialization needed when the extension is installed and loaded
3. Register `background.js` in `manifest.json`
   - additional "contextMenus" permission is requested
4. Update `popup.js` to fetch the variable which is updated by the onMessage listener
5. Reload the extension and highlight some text on the webpage to observe the changes in `background`
   - Navigate back to the extension management page and click the Reload link. A new field, Inspect views, becomes available with a blue link, background page. This is used to debug the background page.

## Package Extension

Chrome extension have the file extension `.crx`. It is a signed zip file, containing all the assets of the extension. There is a private key `.pem` that is generated when the extension is first packaged into `.crx`. This private key should be kept safe and secure. It is needed to update the extension to a newer version.

![package-extension](https://raw.githubusercontent.com/prli/extension-workshop/master/package_extension.png)

To publish in the Chrome Web Store, for public usage, follow the instructions located [here](https://developer.chrome.com/webstore/publish).

## Further Topics

### NPM

[npm](https://www.npmjs.com/) is a package manager for the JavaScript programming language. It can pull in JQuery, react, and other libraries to be used in the extension. Without NPM, developer would need to download the raw `.js` of the library and include it in the html.

### Webpack

[webpack](https://webpack.js.org/) is an open-source JavaScript module bundler.It is made primarily for JavaScript, but it can transform front-end assets such as HTML, CSS, and images if the corresponding loaders are included. This allows better code organization and a more modular approach to code developemnt.
