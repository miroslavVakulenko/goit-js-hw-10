import flatpickr from 'flatpickr';

const timeHandler = input => {
  let selectedUserDate = {};
  const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    minDate: Date.now(),
    onClose(selectedDates) {
      selectedUserDate = selectedDates[0];
    },
  };
  flatpickr(input, options);
  console.log(selectedUserDate);
};

const input = document.querySelector('#datetime-picker');

timeHandler(input);
