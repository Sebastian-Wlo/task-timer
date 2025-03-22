// Control Variables
let timerActive = false;
let timerPaused = false;
let controlButtonsActive = false;
let countdownTimerSeconds = 0;
let countdownTimerMinutes = 0;
let countdownTimerHours = 0;
let playAlert = false;

let timer;
//AlertSoundSetup
const alertSound = new Audio("../assets/audio/alert.webm");

// Modal Window Setup
const popupWindow = document.getElementById("timer-modal");
const popupTextInput = document.getElementById("task-name");
const popupTimeInput = document.getElementById("popup-minutes");
const popupAlertCheckbox = document.getElementById("popup-checkbox");
const popupStartButton = document.getElementById("popup-button");

// UI Setup
const taskDisplayName = document.getElementById("task-title");
const countdownText = document.getElementById("countdown-display");
const pauseButton = document.getElementById("pause-button");
const resetButton = document.getElementById("reset-button");

//Background Image Setup
const backgroundImageFore = document.getElementById("room-image");
let imageModifiers = [false, false, false, false];

// Master Audio Slider
const masterVolumeSlide = document.getElementById("master-volume");
// Ambient Audio Setup
let ambientSounds = {
  wind: {
    button: document.getElementById("wind-enable"),
    audio: new Audio("../assets/audio/wind.webm"),
    slider: document.getElementById("wind-volume"),
    audioVolume: 0,
  },
  rain: {
    button: document.getElementById("rain-enable"),
    audio: new Audio("../assets/audio/rain.webm"),
    slider: document.getElementById("rain-volume"),
    audioVolume: 0,
  },
  storm: {
    button: document.getElementById("storm-enable"),
    audio: new Audio("../assets/audio/storm.webm"),
    slider: document.getElementById("storm-volume"),
    audioVolume: 0,
  },
  fire : {
    button: document.getElementById("fire-enable"),
    audio: new Audio("../assets/audio/fireplace.webm"),
    slider: document.getElementById("fire-volume"),
    audioVolume: 0,
  },
  cricket: {
    button: document.getElementById("cricket-enable"),
    audio: new Audio("../assets/audio/crickets.webm"),
    slider: document.getElementById("cricket-volume"),
    audioVolume: 0,
  },
  white: {
    button: document.getElementById("white-enable"),
    audio: new Audio("../assets/audio/white.webm"),
    slider: document.getElementById("white-volume"),
    audioVolume: 0,
  },
  pink: {
    button: document.getElementById("pink-enable"),
    audio: new Audio("../assets/audio/pink.webm"),
    slider: document.getElementById("pink-volume"),
    audioVolume: 0,
  },
  brownian: {
    button: document.getElementById("brownian-enable"),
    audio: new Audio("../assets/audio/brownian.webm"),
    slider: document.getElementById("brownian-volume"),
    audioVolume: 0,
  }
};


// Timeout Setup
function timeout() {
  console.log(countdownTimerSeconds);
  if (!timerPaused && countdownTimerSeconds >= 1) {
    countdownTimerMinutes = Math.floor(countdownTimerSeconds / 60) + 1;
    countdownTimerSeconds -= 1;
    console.log(`Remaining Time: ${countdownTimerMinutes} minutes, ${countdownTimerSeconds - ((countdownTimerMinutes - 1) * 60)} seconds.`);
    if (countdownTimerMinutes > 1) {
      countdownText.innerText = `${countdownTimerMinutes} minutes to go`;
    } else {
      countdownText.innerText = "One minute to go";
    }
  } else if (countdownTimerSeconds < 1) {
    if (playAlert) {
      alertSound.play();
    }
    timerStop();
  }
};

// Task Timer Setup
// Resize the text iput field accordingly to the number of lines of text in the textarea
function auto_height(elem) {
    elem.style.height = '1px';
    elem.style.height = `${elem.scrollHeight}px`;
}

function timerRun() {
  timerActive = true;
  timerPaused = false;
  showHideModal();
  enableDisableControls();
  timer = setInterval(timeout, 1000);
}

function timerPause() {
  timerPaused = !timerPaused;
  changePlayPauseButton();
}

function timerStop() {
  countdownText.innerHTML = "&nbsp;";
  //taskDisplayName.innerHTML = "&nbsp;";
  timerActive = false;
  showHideModal();
  enableDisableControls();
  clearInterval(timer);
}

function showHideModal() {
  if (timerActive) {
    popupWindow.classList.add("visibility-hidden");
  } else {
    popupWindow.classList.remove("visibility-hidden");
  };
}

function enableDisableControls() {
  resetButton.disabled = !(resetButton.disabled);
  pauseButton.disabled = !(pauseButton.disabled);
}

