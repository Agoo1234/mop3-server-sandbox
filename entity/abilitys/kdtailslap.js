
const utils1 = require("../../modules/IMPmodules/util")
const util = new utils1()
const tailslap = require("../objects/abilitys/kftailslap");
function tailslapuse(aobjids, entities, creator) {
    if (entities[creator] != undefined) {
        if (!entities[creator].isdead) {

            var objids = aobjids.giveid(true);
            let pos = util.rotate(entities[creator].pos.x, entities[creator].pos.y, entities[creator].pos.x + (entities[creator].radius * 1.4), entities[creator].pos.y, entities[creator].angle);

            var a = new tailslap(objids, entities[creator].id, pos.x, pos.y, entities[creator].angle, entities[creator].species, entities[creator].radius / 1.1)

            entities[objids] = a;



        }
    }
}
tailslapuse.prototype = {}
module.exports = tailslapuse