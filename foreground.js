var recorder = null
function onAccessApproved(stream) {
    recorder = new MediaRecorder(stream);

    recorder.start();

    recorder.onstop = function () {
        stream.getTracks().forEach(function (track) {
            if (track.readyState === "live") {
                track.stop()
                recorder = null
            }
        })
    }

    recorder.ondataavailable = function (event) {
        let recordedBlob = event.data;
        let url = URL.createObjectURL(recordedBlob);

        let a = document.createElement("a");

        a.style.display = "none";
        a.href = url;
        const currentDate = new Date();
        const timestamp = currentDate.getTime(); // Get the current timestamp
        const filename = `${timestamp}-Recordify.webm`;
        a.download = filename;
        document.body.appendChild(a);
        a.click();

        document.body.removeChild(a);

        URL.revokeObjectURL(url);
    }
}


chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("sender", sender)
    if (message.action === "requestrecording") {
        console.log("requesting recording")

        sendResponse(`processed: ${message.action}`);

        navigator.mediaDevices.getDisplayMedia({
            audio: true,
            video: {
                width: 9999999999,
                height: 9999999999
            }
        }).then((stream) => {
            onAccessApproved(stream)
        })
    }

    if (message.action === "stopvideo") {
        console.log("stopping video");
        sendResponse(`processed: ${message.action}`);
        if (!recorder) return console.log("no recorder")

        recorder.stop();


    }

})