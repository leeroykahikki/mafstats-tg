const { Markup } = require('telegraf');

const getPlacementMenu = (playerGames) => {
  const tourButtons = [];
  // const tourButtonActions = [];

  let i = 0;
  let j = 0;
  let tourButtonsTemp = [];
  playerGames.forEach(({ tour }) => {
    // const buttonAction = {
    //   title: tour,
    //   action: (ctx) => {
    //     ctx.replyWithHTML(getGameTable(ctx.session.playerGames[i], ctx.session.playerNickname));
    //   },
    // };
    // tourButtonActions.push(buttonAction);

    j++;

    if (j != 5 && playerGames.length != i + 1) {
      tourButtonsTemp.push(Markup.button.callback(tour, tour));
    } else if (j == 5) {
      tourButtonsTemp.push(Markup.button.callback(tour, tour));
      tourButtons.push(tourButtonsTemp);
      tourButtonsTemp = [];
      j = 0;
    } else {
      tourButtonsTemp.push(Markup.button.callback(tour, tour));
      tourButtons.push(tourButtonsTemp);
    }

    i++;
  });

  return Markup.inlineKeyboard([...tourButtons]).resize();
};

module.exports = {
  getPlacementMenu,
};
