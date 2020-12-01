// define button events to spongemock the input text
let button = document.getElementById('transformButton');
button.onclick = function (e) {
  let text = document.getElementById('inputText');
  text.value = spongeMockIt(text.value);
};

// convert someString to sOmEsTrInG
function spongeMockIt(text) {
  return text.split('').map((c, i) =>
    i % 2 == 0 ? c.toLowerCase() : c.toUpperCase()
  ).join('');
}

let backgroundPage = chrome.extension.getBackgroundPage();
// get var from backgroundPage which contains text from highlight event
if (backgroundPage.selectText.length > 0) {
  inputText.value = backgroundPage.selectText;
}