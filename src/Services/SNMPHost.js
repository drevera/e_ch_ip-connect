import { oids } from '../../config.js';

import { botOnSwitchState } from '../BotCommand/index.js';

let definedEntity = [];

const arrayOidsKeys = Object.keys(oids);

export const prepareSwitchesState = () => {
  arrayOidsKeys.forEach((item) => {
    const entity = {
      [item]: true,
    };
    definedEntity.push(entity);
  });
};

export default (snmp, bot) => {
  console.log(definedEntity);
  definedEntity.forEach((item) => {
    const currentIp = Object.keys(item)[0];
    const session = snmp.createSession(currentIp, 'pub4MRTG');
    const oid = `1.3.6.1.2.1.2.2.1.8.${oids[currentIp].oid}`;
    console.log(`session init on ${oid}`);
    session.get ([oid], (error, varbinds) => {
      if (error) {
        botOnSwitchState(bot, `${oid[0]} ${oids[currentIp].location} connection error. Details: ${error}`);
      } else {
        for (let i = 0; i < varbinds.length; i++) {
          if (snmp.isVarbindError (varbinds[i])) {
            botOnSwitchState(bot, `${oid[0]} ${oids[currentIp].location} down`);
          } else {
            botOnSwitchState(bot, `${oid[0]} ${oids[currentIp].location} up`);
          }
        }
      }
      session.close ();
    });

  });

};
