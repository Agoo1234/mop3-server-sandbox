const utils1 = require("../../modules/IMPmodules/util")
const util = new utils1()
const beestingability = require("../objects/abilitys/beestingability")

function beesting(aobjids, entities, creator) {
    if (entities[creator] != undefined) {
        if (!entities[creator].isdead) {
            oldspeed = entities[creator].speed
            entities[creator].speed *= -2.5
            setTimeout(() => {
                entities[creator].speed = oldspeed
                var objids = aobjids.giveid(true);
                let newpos = util.rotate(entities[creator].x, entities[creator].y, entities[creator].x + entities[creator].radius * 1.5, entities[creator].y, entities[creator].angle)
                var a = new beestingability(objids, entities[creator].id, newpos.x, newpos.y, entities[creator].angle, entities[creator].radius)
                entities[objids] = a;
            }, 3000)


        }
    }
}
beesting.prototype = {}
module.exports = beesting
