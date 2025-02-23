// Modal Inputs
const taskTextInput = document.getElementById("task-text-input");
const taskTimeInput = document.getElementById("timer-minutes");
const taskAlertCheckbox = document.getElementById("timer-checkbox");
const taskStartButton = document.getElementById("timer-start");
// Modal Window
const taskDialogWindow = document.getElementById("task-dialog-window");
// Settings Display
const taskText = document.getElementById("task-text");
const countdownText = document.getElementById("countdown-display");
// Settings Inputs
const pauseButton = document.getElementById("pause");
const pauseButtonImage = document.getElementById("pausebutton-image");
const resetButton = document.getElementById("reset");
// Display Image
const roomImage = document.getElementById("timer-bg-image");
// Ambient Toggles
const playWindButton = document.getElementById("wind-button");
const playRainButton = document.getElementById("rain-button");
const playStormButton = document.getElementById("storm-button");
const playFireButton = document.getElementById("fireplace-button");
const playCricketsButton = document.getElementById("cricket-button");
const playWhitenoiseButton = document.getElementById("whitenoise-button");
const playPinknoiseButton = document.getElementById("pinknoise-button");
const playBrowniannoiseButton = document.getElementById("browniannoise-button");
// Ambient Volume Sliders
const windVolumeSlider = document.getElementById("wind-volume");
const rainVolumeSlider = document.getElementById("rain-volume");
const stormVolumeSlider = document.getElementById("storm-volume");
const fireVolumeSlider = document.getElementById("fireplace-volume");
const cricketsVolumeSlider = document.getElementById("cricket-volume");
const whitenoiseVolumeSlider = document.getElementById("whitenoise-volume");
const pinknoiseVolumeSlider = document.getElementById("pinknoise-volume");
const browniannoiseVolumeSlider = document.getElementById("browniannoise-volume");
// Background Image controls
let stormy = false;
let fireplace = false;
let plants = false;
let noise = false;

let intervalId;
let remainingTime = 0;
let remainigHours = 0;
let remainingMinutes = 0;
let remainingSeconds = 0;

let playAlert = false;
let timerPaused = true;

// Setup: Audio Tracks
const alertSound = new Audio("./assets/audio/alert.webm");

const rain = {
    audio : new Audio("./assets/audio/rain.webm"),
    volume : 50,
    isPlaying : false
}

const wind = {
    audio : new Audio("./assets/audio/wind.webm"),
    volume : 50,
    isPlaying : false
}

const storm = {
    audio : new Audio("./assets/audio/storm.webm"),
    volume : 50,
    isPlaying : false
}

const fire = {
    audio : new Audio("./assets/audio/fireplace.webm"),
    volume : 50,
    isPlaying : false
}

const crickets = {
    audio : new Audio("./assets/audio/crickets.webm"),
    volume : 50,
    isPlaying : false
}

const whitenoise = {
    audio : new Audio("./assets/audio/white.webm"),
    volume : 50,
    isPlaying : false
}

const pinknoise = {
    audio : new Audio("./assets/audio/pink.webm"),
    volume : 50,
    isPlaying : false
}

const browniannoise = {
    audio : new Audio("./assets/audio/brownian.webm"),
    volume : 50,
    isPlaying : false
}

wind.audio.loop = true;
rain.audio.loop = true;
storm.audio.loop = true;
fire.audio.loop = true;
crickets.audio.loop = true;
whitenoise.audio.loop = true;
pinknoise.audio.loop = true;
browniannoise.audio.loop = true;

function timerActive() {
    taskDialogWindow.setAttribute("style", "visibility: hidden;");
    intervalId = setInterval(timeout, 1000);
    pauseButton.removeAttribute("disabled", "");
    resetButton.removeAttribute("disabled", "");
    timerPaused = false;
    pauseButtonImage.setAttribute("src", "/assets/images/pause.webp");
    pauseButton.classList.remove("button-grayed");
    resetButton.classList.remove("button-grayed");
}

function timerNotActive() {
    clearInterval(intervalId);
    taskDialogWindow.removeAttribute("style");
    pauseButton.setAttribute("disabled", "");
    resetButton.setAttribute("disabled", "");
    timerPaused = true;
    pauseButtonImage.setAttribute("src", "/assets/images/play.webp");
    pauseButton.classList.add("button-grayed");
    resetButton.classList.add("button-grayed");
}

