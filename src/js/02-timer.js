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
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const data = Date.now();
    const different = selectedDate - data;
    if (different <= 0) {
      Notify.failure('Please choose a date in the future');
      return;
    } else {
      startBtn.disabled = false;
    }
  },
};
const calendar = flatpickr('#datetime-picker', options);
const startBtn = document.querySelector('button[data-start]');
startBtn.disabled = true;
const refs = {
  Days: document.querySelector('.value[data-days]'),
  Hours: document.querySelector('.value[data-hours]'),
  Minutes: document.querySelector('.value[data-minutes]'),
  Seconds: document.querySelector('.value[data-seconds]'),
};

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

startBtn.addEventListener('click', startTimer);

function addLeadingZero(number) {
  return String(number).padStart(2, 0);
}

function startTimer() {
  let getTimer = 0;
  const selectedDateOfUser = calendar.selectedDates;
  startBtn.disabled = true;

  intervalId = setInterval(() => {
    const time = Date.now();
    const different = selectedDateOfUser[0] - time;
    if (different > 0) {
      getTimer = convertMs(different);
      refs.Days.textContent = getTimer.days;
      refs.Hours.textContent = addLeadingZero(getTimer.hours);
      refs.Minutes.textContent = addLeadingZero(getTimer.minutes);
      refs.Seconds.textContent = addLeadingZero(getTimer.seconds);
    } else {
      clearInterval(intervalId);
    }
  }, 1000);
}
