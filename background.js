chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		chrome.storage.local.get('cache', function(data) {
			if (!data.cache) {
				data.cache = {};
			}
			data.cache['tab' + sender.tab.id] = request.timing;	// cacheにtiming値を保存
			chrome.storage.local.set(data);
		});
		var totalTime = "" + ((request.timing.loadEventEnd - request.timing.navigationStart) / 1000);
		chrome.browserAction.setBadgeText({text: totalTime.substring(0, 4), tabId: sender.tab.id});
	}
);
 
chrome.tabs.onRemoved.addListener(function(tabId) {
    chrome.storage.local.get('cache', function(data) {
        if (data.cache) {
        	delete data.cache['tab' + tabId];
        }
        chrome.storage.local.set(data);
    });
});