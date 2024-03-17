document.addEventListener("DOMContentLoaded",()=>{
    const startRecording = document.getElementById("startRecording");
    const stopRecording = document.getElementById("stopRecording");

    startRecording.addEventListener("click",()=>{
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {action: "requestRecording"}, function(response) {
              if(!chrome.runtime.lastError){
                alert(response);
              }else{
                alert("Error couldnt start recording ");
                console.log(chrome.runtime.lastError);
              }
            });
          });
    })

    stopRecording.addEventListener("click",()=>{
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {action: "stopRecording"}, function(response) {
              if(!chrome.runtime.lastError){
                alert(response);
              }else{
                alert("Error couldnt stop recording ");
                console.log(chrome.runtime.lastError);
              }
            });
          });
    })

})