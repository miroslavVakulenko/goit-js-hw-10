import flatpickr from 'flatpickr';

const input = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');
const dataDays = document.querySelector('.timer [data-days]');
const dataHours = document.querySelector('.timer [data-hours]');
const dataMinutes = document.querySelector('.timer [data-minutes]');
const dataSeconds = document.querySelector('.timer [data-seconds]');

console.log(dataHours, dataDays);

let selectedUserDate = {};
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
  if (selectedUserDate < currentDate) {
    startBtn.disabled = true;
    alert('"Please choose a date in the future"');
  } else {
    startBtn.disabled = false;
  }
}

// якщо updateStartButtonState() пропускає нас то слухаємо кнопку і виводимо в консоль обрану дату
startBtn.addEventListener('click', evt => {
  console.log(selectedUserDate);
  // ms difference between curent date and choose date
  const dateDiff = selectedUserDate - Date.now();
  displayTimeRemaining(dateDiff);
  convertMs(dateDiff);
});

// варіант через class Timer та function displayTimeRemaining

// class Timer {
//   constructor({ onTick }) {
//     this.onTick = onTick;
//   }

//   start(duration) {
//     const startTime = Date.now();

//     this.interval = setInterval(() => {
//       const currentTime = Date.now();
//       const delta = duration - (currentTime - startTime);
//       this.onTick(delta);
//       if (delta <= 0) {
//         this.stop();
//       }
//     }, 1000);
//   }

//   stop() {}
// }

// function displayTimeRemaining(duration) {
//   const timer = new Timer({
//     onTick: remainingTime => {
//       convertMs(remainingTime);
//     },
//   });

//   timer.start(duration);
// }

// другий варіант з function displayTimeRemaining
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

flatpickr(input, options);

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

  // return { days, hours, minutes, seconds };
  console.log({ days, hours, minutes, seconds });
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
