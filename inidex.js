import Telegraf from 'telegraf';
import snmp from 'net-snmp';

import { BOT_TOKEN } from './config.js';

import { prepareSwitchesState, SNMPHost } from './src/Services/index.js';
import { botStart } from './src/BotCommand/index.js';
prepareSwitchesState();
const bot = new Telegraf(BOT_TOKEN);

botStart(bot);
setInterval(() => {
    SNMPHost(snmp, bot);
}, 30000)
bot.launch().then(() => console.log('bot launched'));
