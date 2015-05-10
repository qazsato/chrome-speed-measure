// PerformanceAPIを取得するメッセージを受け付ける
window.onload = function () {
	chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
		if (request.action === "getPerformance"){
			sendResponse(window.performance);
		}
	});
};