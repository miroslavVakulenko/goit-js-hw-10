'use strict';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import success from '../img/iconmonstr-check-mark-14.svg';
import error from '../img/iconmonstr-error-8.svg';

const popupHandler = (delay, state) => {
  const promise = new Promise((res, rej) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        res(`Fulfilled promise in ${delay}ms`);
      } else {
        rej(`Rejected promise in ${delay}ms`);
      }
    }, delay);
  });
  promise
    .then(res => {
      iziToast.success({
        class: 'popup-message',
        theme: 'dark',
        backgroundColor: '#7fffd4',
        messageColor: '#fff',
        iconUrl: success,
        position: 'topRight',
        pauseOnHover: true,
        timeout: 3000,
        message: res,
      });
    })
    .catch(rej => {
      iziToast.error({
        class: 'popup-message',
        theme: 'dark',
        backgroundColor: '#ef4040',
        messageColor: '#fff',
        iconUrl: error,
        position: 'topRight',
        pauseOnHover: true,
        timeout: 3000,
        message: rej,
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
