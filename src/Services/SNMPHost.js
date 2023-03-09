import { oids } from '../../config.js';

import { botOnSwitchDown, botOnSwitchUp } from '../BotCommand/index.js';

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
    session.get ([oid], function (error, varbinds) {
      if (error) {
        console.error (error);
      } else {
        for (var i = 0; i < varbinds.length; i++) {
          if (snmp.isVarbindError (varbinds[i])) {
            console.error (snmp.varbindError (varbinds[i]));
          } else {
            console.log (varbinds[i].oid + " = " + varbinds[i].value);
          }
        }
      }
      session.close ();
    });

  });

};
