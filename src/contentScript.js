// convert someString to sOmEsTrInG
function spongeMockIt(text) {
    return text.split('').map((c, i) =>
        i % 2 == 0 ? c.toLowerCase() : c.toUpperCase()
    ).join('');
}

// recursively go through all DOM nodes and apply spongeMockIt() on it
function spongeMockAll(node, regex) {
    node.childNodes.forEach(function (el) {
        // If this is a text node
        if (el.nodeType === Node.TEXT_NODE) {
            //skip <script> and <style> which also are text nodes
            if (el.parentNode.nodeName !== 'SCRIPT' && el.parentNode.nodeName !== 'STYLE') {
                // Ignore this node it it an empty text node
                if (el.nodeValue.trim() !== "") {
                    // Only if regex exists and matches
                    if (!!regex && el.textContent.trim().match(regex, 'i')) {
                        el.textContent = spongeMockIt(el.textContent);
                    }
                }
            }
        } else {
            // Else recurse on this node
            spongeMockAll(el, regex);
        }
    });
}

// run spongeMockIt on body of document
chrome.storage.sync.get('regex', function (data) {
    spongeMockAll(document.body, data.regex);
});

// event for highlight text
window.addEventListener('mouseup', (event) => {
    var selectedText = window.getSelection().toString();
    selectedText = selectedText.replace(/\n/g, ' ').trim();

    if (selectedText.length > 0) {
        let msg = {
            action: 'highlight',
            content: selectedText,
        };
        
        console.log('sending msg: ', msg);
        // pass highlight event as msg to extension
        chrome.runtime.sendMessage(msg);
    }
});