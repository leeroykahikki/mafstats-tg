const TelegrafStatelessQuestion = require('telegraf-stateless-question');
const { mafstatsFetch } = require('../services/mafstatsFetch');
const { getPlayerGames } = require('../utils/getPlayerGames');
const { getGameTable } = require('../utils/getGameTable');

const tournamentIdQuestion = new TelegrafStatelessQuestion('tournamentId', async (ctx) => {
  ctx.session.tournamentId = Number(ctx.message.text);

  if (Number.isInteger(ctx.session.tournamentId)) {
    await ctx.replyWithPhoto({ url: process.env.MAFSTATS_SERVER_LINK + 'playerID.png' });
    await playerIdQuestion.replyWithMarkdown(ctx, 'Введите ID игрока');
  } else {
    await ctx.reply('⛔️ Некорректный ID турнира');
    return ctx.scene.leave();
  }
});

// деструктуризировать метод на подметоды
const playerIdQuestion = new TelegrafStatelessQuestion('playerId', async (ctx) => {
  ctx.session.playerId = ctx.message.text;

  await ctx.reply('Сверяю данные, ожидайте ⌛');

  try {
    ctx.session.tournamentData = await mafstatsFetch('stats/getToursInfo', {
      tournamentId: ctx.session.tournamentId,
    });
  } catch (error) {
    console.log(error.message);
    await ctx.reply('⛔️ Неправильный ID турнира или рассадка ещё не была сформирована');
    return ctx.scene.leave();
  }

  try {
    const { nickname } = await mafstatsFetch('player/getPlayerNickname', {
      playerId: ctx.session.playerId,
    });

    ctx.session.playerNickname = nickname;
  } catch (error) {
    console.log(error.message);
    await ctx.reply('⛔️ Некорректный ID пользователя');
    return ctx.scene.leave();
  }

  // сделать чуть раньше вывод о турнире и игроке
  const playerGames = getPlayerGames(
    ctx.session.tournamentData.toursList,
    ctx.session.playerNickname,
  );

  if (playerGames === undefined || playerGames.length == 0) {
    // сделать получение данных о названии турнира
    await ctx.replyWithHTML(
      `⛔️ Игр с участием <b>${ctx.session.playerNickname}</b> на турнире <b>«${ctx.session.tournamentData.tournamentInfo.title}»</b> не было найдено`,
    );
    return ctx.scene.leave();
  } else {
    ctx.session.playerGames = playerGames;
    await ctx.replyWithHTML(getGameTable(ctx.session.playerGames[0], ctx.session.playerNickname));
  }
});

module.exports = {
  tournamentIdQuestion,
  playerIdQuestion,
};
