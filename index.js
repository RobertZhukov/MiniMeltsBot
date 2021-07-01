const TelegramBot = require('node-telegram-bot-api');
require('http').createServer().listen(process.env.PORT || 5000).on('request', function(req, res){
  res.end('')
})
const dataBot = {
  mes: {
    welcomeMessage: `Добро пожаловать в Строительный разбор!
Меня зовут Виктор, я готов ответить на Ваши вопросы.`,
    post: 'Появилось новое задание для тебя!',
  },
  questions: {
    Q1: `💰📈*Почему дорожают стройматериалы?*
    
    Подорожание основных групп стройматериалов обусловлено рядом факторов, ключевыми из которых является дефицит сырья и рост логистических затрат, рассказал журналистам управляющий группы КНАУФ Восточная Европа и СНГ Янис Краулис.

    Так, на 30% в этом году выросли цены на металл, существенно подорожали основные химические субстанции, например, хлор. В обоих случаях причиной стала нехватка производственных мощностей.
    
    Большую проблему для многих производителей представляет изменение цены на макулатуру, вызванное пандемией. «Цена для нас выросла на 60%. Макулатуры не хватает, частично мы сейчас импортируем ее из-за рубежа, например, из Прибалтики», — пояснил Краулис. Больше чем на 12% выросла цена на древесину, необходимую для поддонов.
    
  Подробнее можно посмотреть 👇
  https://www.youtube.com/watch?v=SirWguFYM7Y&t=2s`,

    Q2:`🏘🧱*Из чего строить загородный дом?*

_Что нужно учитывать при выборе материала для стен дома_
    Стены забирают до четверти всех расходов по строительству дома. И если беспечно отнестись к этому выбору, то можно понести серьезные траты в будущем. Поэтому учтем и рассмотрим важнейшие критерии и факторы, которые необходимо учитывать при выборе материала для возведения стен дома.

    #1.*Вопрос цены.* Затраты могут быть снижены, если взять для стен облегченный материал. Тогда не придется сооружать мощный и дорогой фундамент.

    #2.*Теплоизоляция.* Холодные стены обойдутся зимой слишком дорого. Поэтому, прежде чем выбрать материал нужно сделать все расчеты, ориентируясь на местные климатические условия. Добиться нужной степени теплоизоляции можно прибегнув к помощи утеплителей. Если взять материал с хорошими теплоизолирующими свойствами, то стены можно не утеплять, но все зависит от региона застройки.

    #3.*Трудозатраты.* Затраты времени и сил можно уменьшить, если сложить стены из больших блоков, а не из мелкоштучных материалов. Такие стены возводятся 3 - 4 раза быстрее и легче. Самая высокая скорость - при возведении каркасных панельных стен.

    #4.*Последующие затраты на отделку.* Современные гладкие и эстетичные материалы не требуют дополнительной отделки стен. На этом можно сэкономить.
    Подробнее можно посмотреть 👇
    https://www.youtube.com/watch?v=vr5seenxurk&t=22s`
  }
};

const dataBase = {
  users: [],
};

const bot = new TelegramBot(process.env.TOKEN_MINIMELTS_BOT, { polling: true });

const questions = {
  reply_markup: {
    inline_keyboard: [
      [
        { 
          text: 'Почему дорожают стройматериалы?', 
          callback_data: 'Почему дорожают стройматериалы?' 
        }
      ],
      [
        { 
          text: 'Из чего строить загородный дом?', 
          callback_data: 'Из чего строить загородный дом?' 
        }
      ],
    ],
  },
};

bot.on('callback_query', async (msg) => {
  // console.log('msg', msg);
  // console.log('msg.data', msg.data);
  const chatId = msg.message.chat.id;

  switch (msg.data) {
    case 'Почему дорожают стройматериалы?':
      await bot.sendMessage(chatId, dataBot.questions.Q1, { parse_mode: 'Markdown' });
      break
  
    case 'Из чего строить загородный дом?':
      await bot.sendMessage(chatId, dataBot.questions.Q2, { parse_mode: 'Markdown' });
      break
  
    default:
      await bot.sendMessage(chatId, 'Не понял вопроса?!');
  }
  return
});

const start = () => {
  bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const firstName = msg.chat.first_name;
    const { text } = msg;

    const newUser = {
      chatId,
      name: firstName,
    };

    if (text === '/start') {
      // isNewUser?
      const res = dataBase.users.filter(el => el.chatId === chatId);
      if (res.length === 0) dataBase.users.push(newUser);
      console.log('dataBase', dataBase);

      await bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/b93/f0a/b93f0a6a-0c6b-3fab-b9d9-c11cf6394f3b/6.webp');
      await bot.sendMessage(chatId, `${msg.from.first_name}, ${dataBot.mes.welcomeMessage}`, { parse_mode: 'Markdown' });
      setTimeout(() => {
        return bot.sendMessage(chatId, 'Что Вас интересует? 🧐', questions);
      }, 3000)
      return
      // return bot.sendMessage(chatId, 'Что Вас интересует? 🧐', questions);
    }

    bot.sendMessage(chatId, 'Вы ввели непонятную мне команду!)');
  });
};

start();

module.exports = bot;
