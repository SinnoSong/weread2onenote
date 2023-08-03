'use strict';
chrome.action.onClicked.addListener(() => chrome.windows.create({ url: "index.html" }));
chrome.runtime.onMessage.addListener(function (message) {
    // 处理background page传递的消息，并执行重定向
    // 这里可以使用window.location.href = "重定向URL";
    console.log(chrome.window.location.href);
});

