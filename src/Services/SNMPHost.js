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
  definedEntity.forEach((item) => {
    const currentIp = Object.keys(item)[0];
    const session = snmp.createSession(currentIp, 'pub4MRTG');
    const oid = `1.3.6.1.2.1.2.2.1.8.${oids[currentIp].oid}`;
    session.get ([oid], (error, varbinds) => {
      if (error) {
        botOnSwitchState(bot, `${oid} ${oids[currentIp].location} connection error. Details: ${error}`);
      } else {
        for (let i = 0; i < varbinds.length; i++) {
          console.log(`${oids[currentIp].location} ${JSON.stringify(varbinds)}`)
          console.log(varbinds[0])
          if (varbinds[0]?.value === 2) {
            botOnSwitchState(bot, `${oid} ${oids[currentIp].location} down`);
          } else {
            botOnSwitchState(bot, `${oid} ${oids[currentIp].location} up`);
          }
        }
      }
      session.close ();
    });

  });

};