function timeout() {
    if (!timerPaused) {
        if (remainingTime > 1)
            {
                remainingTime--;
                remainingMinutes = Math.floor(remainingTime/60) + 1;
                remainingSeconds = remainingTime - (remainingMinutes - 1) * 60;
                console.log("minutes:", Math.floor(remainingTime/60), " seconds:", remainingSeconds);
                countdownText.innerText = `${remainingMinutes.toString()}`;
                countdownText.innerText += remainingMinutes > 1 ? " minutes to go" : " mniute to go";
            }
            else
            {
                if (playAlert)
                    {
                        alertSound.play();
                    }
                timerNotActive();
            }
    }
}

// When the page finishes loading, display the dialog window asking for a timer name
window.onload = () => {
    windVolumeSlider.value = 50;
    rainVolumeSlider.value = 50;
    stormVolumeSlider.value = 50;
    fireVolumeSlider.value = 50;
    cricketsVolumeSlider.value = 50;
    whitenoiseVolumeSlider.value = 50;
    pinknoiseVolumeSlider.value = 50;
    browniannoiseVolumeSlider.value = 50;

    wind.audio.volume = .5;
    rain.audio.volume = .5;
    storm.audio.volume = .5;
    fire.audio.volume = .5;
    crickets.audio.volume = .5;
    whitenoise.audio.volume = .5;
    browniannoise.audio.volume = .5;

    playWindButton.classList.add("button-grayed");
    playRainButton.classList.add("button-grayed");
    playStormButton.classList.add("button-grayed");
    playFireButton.classList.add("button-grayed");
    playCricketsButton.classList.add("button-grayed");
    playWhitenoiseButton.classList.add("button-grayed");
    playPinknoiseButton.classList.add("button-grayed");
    playBrowniannoiseButton.classList.add("button-grayed");

    pauseButton.classList.add("button-grayed");
    resetButton.classList.add("button-grayed");
}

// Pressing start hides the modal, sets the remaingTime and starts the countdown
taskStartButton.addEventListener("click", () => {
    taskText.innerText = taskTextInput.value != 0 ? taskText.innerText : "";
    taskText.innerText = taskTextInput.value;
    remainingTime = +taskTimeInput.value * 60;
    playAlert = taskAlertCheckbox.checked;
    timerActive();
});

pauseButton.addEventListener("click", () => {
        if (timerPaused)  {
            pauseButtonImage.setAttribute("src", "/assets/images/pause.webp");
        }
        else {
            pauseButtonImage.setAttribute("src", "/assets/images/play.webp");
        }
        timerPaused = !timerPaused;
});

resetButton.addEventListener("click", () => {
    timerPaused = true;
    timerNotActive();
});

playWindButton.addEventListener("click", () =>  {
    audioPlayPause(wind);
    changeButton(playWindButton, wind);
});

playRainButton.addEventListener("click", () => {
    audioPlayPause(rain);
    changeRoom();
    changeButton(playRainButton, rain);
    if (storm.isPlaying) {
        audioPlayPause(storm);
        changeButton(playStormButton, storm);
    }
});

playStormButton.addEventListener("click", () => {
    audioPlayPause(storm)
    changeRoom();
    changeButton(playStormButton, storm);
    if (rain.isPlaying) {
        audioPlayPause(rain);
        changeButton(playRainButton, rain);
    }
});

playFireButton.addEventListener("click", () => {
    audioPlayPause(fire)
    changeRoom();
    changeButton(playFireButton, fire);
});

playCricketsButton.addEventListener("click", () => {
    audioPlayPause(crickets)
    changeRoom();
    changeButton(playCricketsButton, crickets);
});

playWhitenoiseButton.addEventListener("click", () => {
    audioPlayPause(whitenoise)
    changeRoom();
    changeButton(playWhitenoiseButton, whitenoise);
    if (pinknoise.isPlaying) {
        audioPlayPause(pinknoise);
        changeButton(playPinknoiseButton, pinknoise);
    }
    if (browniannoise.isPlaying) {
        audioPlayPause(browniannoise);
        changeButton(playBrowniannoiseButton, browniannoise);
    }
});

