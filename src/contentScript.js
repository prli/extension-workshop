// convert someString to sOmEsTrInG
function spongeMockIt(text) {
    return text.split('').map((c, i) =>
        i % 2 == 0 ? c.toLowerCase() : c.toUpperCase()
    ).join('');
}

// recursively go through all DOM nodes and apply spongeMockIt() on it
function spongeMockAll(node) {
    node.childNodes.forEach(function (el) {
        // If this is a text node
        if (el.nodeType === Node.TEXT_NODE) {
            //skip <script> and <style> which also are text nodes
            if (el.parentNode.nodeName !== 'SCRIPT' && el.parentNode.nodeName !== 'STYLE') {
                // Ignore this node it it an empty text node
                if (el.nodeValue.trim() !== "") {
                    el.textContent = spongeMockIt(el.textContent);
                }
            }
        } else {
            // Else recurse on this node
            spongeMockAll(el);
        }
    });
}

// run spongeMockIt on body of document
spongeMockAll(document.body);