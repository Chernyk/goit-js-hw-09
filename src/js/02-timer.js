import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix';
let intervalId = 0;

const options = {
  enableTime: true,
  dateFormat: 'Y-m-d H:i',
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose([selectedDates]) {
    const data = Date.now();
    const different = selectedDates - data;
    if (different <= 0) {
      Notify.failure('Please choose a date in the future');
      disabledOff();
    } else {
      disabledON();
    }
  },
};
const calendar = flatpickr('#datetime-picker', options);
const startButton = document.querySelector('button[data-start]');
disabledOff();
const refs = {
  Days: document.querySelector('.value[data-days]'),
  Hours: document.querySelector('.value[data-hours]'),
  Minutes: document.querySelector('.value[data-minutes]'),
  Seconds: document.querySelector('.value[data-seconds]'),
};
function disabledON() {
  startButton.disabled = false;
}
function disabledOff() {
  startButton.disabled = true;
}
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

startButton.addEventListener('click', startTimer);

function addLeadingZero(number) {
  return String(number).padStart(2, 0);
}

function addTimeToHTML(timer) {
  refs.Days.textContent = timer.days;
  refs.Hours.textContent = addLeadingZero(timer.hours);
  refs.Minutes.textContent = addLeadingZero(timer.minutes);
  refs.Seconds.textContent = addLeadingZero(timer.seconds);
}

function startTimer() {
  let getTimer = 0;
  const selectedDateOfUser = calendar.selectedDates;
  disabledOff();

  intervalId = setInterval(() => {
    const time = Date.now();
    const different = selectedDateOfUser[0] - time;
    if (different > 0) {
      getTimer = convertMs(different);
      addTimeToHTML(getTimer);
    } else {
      clearInterval(intervalId);
    }
  }, 1000);
}
