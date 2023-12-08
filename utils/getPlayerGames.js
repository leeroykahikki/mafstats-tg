const getPlayerGames = (toursList, nickname) => {
  const playerGames = [];

  toursList.forEach(({ name, games }) => {
    games.forEach((game) => {
      let isPlayerExist = false;

      game.playersInfo.forEach((player) => {
        if (player.nickname === nickname) {
          isPlayerExist = true;
        }
      });

      if (isPlayerExist) {
        const playerGame = {
          tour: name,
          game: game,
        };

        playerGames.push(playerGame);
      }
    });
  });

  return playerGames;
};

module.exports = {
  getPlayerGames,
};
