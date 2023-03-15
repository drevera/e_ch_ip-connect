import { oids } from '../../config.js';

import { botOnSwitchState } from '../BotCommand/index.js';

let definedEntity = [];

const arrayOidsKeys = Object.keys(oids);

export const prepareSwitchesState = () => {
  arrayOidsKeys.forEach((item) => {
    const entity = {
      [item]: 0,
    };
    definedEntity.push(entity);
  });
};

export default (snmp, bot) => {
  definedEntity.forEach((item) => {
    console.log(definedEntity);
    const currentIp = Object.keys(item)[0];
    const session = snmp.createSession(currentIp, 'pub4MRTG');
    const oid = `1.3.6.1.2.1.2.2.1.8.${oids[currentIp].oid}`;
    session.get([oid], (error, varbinds) => {
      if (error) {
        if (item !== 0) {
          botOnSwitchState(bot, `${oid} ${oids[currentIp].location} connection error. Details: ${error}`);
          item = 0;
        }
      } else {
        for (let i = 0; i < varbinds.length; i++) {
          if (varbinds[0]?.value === 2) {
            if (item !== 2) {
              botOnSwitchState(bot, `${oid} ${oids[currentIp].location} down`);
              item = 2;
            }
          } else {
            if (item !== 1) {
              botOnSwitchState(bot, `${oid} ${oids[currentIp].location} up`);
              item = 1;
            }
          }
        }
      }
      session.close();
    });
  });
};
