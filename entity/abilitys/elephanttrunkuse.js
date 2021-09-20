
const elephanttrunk = require("../objects/abilitys/elephanttrunk");

function elephanttrunkuse(aobjids, entities, creator) {
    if (entities[creator] != undefined) {
        if (!entities[creator].isdead) {

            var objids = aobjids.giveid(true);

            var a = new elephanttrunk(objids, entities[creator].id, entities[creator].mouth.x, entities[creator].mouth.y, entities[creator].angle, entities[creator].radius * 1.2)
            entities[objids] = a;


        }
    }
}
elephanttrunkuse.prototype = {}
module.exports = elephanttrunkuse