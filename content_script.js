(function() {
	window.onload = function () {
		// timerで逃がさないとバッチが表示されない
		setTimeout(function() {
			var timing = performance.timing;
			var json = {};
			for (var key in timing) {
				json[key] = timing[key];
			}
			chrome.runtime.sendMessage({timing: json});	// background.jsに通知
		}, 10);
	};
})();