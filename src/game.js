import * as sound from './sound.js';
import Field from './field.js';

export default class GameBuilder {
  gameDuration(duration) {
    this.gameDuration = duration;
    return this;
  }
  carrotCount(num) {
    this.carrotCount = num;
    return this;
  }
  bugCount(num) {
    this.bugCount = num;
    return this;
  }

  build() {
    return new Game(this.gameDuration, this.carrotCount, this.bugCount);
  }
}

class Game {
  constructor(duration, carrotCount, bugCount) {
    this.duration = duration;
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;

    this.gameTimer = document.querySelector('.game__counter');
    this.gameScore = document.querySelector('.game__score');
    this.gameBtn = document.querySelector('.game__button-play');
    this.gameBtn.addEventListener('click', () => {
      if (this.started) {
        this.stop();
      } else {
        this.start();
      }
    });

    this.gameField = new Field(this.carrotCount, this.bugCount);
    this.gameField.setClickListener(this.onItemClick);

    this.started = false;
    this.timer = undefined;
    this.score = 0;
  }

  setGameStopListener(onGameStop) {
    this.onGameStop = onGameStop;
  }

  start() {
    this.started = true;
    sound.playBackground();
    this.initGame();
    this.showStopBtn();
    this.startTimer();
  }

  stop() {
    this.started = false;
    sound.stopBackground();
    sound.playAlert();
    this.stopTimer();
    this.hideGameBtn();
    this.onGameStop && this.onGameStop('cancel');
  }

  finish(win) {
    this.started = false;
    if (win) {
      sound.playWin();
    } else {
      sound.playBug();
    }
    sound.stopBackground();
    this.stopTimer();
    this.hideGameBtn();
    this.onGameStop && this.onGameStop(win ? 'win' : 'lose');
  }

  onItemClick = (item) => {
    if (!this.started) {
      return;
    }
    if (item === 'carrot') {
      this.score++;
      this.updateScore();
      if (this.carrotCount === this.score) {
        this.finish(true);
      }
    } else if (item === 'bug') {
      this.stopTimer();
      this.finish(false);
    }
  };

  showStopBtn() {
    const icon = this.gameBtn.querySelector('.fa-solid');
    icon.classList.add('fa-stop');
    icon.classList.remove('fa-play');
    this.gameBtn.style.visibility = 'visible';
  }

  hideGameBtn() {
    this.gameBtn.style.visibility = 'hidden';
  }

  startTimer() {
    let remainingTime = this.duration;
    this.updateTimerText(remainingTime);
    this.timer = setInterval(() => {
      if (remainingTime <= 0) {
        clearInterval(this.timer);
        this.finish(false);
        return;
      }
      this.updateTimerText(--remainingTime);
    }, 1000);
  }

  stopTimer() {
    clearInterval(this.timer);
  }

  updateTimerText(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time;
    this.gameTimer.innerText = `${minutes}:${seconds}`;
  }

  initGame() {
    this.score = 0;
    this.updateScore();
    this.gameField.init();
  }

  updateScore() {
    this.gameScore.innerText = this.carrotCount - this.score;
  }
}