popupStartButton.addEventListener("click", () => {
  taskDisplayName.innerText = popupTextInput.value;
  countdownTimerSeconds = popupTimeInput.value * 60;
  playAlert = popupAlertCheckbox.checked;
  console.log("Play alert? ", playAlert);
  // Hide the main modal
  timerRun();
  changePlayPauseButton();
});

pauseButton.addEventListener("click", () => {
  timerPause();
});

resetButton.addEventListener("click", () => {
  timerStop();
  changePlayPauseButton();
});


// When Master Volume is changed, update the audio levels 
masterVolumeSlide.addEventListener("input", () => {
    changeVolume();
});

// When any of the volume settings are changed, update all outputs taking master setting into account 
function changeVolume() {
  alertSound.volume = masterVolumeSlide.value;
  for (let sound in ambientSounds) {
    ambientSounds[sound].audio.volume = ambientSounds[sound].audioVolume * masterVolumeSlide.value;
  }
};

function changePlayPauseButton() {
  if (!(timerActive) ||timerPaused) {
    pauseButton.innerHTML = `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M16.6582 9.28638C18.098 10.1862 18.8178 10.6361 19.0647 11.2122C19.2803 11.7152 19.2803 12.2847 19.0647 12.7878C18.8178 13.3638 18.098 13.8137 16.6582 14.7136L9.896 18.94C8.29805 19.9387 7.49907 20.4381 6.83973 20.385C6.26501 20.3388 5.73818 20.0469 5.3944 19.584C5 19.053 5 18.1108 5 16.2264V7.77357C5 5.88919 5 4.94701 5.3944 4.41598C5.73818 3.9531 6.26501 3.66111 6.83973 3.6149C7.49907 3.5619 8.29805 4.06126 9.896 5.05998L16.6582 9.28638Z" stroke="#FFF" stroke-width="2.5px" stroke-linejoin="round"/></svg>`
  } else {
    pauseButton.innerHTML = `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8 5V19M16 5V19" stroke="#FFF" stroke-width="2.5px" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
  };
};

// When certain Ambient Audio Tracks are selected, change the background image
function changeRoomImg() {
  imageModifiers[0] = (!ambientSounds.rain.button.checked && !ambientSounds.storm.button.checked) ? false : true;
  imageModifiers[1] = (!ambientSounds.fire.button.checked) ? false : true;
  imageModifiers[2] = (!ambientSounds.cricket.button.checked) ? false : true;
  imageModifiers[3] = (!ambientSounds.white.button.checked && !ambientSounds.pink.button.checked && !ambientSounds.brownian.button.checked) ? false : true;
  
  backgroundImageFore.setAttribute("src", `../assets/images/room_${+imageModifiers[0]}${+imageModifiers[1]}${+imageModifiers[2]}${+imageModifiers[3]}.webp`)
};

window.onload = () => {
  auto_height(popupTextInput);
  // Setup for Ambient Inputs
  for (let sound in ambientSounds) {
    ambientSounds[sound].audio.loop = true;
    ambientSounds[sound].audioVolume = ambientSounds[sound].slider.value;
    
    ambientSounds[sound].button.addEventListener("change", () => {
      if (ambientSounds[sound].button.checked){
        ambientSounds[sound].audio.play();
        switch (sound) {
          case "rain":
            ambientSounds.storm.audio.pause();
            ambientSounds.storm.button.checked = false;
            break;
          case "storm":
            ambientSounds.rain.audio.pause();
            ambientSounds.rain.button.checked = false;
            break;
          case "white":
            ambientSounds.pink.audio.pause();
            ambientSounds.pink.button.checked = false;
            ambientSounds.brownian.audio.pause();
            ambientSounds.brownian.button.checked = false;
            break;
          case "pink":
            ambientSounds.white.audio.pause();
            ambientSounds.white.button.checked = false;
            ambientSounds.brownian.audio.pause();
            ambientSounds.brownian.button.checked = false;
            break;
          case "brownian":
            ambientSounds.white.audio.pause();
            ambientSounds.white.button.checked = false;
            ambientSounds.pink.audio.pause();
            ambientSounds.pink.button.checked = false;
            break;
          default:
            break;
        };
      }
      else {
        ambientSounds[sound].audio.pause();
      };
      changeRoomImg();
    });
    
    ambientSounds[sound].slider.addEventListener("input", () => {
      if (ambientSounds[sound].slider.value !== ambientSounds[sound].audioVolume) {
        ambientSounds[sound].audioVolume = ambientSounds[sound].slider.value
        changeVolume();
      };
   });
};
  // Update Volume levels to default
  changeVolume();
}