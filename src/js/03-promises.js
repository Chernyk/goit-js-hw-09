import { Notify } from 'notiflix';

const refs = {
  form: document.querySelector('.form'),
  delayInput: document.getElementsByName('delay'),
  stepInput: document.getElementsByName('step'),
  amountInput: document.getElementsByName('amount'),
  button: document.querySelector('.form>button'),
};
refs.button.addEventListener('click', onClick);
function onClick(e) {
  e.preventDefault();
  let position = 0;
  let delay = 0;
  const getDelay = Number(refs.delayInput[0].value);
  const getStep = Number(refs.stepInput[0].value);
  const getAmount = Number(refs.amountInput[0].value);

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
