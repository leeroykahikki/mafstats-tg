const { Scenes } = require('telegraf');
const { tournamentIdQuestion } = require('./statelessQuestions');

const placementScene = new Scenes.BaseScene('placementScene');

placementScene.enter(async (ctx) => {
  await ctx.replyWithPhoto({ url: process.env.MAFSTATS_SERVER_LINK + 'tournamentID.png' });
  await tournamentIdQuestion.replyWithMarkdown(ctx, 'Введите ID турнира');
  return ctx.scene.leave();
});
// await ctx.reply('test', Markup.inlineKeyboard([Markup.button.callback('test', 'test2')]));

module.exports = {
  placementScene,
};
