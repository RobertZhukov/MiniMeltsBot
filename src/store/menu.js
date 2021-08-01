const keyboard = require('./keyboard');

const menu = {
  parse_mode: 'Markdown',
  reply_markup: {
    keyboard: keyboard.main
  },
};

module.exports = { menu }