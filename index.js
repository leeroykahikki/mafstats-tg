require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { setupBot } = require('./bot');

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'static')));

// рекурсивная асинхронная функция, которая запускает бота
(async function () {
  try {
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    await setupBot().launch();
    console.log('Бот успешно запущен');
  } catch (error) {
    console.log('Ошибка запуска: ', error);
  }
})();
