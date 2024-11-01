document.addEventListener("DOMContentLoaded", function () {
    const videoPlayer = document.getElementById("videoPlayer");
    const audioPlayer = document.getElementById("audioPlayer");
    const playPauseBtn = document.getElementById("playPauseBtn");
    const seekBar = document.getElementById("seekBar");
    const muteBtn = document.getElementById("muteBtn");
    const volumeBar = document.getElementById("volumeBar");
    const fileInput = document.getElementById("fileInput");
    const customControls = document.getElementById("customControls");
    const currentTime = document.getElementById("currentTime");
    const duration = document.getElementById("duration");
    const trackTitle = document.getElementById("trackTitle");
  
    let currentPlayer = null;
  
    // Handle file selection
    fileInput.addEventListener("change", function () {
      const file = fileInput.files[0];
      if (!file) return;
  
      const fileURL = URL.createObjectURL(file);
      const fileName = file.name;
      trackTitle.textContent = fileName;
  
      if (file.type.startsWith("video")) {
        videoPlayer.src = fileURL;
        videoPlayer.hidden = false;
        audioPlayer.hidden = true;
        customControls.hidden = false;
        currentPlayer = videoPlayer;
      } else if (file.type.startsWith("audio")) {
        audioPlayer.src = fileURL;
        audioPlayer.hidden = false;
        videoPlayer.hidden = true;
        customControls.hidden = false;
        currentPlayer = audioPlayer;
      }
  
      playPauseBtn.textContent = "Play";
      seekBar.value = 0;
      volumeBar.value = 100;
      currentPlayer.volume = 1;
  
      currentPlayer.addEventListener("loadedmetadata", function () {
        const totalDuration = formatTime(currentPlayer.duration);
        duration.textContent = totalDuration;
      });
    });
  
    // Play / Pause
    playPauseBtn.addEventListener("click", function () {
      if (currentPlayer.paused) {
        currentPlayer.play();
        playPauseBtn.textContent = "Pause";
      } else {
        currentPlayer.pause();
        playPauseBtn.textContent = "Play";
      }
    });
  
    // Update seek bar
    currentPlayer && currentPlayer.addEventListener("timeupdate", function () {
      const value = (100 / currentPlayer.duration) * currentPlayer.currentTime;
      seekBar.value = value;
      currentTime.textContent = formatTime(currentPlayer.currentTime);
    });
  
    // Seek functionality
    seekBar.addEventListener("input", function () {
      const time = currentPlayer.duration * (seekBar.value / 100);
      currentPlayer.currentTime = time;
    });
  
    // Mute / Unmute
    muteBtn.addEventListener("click", function () {
      currentPlayer.muted = !currentPlayer.muted;
      muteBtn.textContent = currentPlayer.muted ? "Unmute" : "Mute";
    });
  
    // Volume control
    volumeBar.addEventListener("input", function () {
      currentPlayer.volume = volumeBar.value / 100;
    });
  
    // Time formatting
    function formatTime(seconds) {
      const minutes = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    }
  });
  