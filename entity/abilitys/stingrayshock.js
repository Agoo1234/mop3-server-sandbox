

const stingrayshock = require("../objects/abilitys/stingrayshock");
const utils1 = require("../../modules/IMPmodules/util")
const util = new utils1()
function stingrayshockuse(aobjids, entities, creator, angle, rad, position, damage, time) {
    if (entities[creator] != undefined) {
        if (!entities[creator].isdead) {
            var pos = util.rotate(entities[creator].x, entities[creator].y, entities[creator].x - (entities[creator].radius * position), entities[creator].y, angle);
            var objids = aobjids.giveid(true);
            var a = new stingrayshock(objids, entities[creator].id, pos.x, pos.y, rad, damage, time)

            entities[objids] = a;



        }
    }
}
stingrayshockuse.prototype = {}
module.exports = stingrayshockuse