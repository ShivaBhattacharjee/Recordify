document.addEventListener("DOMContentLoaded", () => {
  // GET THE SELECTORS OF THE BUTTONS
  const startVideoButton = document.querySelector("button#startRecording");
  const stopVideoButton = document.querySelector("button#stopRecording");

  // adding event listeners

  startVideoButton.addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { action: "request_recording" }, function (response) {
        if (!chrome.runtime.lastError) {
          console.log(response);
        } else {
          alert(chrome.runtime.lastError.message);
          console.log(chrome.runtime.lastError, 'error line 14');
        }
      })
    })
  })


  stopVideoButton.addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { action: "stopvideo" }, function (response) {
        if (!chrome.runtime.lastError) {
          console.log(response);
        } else {
          alert(chrome.runtime.lastError.message);
          console.log(chrome.runtime.lastError, 'error line 27');
        }
      })
    })
  })
})