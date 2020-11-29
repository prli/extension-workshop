// Saves options to chrome.storage
function save_options() {
  var regex = document.getElementById('regex').value;
  chrome.storage.sync.set({
    regex: regex
  }, function () {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function () {
      status.textContent = '';
    }, 750);
  });
}
//display current
chrome.storage.sync.get('regex', function (data) {
  document.getElementById('regex').value = data.regex;
});

document.getElementById('save').addEventListener('click', save_options);