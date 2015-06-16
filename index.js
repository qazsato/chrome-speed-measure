chrome.tabs.getSelected(null, function (tab) {
	chrome.storage.local.get('cache', function(data) {
		var timing = data.cache['tab' + tab.id];
		document.getElementById("load-time").innerText = getSecondStr(timing.navigationStart, timing.loadEventEnd);
		var html = "";
		var json = getTimingData(timing);
		for (var i in json) {
			html += getRowHtml(i, json[i]);
		}
		document.getElementsByTagName("tbody")[0].innerHTML = html;
    });
});

function getTimingData(timing) {
	return {
		"redirect"		: getSecondStr(timing.redirectStart, timing.redirectEnd),
		"AppCache"		: getSecondStr(timing.fetchStart, timing.domainLookupStart),
		"DNS"			: getSecondStr(timing.domainLookupStart, timing.domainLookupEnd),
		"TCP"			: getSecondStr(timing.connectStart, timing.connectEnd),
		"Request"		: getSecondStr(timing.requestStart, timing.responseStart),
		"Response"		: getSecondStr(timing.responseStart, timing.responseEnd),
		"Processing"	: getSecondStr(timing.domLoading, timing.domComplete),
		"onLoad"		: getSecondStr(timing.loadEventStart, timing.loadEventEnd),
	};
}

function getSecondStr(startTime, endTime) {
	return (endTime - startTime) / 1000 + "秒"; 
}

function getRowHtml(key, value) {
	return "<tr>" +
				"<td>" + key + "</td>" +
				"<td>" + value + "</td>" +
			"</tr>";
}