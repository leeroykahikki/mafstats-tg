const { Markup } = require('telegraf');

const commandStart = (ctx) =>
  ctx.reply(
    '😸 Привет, этот бот предназначен для получения рассадки на турнирах с сайта GoMafia.\n⚠️ Пока что работает в тестовом режиме',
  );

const commandTest = (ctx) => {
  ctx.reply(
    'test',
    Markup.inlineKeyboard([
      [
        Markup.button.callback('Тур 1', 'Тур 1'),
        Markup.button.callback('Тур 2', 'Тур 2'),
        Markup.button.callback('Тур 3', 'Тур 3'),
        Markup.button.callback('Тур 4', 'Тур 4'),
        Markup.button.callback('Тур 5', 'Тур 5'),
      ],
      [
        Markup.button.callback('Тур 6', 'Тур 6'),
        Markup.button.callback('Тур 7', 'Тур 7'),
        Markup.button.callback('Тур 8', 'Тур 8'),
        Markup.button.callback('Тур 9', 'Тур 9'),
        Markup.button.callback('Тур 10', 'Тур 10'),
      ],
      [
        Markup.button.callback('Тур 11', 'Тур 11'),
        Markup.button.callback('Тур 12', 'Тур 12'),
        Markup.button.callback('Тур 13', 'Тур 13'),
      ],
      [Markup.button.callback('❌', 'placementExit')],
    ]),
  );
};

module.exports = {
  commandStart,
  commandTest,
};
