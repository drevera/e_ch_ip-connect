import { CHAT_ID } from '../../config.js';

export default (bot, text) => {
  bot.telegram.sendMessage(CHAT_ID, text).then(() => console.log(text));
};