playPinknoiseButton.addEventListener("click", () => {
    audioPlayPause(pinknoise)
    changeRoom();
    changeButton(playPinknoiseButton, pinknoise);
    if (whitenoise.isPlaying) {
        audioPlayPause(whitenoise);
        changeButton(playWhitenoiseButton, whitenoise);
    }
    if (browniannoise.isPlaying) {
        audioPlayPause(browniannoise);
        changeButton(playBrowniannoiseButton, browniannoise);
    }
});

playBrowniannoiseButton.addEventListener("click", () => {
    audioPlayPause(browniannoise)
    changeRoom();
    changeButton(playBrowniannoiseButton, browniannoise);
    if (whitenoise.isPlaying) {
        audioPlayPause(whitenoise);
        changeButton(playWhitenoiseButton, whitenoise);
    }
    if (pinknoise.isPlaying) {
        audioPlayPause(pinknoise);
        changeButton(playPinknoiseButton, pinknoise);
    }
});

// Ambient Sliders Control
windVolumeSlider.addEventListener("input", () => {
    if (wind.volume != windVolumeSlider.value)
    {
        wind.volume = windVolumeSlider.value;
        wind.audio.volume = wind.volume / 100;
    }
});

rainVolumeSlider.addEventListener("input", () => {
    if (rain.volume != rainVolumeSlider.value)
    {
        rain.volume = rainVolumeSlider.value;
        rain.audio.volume = rain.volume / 100;
    }
});

stormVolumeSlider.addEventListener("input", () => {
    if (storm.volume != stormVolumeSlider.value)
    {
        storm.volume = stormVolumeSlider.value;
        storm.audio.volume = storm.volume / 100;
    }
});

cricketsVolumeSlider.addEventListener("input", () => {
    if (crickets.volume != cricketsVolumeSlider.value)
    {
        crickets.volume = cricketsVolumeSlider.value;
        crickets.audio.volume = crickets.volume / 100;
    }
});

whitenoiseVolumeSlider.addEventListener("input", () => {
    if (whitenoise.volume != whitenoiseVolumeSlider.value)
    {
        whitenoise.volume = whitenoiseVolumeSlider.value;
        whitenoise.audio.volume = whitenoise.volume / 100;
    }
});

pinknoiseVolumeSlider.addEventListener("input", () => {
    if (pinknoise.volume != pinknoiseVolumeSlider.value)
    {
        pinknoise.volume = pinknoiseVolumeSlider.value;
        pinknoise.audio.volume = pinknoise.volume / 100;
    }
});

browniannoiseVolumeSlider.addEventListener("input", () => {
    if (browniannoise.volume != browniannoiseVolumeSlider.value)
    {
        browniannoise.volume = browniannoiseVolumeSlider.value;
        browniannoise.audio.volume = browniannoise.volume / 100;
    }
});

// When the timer reches zero play the alert sound, stop the timer, and display the dialog window
function showModal() {
    
}

function audioPlayPause(audioSrc) {
    audioSrc.isPlaying = !audioSrc.isPlaying;
    if (audioSrc.isPlaying) {
        audioSrc.audio.play();
    }
    else{
        audioSrc.audio.pause();
    }
}

function changeRoom() {
    if (rain.isPlaying || storm.isPlaying) {
        stormy = true;
    }
    else {
        stormy = false;
    }
    if (fire.isPlaying) {
        fireplace = true;
    }
    else {
        fireplace = false;
    }
    if (crickets.isPlaying) {
        plants = true;
    } else {
        plants = false;
    }
    if (whitenoise.isPlaying || browniannoise.isPlaying) {
        noise = true;
    } else {
        noise = false;
    }
    changeRoomImage(`assets/images/room_${+stormy}${+fireplace}${+plants}${+noise}.webp`);
}

function changeRoomImage(newRoom) {
    let currentRoom = roomImage.getAttribute("src");
    if (currentRoom !== newRoom) {
        roomImage.setAttribute("src", newRoom);
    }
}

function changeButton(btn, ambient) {
    if (ambient.isPlaying) {
        btn.classList.add("button-lightup");
        btn.classList.remove("button-grayed");
    }
    else {
        btn.classList.add("button-grayed");
        btn.classList.remove("button-lightup");
    }
}
