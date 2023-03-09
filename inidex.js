import Telegraf from 'telegraf';
import snmp from 'net-snmp';

import { BOT_TOKEN } from './config.js';

import { prepareSwitchesState, SNMPHost } from './src/Services/index.js';
import { botStart } from './src/BotCommand/index.js';

const bot = new Telegraf(BOT_TOKEN);

botStart(bot);

bot.launch().then(() => console.log('bot launched'));

prepareSwitchesState();
SNMPHost(snmp, bot);
