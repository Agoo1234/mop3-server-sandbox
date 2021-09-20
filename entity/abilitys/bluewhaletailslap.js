
const utils1 = require("../../modules/IMPmodules/util")
const util = new utils1()
const bluewhaletailslap = require("../objects/abilitys/bluewhaletailslap");

function bluewhaletailslapuse(aobjids, entities, creator) {
    if (entities[creator] != undefined) {
        if (!entities[creator].isdead) {

            var objids = aobjids.giveid(true);
            let newpos = util.rotate(entities[creator].x, entities[creator].y, entities[creator].x + entities[creator].radius * 1.5, entities[creator].y, entities[creator].angle)
            var a = new bluewhaletailslap(objids, entities[creator].id, newpos.x, newpos.y, entities[creator].angle, entities[creator].radius)
            entities[objids] = a;


        }
    }
}
bluewhaletailslapuse.prototype = {}
module.exports = bluewhaletailslapuse
