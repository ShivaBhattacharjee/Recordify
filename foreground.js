console.log("Hello from the foreground");

let recorder = null;

function onStreamAccess(stream) {
    recorder = new MediaRecorder(stream);
    recorder.start();

    recorder.onstop = function () {
        stream.getTracks().forEach(track => track.stop());
        recorder = null; 
    }

    recorder.ondataavailable = function (event) {
        const videoBlob = new Blob([event.data], { type: "video/webm" });
        const videoUrl = URL.createObjectURL(videoBlob);
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = videoUrl;
        a.download = `${Math.random()}Recording.webm`;

        document.body.appendChild(a)
        a.click();

        document.body.removeChild(a);

        URL.revokeObjectURL(videoUrl)
    }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "requestRecording") {
        sendResponse(`processed: ${request.action}`);
        navigator.mediaDevices.getDisplayMedia({
            audio: true,
            video: {
                width: { ideal: 4096 },
                height: { ideal: 2160 },
            }
        }).then((stream) => {
            onStreamAccess(stream);
        }).catch((err) => {
            alert("Error capturing ");
            console.log(err);
        })
    }

    if (request.action === "stopRecording") {
        sendResponse(`processed: ${request.action}`);
        if (!recorder) return alert("No recording to stop");
        recorder.stop();
    }
});
