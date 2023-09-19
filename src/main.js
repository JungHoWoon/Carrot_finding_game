const CARROT_COUNT = 15;
const BUG_COUNT = 20;
const GAME_PLAY_TIME_SEC = 10;

const field = document.querySelector('.game__field');
const fieldSize = field.getBoundingClientRect();
const gameBtn = document.querySelector('.game__button-play');
const gameTimer = document.querySelector('.game__counter');
const gameScore = document.querySelector('.game__score');

const popUp = document.querySelector('.pop-up');
const popUpText = document.querySelector('.pop-up__message');
const popUpBtn = document.querySelector('.pop-up__button-replay');

let started = false;
let timer = undefined;
let score = 0;

field.addEventListener('click', (e) => onFieldClick(e));

gameBtn.addEventListener('click', () => {
  if (started) {
    stopGame();
  } else {
    startGame();
  }
});

popUpBtn.addEventListener('click', () => {
  startGame();
  hidePopup();
});

function startGame() {
  started = true;
  initGame();
  showStopBtn();
  startGameTimer();
}

function stopGame() {
  started = false;
  stopGameTimer();
  hideGameBtn();
  showPopUpWithText('REPLAY❓🥺');
}

function finishGame(win) {
  started = false;
  stopGameTimer();
  hideGameBtn();
  showPopUpWithText(win ? '성공~!🤗' : '실패~!😱');
}

function showStopBtn() {
  const icon = gameBtn.querySelector('.fa-solid');
  icon.classList.add('fa-stop');
  icon.classList.remove('fa-play');
}

function hideGameBtn() {
  gameBtn.style.visibility = 'hidden';
}

function startGameTimer() {
  let remainingTime = GAME_PLAY_TIME_SEC;
  updateTimerText(remainingTime);
  timer = setInterval(() => {
    if (remainingTime <= 0) {
      clearInterval(timer);
      finishGame(false);
      return;
    }
    updateTimerText(--remainingTime);
  }, 1000);
}

function stopGameTimer() {
  clearInterval(timer);
}

function updateTimerText(time) {
  const minutes = Math.floor(time / 60);
  const seconds = time;
  gameTimer.innerText = `${minutes}:${seconds}`;
}

function showPopUpWithText(text) {
  popUpText.innerText = text;
  popUp.classList.remove('pop-up--hide');
}

function hidePopup() {
  popUp.classList.add('pop-up--hide');
}

function initGame() {
  field.innerHTML = '';
  addItem('carrot', CARROT_COUNT, '../images/carrot.png');
  addItem('bug', BUG_COUNT, '../images/bug.png');
}

function onFieldClick(e) {
  if (!started) {
    return;
  }
  const target = e.target;
  if (target.matches('.carrot')) {
    target.remove();
    score++;
    updateScore();
    if (CARROT_COUNT === score) {
      finishGame(true);
    }
  } else if (target.matches('.bug')) {
    stopGameTimer();
    finishGame(false);
  }
}

function updateScore() {
  gameScore.innerText = CARROT_COUNT - score;
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
