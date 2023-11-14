import iziToast from 'izitoast';

import 'izitoast/dist/css/iziToast.min.css';

const elements = {
  form: document.querySelector('.form'),
};

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

elements.form.addEventListener('submit', handlerGenPromises);

function handlerGenPromises(event) {
  event.preventDefault();

  const { delay, step, amount } = event.currentTarget.elements;
  let delayValue = Number(delay.value);

  for (let i = 1; i <= amount.value; i += 1) {
    if (i > 1) {
      delayValue += Number(step.value);
    }

    createPromise(i, delayValue)
      .then(({ position, delay }) =>
        iziToast.success({
          // title: '',
          message: `✅ Fulfilled promise ${position} in ${delay}ms`,
          position: 'topRight',
          icon: '',
        })
      )
      .catch(({ position, delay }) =>
        iziToast.error({
          // title: '',
          message: `❌ Rejected promise ${position} in ${delay}ms`,
          position: 'topRight',
          icon: '',
        })
      );
  }
}
