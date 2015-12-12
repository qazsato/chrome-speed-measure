'use strict';

const api = chrome.runtime && chrome.runtime.onMessage ? "runtime" : "extension";
chrome[api].onMessage.addListener(
  (request, sender, sendResponse) => {
    chrome.storage.local.get("cache", data => {
      if (!data.cache) {
        data.cache = {};
      }
      data.cache["tab" + sender.tab.id] = request.timing;  // cacheにtiming値を保存
      chrome.storage.local.set(data);
    });

    let startTime = request.timing.redirectStart === 0 ? request.timing.fetchStart : request.timing.redirectStart;
    let endTime = request.timing.loadEventEnd;
    let totalTime = ((endTime - startTime) / 1000).toPrecision(3).substring(0, 4);
    chrome.browserAction.setBadgeText({text: totalTime, tabId: sender.tab.id});
  }
);

chrome.tabs.onRemoved.addListener(tabId => {
    chrome.storage.local.get("cache", data => {
        if (data.cache) {
          delete data.cache["tab" + tabId];
        }
        chrome.storage.local.set(data);
    });
});
