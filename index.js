chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
	// MEMO window.onload実行前に表示されるとtimingオブジェクトが取得できないため、intervalでチェック
	var intervalID = setInterval(function () {
		chrome.tabs.sendMessage(tabs[0].id, {action: "getPerformance"}, function(response) {
			if (response && response.timing) {
				$("#load-time").text(getSecondStr(response.timing.navigationStart, response.timing.loadEventEnd));

				var html = "";
				var json = getTimingData(response.timing);
				for (var i in json) {
					html += getRowHtml(i, json[i]);
				}
				$("tbody").append(html);
				$("#loading-area").hide();
				$("#main-area").show();
				clearInterval(intervalID);	// timingオブジェクトが取得できたためinterval解除
			}
		});
	}, 500);
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
