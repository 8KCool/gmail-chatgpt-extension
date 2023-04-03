chrome.runtime.onInstalled.addListener(function () {
    chrome.runtime.openOptionsPage();
});


chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'openOptionsPage') {
    chrome.runtime.openOptionsPage();
  }
});