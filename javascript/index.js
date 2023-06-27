// Request microphone access
navigator.mediaDevices.getUserMedia({ audio: true })
    .then(function (stream) {

        let audioTrack = stream.getAudioTracks()[0];

        let microphoneName = audioTrack.label;

        // mic name might change depending on browser as every api deals in a diff manner
        let button = document.getElementById("microphone-button");
        button.innerHTML = '<i class="fa-solid fa-microphone"></i>' + microphoneName;

        stream.getTracks().forEach(function (track) {
            track.stop();
        });
    })
    .catch(function (error) {
        // show alert of mic access is denied
        alert("Microphone access denied");
        console.log(error)
    });


//   open and close settings and share  menu

function handleMenuToggle(menuBtn, menu) {
    menuBtn.addEventListener("click", function() {
      menu.classList.toggle("active");
    });
  
    document.addEventListener("click", function(event) {
      const target = event.target;
      if (!menu.contains(target) && !menuBtn.contains(target)) {
        menu.classList.remove("active");
      }
    });
  }
  
  const settingBtn = document.getElementById("settingsIcon");
  const settingMenu = document.getElementById("settingMenu");
  handleMenuToggle(settingBtn, settingMenu);
  
  const shareBtn = document.getElementById("shareIcon");
  const shareMenu = document.getElementById("shareMenu");
  handleMenuToggle(shareBtn, shareMenu);
  