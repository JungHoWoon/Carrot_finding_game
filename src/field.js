import * as sound from './sound.js';

export default class Field {
  constructor(carrotCount, bugCount) {
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;
    this.field = document.querySelector('.game__field');
    this.fieldSize = this.field.getBoundingClientRect();
    this.field.addEventListener('click', this.onClick);
  }

  init() {
    this.field.innerHTML = '';
    this.#addItem('carrot', this.carrotCount, '../images/carrot.png');
    this.#addItem('bug', this.bugCount, '../images/bug.png');
  }

  setClickListener(onItemClick) {
    this.onItemClick = onItemClick;
  }

  #addItem(className, count, imgPath) {
    const imgSize = 80;
    const x1 = 0;
    const x2 = this.fieldSize.width - imgSize;
    const y1 = 0;
    const y2 = this.fieldSize.height - imgSize;

    for (let i = 0; i < count; i++) {
      const item = document.createElement('img');
      const x = randomNumber(x1, x2);
      const y = randomNumber(y1, y2);

      item.setAttribute('class', className);
      item.setAttribute('src', imgPath);
      item.style.position = 'absolute';
      item.style.left = `${x}px`;
      item.style.top = `${y}px`;
      this.field.appendChild(item);
    }
  }

  onClick = (e) => {
    const target = e.target;
    if (target.matches('.carrot')) {
      target.remove();
      sound.playCarrot();
      this.onItemClick && this.onItemClick('carrot');
    } else if (target.matches('.bug')) {
      this.onItemClick && this.onItemClick('bug');
    }
  };
}

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
