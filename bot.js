const { Scenes, session, Telegraf } = require('telegraf');
const { placementScene } = require('./controllers/placementScene');
const { tournamentIdQuestion, playerIdQuestion } = require('./controllers/statelessQuestions');
const { commandStart, commandStats } = require('./controllers/commands');
const { getGameTable } = require('./utils/getGameTable');

const bot = new Telegraf(process.env.TELEGRAM_API_TOKEN);
const stage = new Scenes.Stage([placementScene]);

const setupBot = () => {
  // подключение промежуточных обработчиков (middleware)
  // сессий и сцен
  bot.use(session());
  bot.use(stage.middleware());

  bot.use(tournamentIdQuestion.middleware());
  bot.use(playerIdQuestion.middleware());

  // Команды бота
  bot.command('placement', (ctx) => ctx.scene.enter('placementScene'));
  bot.command('stats', commandStats);

  for (let i = 0; i < 30; i++) {
    bot.action(`Тур ${i + 1}`, (ctx) => {
      try {
        ctx.replyWithHTML(
          getGameTable(
            ctx.session.playerGames[i],
            ctx.session.playerNickname,
            ctx.session.tournamentData.tournamentInfo.title,
          ),
        );
      } catch (error) {
        console.log(error.message);
      }

      ctx.answerCbQuery();
    });
  }

  bot.start(commandStart);

  return bot;
};

module.exports = {
  setupBot,
};
