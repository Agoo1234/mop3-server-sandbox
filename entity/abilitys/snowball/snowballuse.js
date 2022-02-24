const snowmove = require("./snowballuse2");

const snowball = require("../../objects/abilitys/snowball");
const util1 = require("../../../modules/IMPmodules/util");
const util = new util1()
function snowballusecreator(aobjids, moreangle, entities, creator, spec) {
    if (entities[creator] != undefined) {
        if (!entities[creator].isdead) {
            if (entities[creator].type == 2) {
                var objids = aobjids.giveid(true);

                var snow = new snowball(objids, creator, entities[creator].mouth.x, entities[creator].mouth.y, spec, creator)
                moreangle += util.randomNumber(-5, 5)
                entities[objids] = snow
                entities[objids].angle = entities[creator].angle + moreangle

                if (entities[objids].angle >= 360) {
                    entities[objids].angle -= 360
                }
                if (entities[objids].angle <= 0) {
                    entities[objids].angle += 360
                }
                if (entities[creator].tier == 16) {
                    entities[objids].radius = 50
                }
                if (entities[creator].tier == 15) {
                    entities[objids].radius = 50
                }
                if (entities[creator].tier == 14) {
                    entities[objids].radius = 40
                }
                if (entities[creator].tier == 13) {
                    entities[objids].radius = 35
                }
                if (entities[creator].tier == 12) {
                    entities[objids].radius = 30
                }
                new snowmove(entities, objids)
            } else {
                var objids = aobjids.giveid(true);

                var snow = new snowball(objids, entities[creator].spawnedby2, entities[creator].x, entities[creator].y, spec, creator)

                entities[objids] = snow
                entities[objids].angle = entities[creator].angle + moreangle

                if (entities[objids].angle >= 360) {
                    entities[objids].angle -= 360
                }
                if (entities[objids].angle <= 0) {
                    entities[objids].angle += 360
                }


                entities[objids].radius = 10

                new snowmove(entities, objids)
            }
        }
    }
}
snowballusecreator.prototype = {}
module.exports = snowballusecreator