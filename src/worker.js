'use strict';
chrome.action.onClicked.addListener(() => chrome.windows.create({ url: "index.html" }));