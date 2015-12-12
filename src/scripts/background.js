var api = chrome.runtime && chrome.runtime.onMessage ? "runtime" : "extension";
chrome[api].onMessage.addListener(
  function(request, sender, sendResponse) {
    chrome.storage.local.get("cache", function(data) {
      if (!data.cache) {
        data.cache = {};
      }
      data.cache["tab" + sender.tab.id] = request.timing;  // cacheにtiming値を保存
      chrome.storage.local.set(data);
    });

    var startTime = request.timing.redirectStart === 0 ? request.timing.fetchStart : request.timing.redirectStart;
    var endTime = request.timing.loadEventEnd;
    var totalTime = ((endTime - startTime) / 1000).toPrecision(3).substring(0, 4);
    chrome.browserAction.setBadgeText({text: totalTime, tabId: sender.tab.id});
  }
);

chrome.tabs.onRemoved.addListener(function(tabId) {
    chrome.storage.local.get("cache", function(data) {
        if (data.cache) {
          delete data.cache["tab" + tabId];
        }
        chrome.storage.local.set(data);
    });
});
