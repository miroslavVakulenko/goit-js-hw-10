'use strict';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const popupHandler = (delay, state) => {
  const promise = new Promise((res, rej) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        res(`✅ Fulfilled promise in ${delay}ms`);
      } else {
        rej(`❌ Rejected promise in ${delay}ms`);
      }
    }, delay);
  });
  promise
    .then(res => {
      console.log(res);
    })
    .catch(rej => {
      console.log(rej);
      iziToast.error({
        title: 'Error',
        message: 'Illegal operation',
      });
    });
};

const initForm = () => {
  const form = document.querySelector('.form');
  form.addEventListener('submit', evt => {
    evt.preventDefault();
    popupHandler(form.delay.value, form.state.value);
  });
};

initForm();
