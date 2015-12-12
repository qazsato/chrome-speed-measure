'use strict';

(() => {
  let send = () => {
    // timerで逃がさないとバッチが表示されない
    setTimeout(() => {
      let timing = performance.timing;
      let json = {};
      for (let key in timing) {
        if (typeof timing[key] !== "function") {
          json[key] = timing[key];
        }
      }
      const api = chrome.runtime && chrome.runtime.sendMessage ? "runtime" : "extension";
      chrome[api].sendMessage({timing: json});  // background.jsに通知
    }, 10);
  }
  if (document.readyState === "complete") {
    send();
  } else {
    window.addEventListener("load", send);
  }
})();
