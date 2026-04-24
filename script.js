const contadorBtn = document.getElementById('contadorBtn');
const zerarBtn = document.getElementById('zerarBtn');
let count = 0;

function updateCounter() {
  count += 1;
  contadorBtn.textContent = count + (count === 1 ? ' clique' : ' cliques');
}

function resetCounter() {
  count = 0;
  contadorBtn.textContent = '0 cliques';
}

function pressButton(button) {
  button.classList.add('pressed');
}

function releaseButton(button) {
  button.classList.remove('pressed');
}

contadorBtn.addEventListener('click', updateCounter);
zerarBtn.addEventListener('click', resetCounter);

['mousedown', 'touchstart'].forEach((eventName) => {
  contadorBtn.addEventListener(eventName, () => pressButton(contadorBtn));
  zerarBtn.addEventListener(eventName, () => pressButton(zerarBtn));
});

['mouseup', 'mouseleave', 'touchend', 'touchcancel'].forEach((eventName) => {
  contadorBtn.addEventListener(eventName, () => releaseButton(contadorBtn));
  zerarBtn.addEventListener(eventName, () => releaseButton(zerarBtn));
});

const timerDisplay = document.getElementById('timerDisplay');
const hoursInput = document.getElementById('hoursInput');
const minutesInput = document.getElementById('minutesInput');
const secondsInput = document.getElementById('secondsInput');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const setTimerBtn = document.getElementById('setTimerBtn');
const resetTimerBtn = document.getElementById('resetTimerBtn');
let timerSeconds = getInputSeconds();
let timerInterval = null;

function pad(value) {
  return String(value).padStart(2, '0');
}

function formatTime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  return `${pad(hours)}:${pad(minutes)}:${pad(remainingSeconds)}`;
}

function getInputSeconds() {
  const hours = Math.max(0, parseInt(hoursInput.value, 10) || 0);
  const minutes = Math.min(59, Math.max(0, parseInt(minutesInput.value, 10) || 0));
  const seconds = Math.min(59, Math.max(0, parseInt(secondsInput.value, 10) || 0));
  return hours * 3600 + minutes * 60 + seconds;
}

function updateTimerDisplay() {
  timerDisplay.textContent = formatTime(timerSeconds);
}

function setTimer() {
  pauseTimer();
  timerSeconds = getInputSeconds();
  updateTimerDisplay();
}

function startTimer() {
  if (timerInterval) return;
  timerSeconds = getInputSeconds();
  updateTimerDisplay();
  timerInterval = setInterval(() => {
    if (timerSeconds <= 0) {
      clearInterval(timerInterval);
      timerInterval = null;
      return;
    }
    timerSeconds -= 1;
    updateTimerDisplay();
  }, 1000);
}

function pauseTimer() {
  if (!timerInterval) return;
  clearInterval(timerInterval);
  timerInterval = null;
}

function resetTimer() {
  pauseTimer();
  timerSeconds = getInputSeconds();
  updateTimerDisplay();
}

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
setTimerBtn.addEventListener('click', setTimer);
resetTimerBtn.addEventListener('click', resetTimer);

hoursInput.addEventListener('input', updateTimerDisplay);
minutesInput.addEventListener('input', updateTimerDisplay);
secondsInput.addEventListener('input', updateTimerDisplay);

updateTimerDisplay();
