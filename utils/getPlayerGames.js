const getPlayerGames = (tournamentData, nickname) => {
  console.log(tournamentData);
  console.log(nickname);
  const playerGames = [];

  tournamentData.forEach(({ name, games }) => {
    games.forEach((game) => {
      let isPlayerExist = false;

      game.playersInfo.forEach((player) => {
        if (player.nickname === nickname) {
          isPlayerExist = true;
        }
      });

      if (isPlayerExist) {
        const playerGame = {
          tour: name.split(' ')[1],
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
