'use strict';

chrome.tabs.getSelected(null, tab => {
  chrome.storage.local.get('cache', data => {
    let timing = data.cache['tab' + tab.id];
    let startTime = timing.redirectStart === 0 ? timing.fetchStart : timing.redirectStart;

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

let getSecondStr = (startTime, endTime) => {
  if (startTime === 0 || endTime === 0 || (endTime - startTime === 0)) {
    return "-";
  }
  let time = Math.round((endTime - startTime) / 10) / 100;
  return time + "秒";
}
