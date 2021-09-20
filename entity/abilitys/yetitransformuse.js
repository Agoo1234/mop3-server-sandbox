
const yetifreeze = require("../objects/abilitys/yetitransform");

function yetitransformuse(aobjids, entities, creator) {
    if (entities[creator] != undefined) {
        if (!entities[creator].isdead) {

            var objids = aobjids.giveid(true);

            var a = new yetifreeze(entities[creator].radius, objids, entities[creator].id, entities[creator].x, entities[creator].y)

            entities[objids] = a;


        }
    }
}
yetitransformuse.prototype = {}
module.exports = yetitransformuse