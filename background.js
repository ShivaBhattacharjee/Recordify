//chrome

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === "complete" && /^http/.test(tab.url)) {
        chrome.scripting.executeScript({
            target: { tabId },
            files: ["./contentscript.js"]
        }).then(() => {
            console.log("we have injected the content script");
        }).catch(err => console.log(err, "error in background script "))
    }
})