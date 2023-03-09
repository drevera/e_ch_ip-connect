import { CHAT_ID } from '../../config.js';

export default (bot, location) => {
  bot.telegram.sendMessage(CHAT_ID, '').then(() => console.log(`switch ${location} down`));
};
