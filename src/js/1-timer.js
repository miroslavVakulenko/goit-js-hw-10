'use strict';

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const input = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');
let selectedUserDate = {};

startBtn.setAttribute('disabled', '');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedUserDate = selectedDates[0];
    updateStartButtonState(selectedUserDate);
  },
};
// якщо обрана дата в минклому, то startBtn.disabled
function updateStartButtonState(selectedUserDate) {
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0); // Задаємо час на 00:00:00 для порівняння з датою
  if (selectedUserDate < currentDate || !selectedUserDate) {
    startBtn.disabled = true;
    //iziToast notification about error
    iziToast.show({
      message: 'Please choose a date in the future',
    });
  } else {
    startBtn.disabled = false;
  }
}
flatpickr(input, options);

// якщо updateStartButtonState() пропускає нас то слухаємо кнопку і виводимо в консоль обрану дату
startBtn.addEventListener('click', evt => {
  // ms difference between curent date and choose date
  const dateDiff = selectedUserDate - Date.now();
  displayTimeRemaining(dateDiff);
  convertMs(dateDiff);
});

function displayTimeRemaining(duration) {
  if (duration <= 0) {
    console.log('Таймер завершено!');
    return;
  }

  convertMs(duration);

  if (duration > 0) {
    setTimeout(() => {
      displayTimeRemaining(duration - 1000);
    }, 1000);
  }
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

  return addLeadingZero(days, hours, minutes, seconds);
}

//додаємо в html значення
const addLeadingZero = (days, hours, minutes, seconds) => {
  const dataDays = document.querySelector('.timer [data-days]');
  const dataHours = document.querySelector('.timer [data-hours]');
  const dataMinutes = document.querySelector('.timer [data-minutes]');
  const dataSeconds = document.querySelector('.timer [data-seconds]');

  //додаємо 0 перед числрм, якщо воно однозначне
  dataDays.textContent = days.toString().padStart(2, '0');
  dataHours.textContent = hours.toString().padStart(2, '0');
  dataMinutes.textContent = minutes.toString().padStart(2, '0');
  dataSeconds.textContent = seconds.toString().padStart(2, '0');
};

//призавантаженні сторінки таймер по 00
document.addEventListener('DOMContentLoaded', () => {
  addLeadingZero(0, 0, 0, 0);
});

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
