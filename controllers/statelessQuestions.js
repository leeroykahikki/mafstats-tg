const TelegrafStatelessQuestion = require('telegraf-stateless-question');
const { mafstatsFetch } = require('../services/mafstatsFetch');
const { getPlayerGames } = require('../utils/getPlayerGames');
const { getPlacementMenu } = require('../utils/getPlacementMenu');

const tournamentIdQuestion = new TelegrafStatelessQuestion('tournamentId', async (ctx) => {
  ctx.session.tournamentId = Number(ctx.message.text);

  if (Number.isInteger(ctx.session.tournamentId)) {
    await ctx.replyWithPhoto({ url: process.env.MAFSTATS_SERVER_LINK + 'playerID.png' });
    await playerIdQuestion.replyWithMarkdown(ctx, 'Введите ID игрока');
  } else {
    await ctx.reply('⛔️ Некорректный ID турнира');
    return;
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
    return;
  }

  try {
    const { nickname } = await mafstatsFetch('player/getPlayerNickname', {
      playerId: ctx.session.playerId,
    });

    ctx.session.playerNickname = nickname;
  } catch (error) {
    console.log(error.message);
    await ctx.reply('⛔️ Некорректный ID пользователя');
    return;
  }

  const playerGames = getPlayerGames(
    ctx.session.tournamentData.toursList,
    ctx.session.playerNickname,
  );

  if (playerGames === undefined || playerGames.length == 0) {
    await ctx.replyWithHTML(
      `⛔️ Игр с участием <b>${ctx.session.playerNickname}</b> на турнире <b>«${ctx.session.tournamentData.tournamentInfo.title}»</b> не было найдено`,
    );
    return;
  } else {
    ctx.session.playerGames = playerGames;
    const menu = getPlacementMenu(ctx.session.playerGames);
    await ctx.reply(
      `📝 Следующие данные были найдены:\n🧑‍🦽 Игрок: ${ctx.session.playerNickname}\n🏆 Турнир: ${ctx.session.tournamentData.tournamentInfo.title}`,
      menu,
    );
    return;
  }
});

module.exports = {
  tournamentIdQuestion,
  playerIdQuestion,
};
