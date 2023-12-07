const { Scenes, session, Telegraf } = require('telegraf');
const { placementScene } = require('./controllers/placementScene');
const { tournamentIdQuestion, playerIdQuestion } = require('./controllers/statelessQuestions');
const { commandStart } = require('./controllers/commands');

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

  bot.start(commandStart);

  return bot;
};

module.exports = {
  setupBot,
};
