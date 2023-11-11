const elements = {
  body: document.querySelector('body'),
  btnStart: document.querySelector('button[data-start]'),
  btnStop: document.querySelector('button[data-stop]'),
};

elements.btnStart.addEventListener('click', handlerStart);
elements.btnStop.addEventListener('click', handlerStop);

elements.btnStop.disabled = true;

let intervalID = null;

function handlerStart() {
  intervalID = setInterval(
    () => (elements.body.style.backgroundColor = getRandomHexColor()),
    1000
  );
  elements.btnStart.disabled = true;
  elements.btnStop.disabled = false;
}

function handlerStop() {
  clearInterval(intervalID);
  elements.btnStart.disabled = false;
  elements.btnStop.disabled = true;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
