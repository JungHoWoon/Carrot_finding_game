const field = document.querySelector('.game__field');
const fieldSize = field.getBoundingClientRect();

function initGame() {
  addItem('carrot', 10, '../images/carrot.png');
  addItem('bug', 10, '../images/bug.png');
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

initGame();
