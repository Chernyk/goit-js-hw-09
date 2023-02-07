import { Notify } from 'notiflix';
const refs = {
  form: document.querySelector('.form'),
};

refs.form.addEventListener('submit', onSubmit);
function onSubmit(e) {
  e.preventDefault();
  let position = 0;
  let delay = 0;
  const getDelay = +refs.form['delay'].value;
  const getStep = +refs.form['step'].value;
  const getAmount = +refs.form['amount'].value;
  for (let i = 0; i < getAmount; i++) {
    position = i + 1;
    delay = getStep * i + getDelay;
    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
}

function createPromise(position, delay) {
  return new Promise((Fulfill, Reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        Fulfill({ position, delay });
      } else {
        Reject({ position, delay });
      }
    }, delay);
  });
}
