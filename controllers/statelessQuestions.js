const TelegrafStatelessQuestion = require('telegraf-stateless-question');
const { mafstatsFetch } = require('../services/mafstatsFetch');

const tournamentIdQuestion = new TelegrafStatelessQuestion('tournamentId', async (ctx) => {
  ctx.session.tournamentId = Number(ctx.message.text);

  if (Number.isInteger(ctx.session.tournamentId)) {
    await ctx.replyWithPhoto({ url: process.env.MAFSTATS_SERVER_LINK + 'playerID.png' });
    await playerIdQuestion.replyWithMarkdown(ctx, 'Введите ID игрока');
  } else {
    await ctx.reply('Некорректный ID турнира');
    return ctx.scene.leave();
  }
});

const playerIdQuestion = new TelegrafStatelessQuestion('playerId', async (ctx) => {
  ctx.session.playerId = ctx.message.text;

  await ctx.reply('Сверяю данные, ожидайте ⌛');

  try {
    ctx.session.tournamentData = await mafstatsFetch('stats/getToursInfo', {
      tournamentId: ctx.session.tournamentId,
    });
  } catch (error) {
    console.log(error.message);
    await ctx.reply('Неправильный ID турнира или рассадка ещё не была сформирована');
    return ctx.scene.leave();
  }

  try {
    const { nickname } = await mafstatsFetch('player/getPlayerNickname', {
      playerId: ctx.session.playerId,
    });

    ctx.session.playerNickname = nickname;
  } catch (error) {
    console.log(error.message);
    await ctx.reply('Некорректный ID пользователя');
    return ctx.scene.leave();
  }

  ctx.reply('Готово!');

  console.log(ctx.session.playerNickname);
  console.log(ctx.session.tournamentData);

  // await ctx.reply(ctx.session.playerId + ' ' + ctx.session.tournamentId);
});

module.exports = {
  tournamentIdQuestion,
  playerIdQuestion,
};
