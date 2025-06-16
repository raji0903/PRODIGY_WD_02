let [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
let display = document.getElementById("display");
let timer = null;

document.getElementById("start").addEventListener("click", () => {
  if (timer === null) {
    timer = setInterval(updateTime, 10); // every 10ms
  }
});

document.getElementById("pause").addEventListener("click", () => {
  clearInterval(timer);
  timer = null;
});

document.getElementById("reset").addEventListener("click", () => {
  clearInterval(timer);
  timer = null;
  [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
  display.innerText = "00:00:00.000";
  document.getElementById("laps").innerHTML = "";
});

document.getElementById("lap").addEventListener("click", () => {
  const lapTime = display.innerText;
  const lapItem = document.createElement("li");
  lapItem.innerText = lapTime;
  document.getElementById("laps").appendChild(lapItem);

  // Play sound
  document.getElementById("lapSound").play();

  // Vibration (if supported)
  if (navigator.vibrate) {
    navigator.vibrate(100);
  }
});

function updateTime() {
  milliseconds += 10;
  if (milliseconds === 1000) {
    milliseconds = 0;
    seconds++;
    if (seconds === 60) {
      seconds = 0;
      minutes++;
      if (minutes === 60) {
        minutes = 0;
        hours++;
      }
    }
  }

  let h = String(hours).padStart(2, "0");
  let m = String(minutes).padStart(2, "0");
  let s = String(seconds).padStart(2, "0");
  let ms = String(milliseconds).padStart(3, "0");

  display.innerText = `${h}:${m}:${s}.${ms}`;
}

// Mode Switcher
const modeBtn = document.getElementById("modeSwitch");
modeBtn.addEventListener("click", () => {
  const body = document.body;
  body.classList.toggle("dark-mode");
  body.classList.toggle("light-mode");

  modeBtn.innerText = body.classList.contains("dark-mode") ? "🌙" : "🌞";
});
