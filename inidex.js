import Telegraf from 'telegraf';

import { BOT_TOKEN } from './config.js';

const bot = new Telegraf(BOT_TOKEN);

bot.start((ctx) => ctx.reply('Welcome'));
bot.launch()