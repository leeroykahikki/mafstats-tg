require('dotenv').config();

const { setupBot } = require('./bot');

// рекурсивная асинхронная функция, которая запускает бота
(async function () {
  try {
    await setupBot().launch();
    console.log('</ Бот успешно запущен >');
  } catch (error) {
    console.log('Ошибка запуска: ', error);
  }
})();
