const body = document.querySelector('body');
const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
let intervalId = null;
disabledOnButtonStop();

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function disabledOnButtonStart() {
  stopBtn.disabled = false;
  startBtn.disabled = true;
}

function disabledOnButtonStop() {
  startBtn.disabled = false;
  stopBtn.disabled = true;
}

function start() {
  disabledOnButtonStart();
  intervalId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function stop() {
  disabledOnButtonStop();
  clearInterval(intervalId);
}

startBtn.addEventListener('click', start);
stopBtn.addEventListener('click', stop);
