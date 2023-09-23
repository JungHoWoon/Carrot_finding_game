import PopUp from './popup.js';
import GameBuilder from './game.js';

const gameFinishBanner = new PopUp();
const game = new GameBuilder()
  .gameDuration(10)
  .carrotCount(20)
  .bugCount(20)
  .build();

game.setGameStopListener((reason) => {
  let message;
  switch (reason) {
    case 'cancel':
      message = '다시 하시겠습니까❓';
      break;
    case 'win':
      message = '성공❗😁';
      break;
    case 'lose':
      message = '실패❗😱';
      break;
    default:
      throw new Error('잘못된 결과가 전달되었습니다!');
  }
  gameFinishBanner.showWithText(message);
});

gameFinishBanner.setClickListener(() => {
  game.start();
});
