navigator.mediaDevices.getUserMedia({ audio: true })
    .then(function (stream) {
        let audioTrack = stream.getAudioTracks()[0];
        let microphoneName = audioTrack.label;

        let button = document.getElementById("microphone-button");
        button.innerHTML = '<i class="fa-solid fa-microphone"></i>' + microphoneName;

        stream.getTracks().forEach(function (track) {
            track.stop();
        });
    })
    .catch(function (error) {
        alert("Microphone access denied");
        console.log(error);
    });

function handleMenuToggle(menuBtn, menu) {
    menuBtn.addEventListener("click", function () {
        menu.classList.toggle("active");
    });
}

// Instead of using handleMenuToggle, use the onclick attribute directly
const settingBtn = document.getElementById("settingsIcon");
const settingMenu = document.getElementById("settingMenu");
settingBtn.onclick = function () {
    settingMenu.classList.toggle("active");
};

const shareBtn = document.getElementById("shareIcon");
const shareMenu = document.getElementById("shareMenu");
shareBtn.onclick = function () {
    shareMenu.classList.toggle("active");
};
