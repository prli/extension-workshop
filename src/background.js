// Global variable to pass highlighted text from webpage content
window.selectText = '';

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  console.log('received msg: ', message);

  if (message.action === 'highlight') {
    selectText = message.content;
  }

  return true;
});

chrome.runtime.onInstalled.addListener(function () {
  console.log('extension have been installed.');

  chrome.contextMenus.create({
    id: "spongemock",
    title: 'what is spongemock?',
    type: 'normal',
    contexts: ['selection']
  });
  chrome.contextMenus.onClicked.addListener(function () {
    window.open("https://knowyourmeme.com/memes/mocking-spongebob");
  });

});
