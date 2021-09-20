
const utils1 = require("../../modules/IMPmodules/util")
const util = new utils1()
const crystaldrop = require("../objects/abilitys/crystalfire");
function crystalfireuse(aobjids, moreangle, entities, creator) {
    if (entities[creator] != undefined) {
        if (!entities[creator].isdead) {


            var objids = aobjids.giveid(true);

            var fire = new crystaldrop(objids, creator, entities[creator].mouth.x, entities[creator].mouth.y, entities[creator].angle)
            var speed = 30
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

            let icemove = setInterval(() => {

                if (entities[objids] != undefined) {

                    if (speed < 0) {
                        speed = 0
                    }
                    var newpos = util.rotate(entities[objids].x, entities[objids].y, entities[objids].x - speed, entities[objids].y, entities[objids].angle)
                    entities[objids].x = newpos.x
                    entities[objids].y = newpos.y

                    speed -= 0.7

                } else {
                    clearInterval(icemove)
                }

            }, 20);

        }
    }
}
crystalfireuse.prototype = {}
module.exports = crystalfireuse