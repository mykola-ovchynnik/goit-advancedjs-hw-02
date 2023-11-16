import flatpickr from 'flatpickr';
import iziToast from 'izitoast';

import 'flatpickr/dist/flatpickr.min.css';
import 'izitoast/dist/css/iziToast.min.css';

const elements = {
  input: document.querySelector('#datetime-picker'),
  btnStart: document.querySelector('button[data-start]'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};

let timerRun;

elements.btnStart.disabled = true; // Disable button until correct date is selected

let selectedDate;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    selectedDate = selectedDates[0];
    if (selectedDate < new Date()) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
        position: 'topCenter',
      });

      elements.btnStart.disabled = true;
    } else {
      elements.btnStart.disabled = false;
    }
  },
};

flatpickr(elements.input, options);

function handlerCountdown() {
  elements.input.disabled = true;
  elements.btnStart.disabled = true;

  selectedDate = new Date(elements.input.value).getTime();

  const interval = setInterval(() => {
    const currentTime = new Date().getTime();
    const timeDifference = selectedDate - currentTime;

    if (timeDifference <= 0) {
      clearInterval(interval);

      // elements.btnStart.disabled = false;
      elements.input.disabled = false;
    } else {
      const { days, hours, minutes, seconds } = convertMs(timeDifference);

      elements.days.textContent = addLeadingZero(days);
      elements.hours.textContent = addLeadingZero(hours);
      elements.minutes.textContent = addLeadingZero(minutes);
      elements.seconds.textContent = addLeadingZero(seconds);
    }
  }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, 0);
}

elements.btnStart.addEventListener('click', handlerCountdown);

disableStart();
