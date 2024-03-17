
const startRecording = document.getElementById("startRecording");
const stopRecording = document.getElementById("stopRecording");

startRecording.addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { action: "requestRecording" }, function (response) {
      if (!chrome.runtime.lastError) {
        alert(response);
        startRecording.disabled = true;
        stopRecording.disabled = false;
      } else {
        alert(chrome.runtime.lastError.message || "Error couldnt start recording ");
        console.log(chrome.runtime.lastError);
      }
    });
  });
})

stopRecording.addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { action: "stopRecording" }, function (response) {
      if (!chrome.runtime.lastError) {
        alert(response);
        startRecording.disabled = false;
        stopRecording.disabled = true;
      } else {
        alert(chrome.runtime.lastError.message || "Error couldnt stop recording ");
        console.log(chrome.runtime.lastError);
      }
    });
  });
})
