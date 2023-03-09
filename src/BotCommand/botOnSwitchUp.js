import { CHAT_ID } from '../../config.js';

export default (bot, location) => {
  bot.telegram.sendMessage(CHAT_ID, `switch ${location} up`).then(() => console.log(`switch ${location} up`));
};
