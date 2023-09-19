const CARROT_COUNT = 15;
const BUG_COUNT = 20;
const GAME_PLAY_TIME_SEC = 30;

const field = document.querySelector('.game__field');
const fieldSize = field.getBoundingClientRect();
const gameBtn = document.querySelector('.game__button-play');
const gameTimer = document.querySelector('.game__counter');
const gameScore = document.querySelector('.game__score');

let started = false;
let timer = undefined;
let score = 0;

gameBtn.addEventListener('click', () => {
  if (started) {
    stopGame();
  } else {
    startGame();
  }
  started = !started;
});

function startGame() {
  initGame();
  showStopBtn();
  startGameTimer();
}

function stopGame() {}

function showStopBtn() {
  const icon = gameBtn.querySelector('.fa-play');
  icon.classList.add('fa-arrows-rotate');
  icon.classList.remove('fa-play');
}

function startGameTimer() {
  let remainingTime = GAME_PLAY_TIME_SEC;
  updateTimerText(remainingTime);
  timer = setInterval(() => {
    if (remainingTime <= 0) {
      clearInterval(timer);
      return;
    }
    updateTimerText(--remainingTime);
  }, 1000);
}

function updateTimerText(time) {
  const minutes = Math.floor(time / 60);
  const seconds = time;
  gameTimer.innerText = `${minutes}:${seconds}`;
}

function initGame() {
  field.innerHTML = '';
  addItem('carrot', CARROT_COUNT, '../images/carrot.png');
  addItem('bug', BUG_COUNT, '../images/bug.png');
}

function addItem(className, count, imgPath) {
  const imgSize = 80;
  const x1 = 0;
  const x2 = fieldSize.width - imgSize;
  const y1 = 0;
  const y2 = fieldSize.height - imgSize;

  for (let i = 0; i < count; i++) {
    const item = document.createElement('img');
    const x = randomNumber(x1, x2);
    const y = randomNumber(y1, y2);

    item.setAttribute('class', className);
    item.setAttribute('src', imgPath);
    item.style.position = 'absolute';
    item.style.left = `${x}px`;
    item.style.top = `${y}px`;
    field.appendChild(item);
  }
}

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
