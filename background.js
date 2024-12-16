chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.url) {
        chrome.storage.sync.get("autoPopup", (data) => {
            if (data.autoPopup) {
                const isSearch = /google\..*\/search|bing\..*\/search|duckduckgo\..*\/\?q=/.test(changeInfo.url);
                if (isSearch) {
                    const random = Math.floor(Math.random() * 10) + 1;
                    if (random === 1) {
                        chrome.action.openPopup();
                    }
                }
            }
        });
    }
});
