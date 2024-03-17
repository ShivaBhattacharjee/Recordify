// chrome

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab)=> {
    if(changeInfo.status === "complete" && /^http/.test(tab.url)){
        chrome.scripting.executeScript({
            target : {tabId},
            files : ["./foreground.js"]
        }).then(()=>{
            console.log("Injected the foreground script");
        }).catch(err => console.log(err));
    }
})