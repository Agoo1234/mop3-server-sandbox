const firemove = require("./fireballuse2");

const fireball = require("../../objects/abilitys/fireball");
const util1 = require("../../../modules/IMPmodules/util");
const util = new util1()
function fireusecreator(aobjids, moreangle, entities, creator, spec) {
    if (entities[creator] != undefined) {
        if (!entities[creator].isdead) {
            if (entities[creator].type == 2) {
                var objids = aobjids.giveid(true);

                var fire = new fireball(objids, creator, entities[creator].mouth.x, entities[creator].mouth.y, spec, creator)
                moreangle += util.randomNumber(-5, 5)
                entities[objids] = fire
                entities[objids].angle = entities[creator].angle + moreangle

                if (entities[objids].angle >= 360) {
                    entities[objids].angle -= 360
                }
                if (entities[objids].angle <= 0) {
                    entities[objids].angle += 360
                }
                if (entities[creator].tier == 16) {
                    entities[objids].radius = 20
                }
                if (entities[creator].tier == 15) {
                    entities[objids].radius = 15
                }
                if (entities[creator].tier == 14) {
                    entities[objids].radius = 10
                }
                new firemove(entities, objids)
            } else {
                var objids = aobjids.giveid(true);

                var fire = new fireball(objids, entities[creator].spawnedby2, entities[creator].x, entities[creator].y, spec, creator)

                entities[objids] = fire
                entities[objids].angle = entities[creator].angle + moreangle

                if (entities[objids].angle >= 360) {
                    entities[objids].angle -= 360
                }
                if (entities[objids].angle <= 0) {
                    entities[objids].angle += 360
                }


                entities[objids].radius = 10

                new firemove(entities, objids)
            }
        }
    }
}
fireusecreator.prototype = {}
module.exports = fireusecreator