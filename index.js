chrome.tabs.getSelected(null, function (tab) {
	chrome.storage.local.get('cache', function(data) {
		var timing = data.cache['tab' + tab.id];
		var startTime = timing.redirectStart === 0 ? timing.fetchStart : timing.redirectStart;
		// Total
		document.getElementById("total-time").innerText = getSecondStr(startTime, timing.loadEventEnd);

		// Network
		document.getElementById("network-time").innerText = getSecondStr(startTime, timing.connectEnd);
		document.getElementById("redirect-time").innerText = getSecondStr(timing.redirectStart, timing.redirectEnd);
		document.getElementById("appCache-time").innerText = getSecondStr(timing.fetchStart, timing.domainLookupStart);
		document.getElementById("dns-time").innerText = getSecondStr(timing.domainLookupStart, timing.domainLookupEnd);
		document.getElementById("tcp-time").innerText = getSecondStr(timing.connectStart, timing.connectEnd);

		// Server
		document.getElementById("server-time").innerText = getSecondStr(timing.requestStart, timing.responseEnd);
		document.getElementById("request-time").innerText = getSecondStr(timing.requestStart, timing.responseStart);
		document.getElementById("response-time").innerText = getSecondStr(timing.responseStart, timing.responseEnd);

		// Client
		document.getElementById("client-time").innerText = getSecondStr(timing.domLoading, timing.loadEventEnd);
		document.getElementById("processing-time").innerText = getSecondStr(timing.domLoading, timing.domComplete);
		document.getElementById("domInteractive-time").innerText = getSecondStr(timing.domLoading, timing.domInteractive);
		document.getElementById("parserBlock-time").innerText = getSecondStr(timing.domInteractive, timing.domContentLoadedEventStart);
		document.getElementById("domContentLoaded-time").innerText = getSecondStr(timing.domInteractive, timing.domContentLoadedEventEnd);
		document.getElementById("domComplete-time").innerText = getSecondStr(timing.domContentLoadedEventEnd, timing.domComplete);
		document.getElementById("load-time").innerText = getSecondStr(timing.loadEventStart, timing.loadEventEnd);
    });
});

function getSecondStr(startTime, endTime) {
	if (startTime === 0 || endTime === 0 || (endTime - startTime === 0)) {
		return "-";
	}
	var time = (endTime - startTime) / 1000;
	return time.toFixed(2) + "秒"; 
}