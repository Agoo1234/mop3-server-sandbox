
const utils1 = require("../../modules/IMPmodules/util")

const util = new utils1()
const spiderweb = require("../objects/objects/spiderweb");
function spiderwebuse(aobjids, entities, firstpos, player, writer, which) {
    let objids = aobjids.giveid(true);
    let a = new spiderweb(objids, firstpos.x, firstpos.y)
    entities[objids] = a;
    let dateam = Date.now() - 20000;
    let webtime = 0
    entities[player].usingability = true
    entities[player].abilitys.button_w.abil_active = true
    let per = setInterval(() => {
        if (dateam <= Date.now()) {
            dateam = Date.now() + 30

            if (!entities[player]) {
                clearInterval(per)
                return;
            }
            if (entities[player].abilitys.button_w.abil_currentclick == 0 || webtime >= 660) {
                clearInterval(per)
                entities[player].usingability = false

                entities[player].abilitys.button_w.abil_recharging = true
                entities[player].abilitys.button_w.abil_timestamp = Date.now() + entities[player].abilitys.button_w.abil_time * 1000;
                if (entities[player].ws) {
                    entities[player].ws.send(writer.abilitytimer(entities[player].abilitys, which))
                }
                entities[player].abilitys.button_w.abil_active = false
            } else {
                if (!entities[objids]) {
                    clearInterval(per)
                    return;
                }
                let newpos = util.rotate(entities[player].pos.x, entities[player].pos.y,
                    entities[player].pos.x + (entities[player].radius) * 1.4, entities[player].pos.y,
                    entities[player].angle);

                entities[objids].x = newpos.x
                entities[objids].y = newpos.y
                if (webtime < 400) {

                    entities[objids].radius += 0.2
                } else {
                    entities[objids].radius -= 0.07
                    entities[objids].specType -= 0.37
                }
                webtime++
            }
        }
    }, 5);

}
spiderwebuse.prototype = {


}
module.exports = spiderwebuse