const { Markup } = require('telegraf');

const commandStart = (ctx) =>
  ctx.reply(
    '😸 Привет, этот бот предназначен для получения рассадки на турнирах с сайта GoMafia.\n⚠️ Пока что работает в тестовом режиме',
  );

const commandStats = (ctx) =>
  ctx.reply(
    'Нажми на кнопку 👇',
    Markup.inlineKeyboard([Markup.button.webApp('Статистика', WEB_APP_URL)]),
  );

module.exports = {
  commandStart,
  commandStats,
};
