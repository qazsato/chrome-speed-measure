(function() {
  if (document.readyState === "complete") {
    send();
  } else {
    window.addEventListener("load", send);
  }
  function send() {
    // timerで逃がさないとバッチが表示されない
    setTimeout(function() {
      var timing = performance.timing;
      var json = {};
      for (var key in timing) {
        json[key] = timing[key];
      }
      var api = chrome.runtime && chrome.runtime.sendMessage ? "runtime" : "extension";
      chrome[api].sendMessage({timing: json});  // background.jsに通知
    }, 10);
  }
})();
