const table = require('@klny/text-table');

const getGameTable = ({ tour, game }, playerNickname) => {
  const tableHeader = `${game.tableNumber}, ${game.referee}`;
  const tableArray = [];

  let i = 1;
  game.playersInfo.forEach(({ nickname }) => {
    const player = {
      '№': i != 10 ? `  ${i}  ` : ` ${i} `,
      Игрок: playerNickname == nickname ? `<code>${nickname}</code>` : `${nickname}`,
    };
    tableArray.push(player);
    i++;
  });

  return table(` - - - ${tour} | ${tableHeader} - - - `, tableArray);
};

module.exports = { getGameTable };
