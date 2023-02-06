const body = document.querySelector('body');
const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
let intervalId = null;
stopBtn.disabled = true;
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function start() {
  stopBtn.disabled = false;
  startBtn.disabled = true;

  intervalId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}
function stop() {
  startBtn.disabled = false;
  stopBtn.disabled = true;
  clearInterval(intervalId);
}
startBtn.addEventListener('click', start);
stopBtn.addEventListener('click', stop);
