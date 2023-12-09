const table = require('@klny/text-table');

const getGameTable = ({ tour, game }, playerNickname, tournamentTitle) => {
  const tableHeader = `${game.tableNumber}, ${game.referee}`;
  const tableArray = [];

  let i = 1;
  game.playersInfo.forEach(({ nickname }) => {
    const player = {
      '№': i != 10 ? `  ${i}  ` : ` ${i} `,
      Игрок: playerNickname == nickname ? `<u>${nickname}</u>` : `${nickname}`,
    };
    tableArray.push(player);
    i++;
  });

  return table(` - - - ${tour} | ${tableHeader} | ${tournamentTitle} - - - `, tableArray);
};

module.exports = { getGameTable };
