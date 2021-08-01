const TelegramBot = require('node-telegram-bot-api');
const { menu } = require('./src/store/menu');
const kb = require('./src/store/keyboardButtons');
const {
  start,
  sendAdvantages,
  sendEquipment,
  sendConditions,
  sendBrand,
  sendContacts,
  sendOrder,
  sendIceCreamType,
  sendMakeProcess,
} = require('./src/store/commands');
const { getChatId, getChatIdInMessage } = require('./src/helper');
require('http').createServer().listen(process.env.PORT || 5000).on('request', function(req, res){
  res.end('')
})

const bot = new TelegramBot(process.env.TOKEN_MINIMELTS_BOT, { polling: true });

bot.on('callback_query', async (msg) => {
  const chatId = getChatIdInMessage(msg);

  switch (msg.data) {
    case kb.info.advantages.callback_data:
      await sendAdvantages(msg, bot, chatId)
      break
    case kb.info.makeProcess.callback_data: 
      await sendMakeProcess(msg, bot, chatId)
      break
    default:
      await bot.sendMessage(chatId, 'Не понял вопроса?!');
  }
  return
});

bot.on('message', async (msg) => {
  const chatId = getChatId(msg);

  switch (msg.text) {
    case '/start': 
      start(msg, bot)
      break
    case '/openMenu': 
      bot.sendMessage(chatId, 'Меню открыто 👇', menu);
      break
    case kb.main.brand: 
      await sendBrand(msg, bot, chatId)
      break
    case kb.main.equipment:
      await sendEquipment(msg, bot, chatId)
      break
    case kb.main.contacts: 
      await sendContacts(msg, bot, chatId)
      break
    case kb.main.conditions: 
      await sendConditions(msg, bot, chatId)
      break
    case kb.main.order: 
      await sendOrder(msg, bot, chatId)
      break
    case kb.main.iceCreamType: 
      await sendIceCreamType(msg, bot, chatId)
      break
    default: 
      bot.sendMessage(chatId, 'Вы ввели непонятную мне команду!)');
  }
});

module.exports = bot;
