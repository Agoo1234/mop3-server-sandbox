

const seaspec = require("../objects/abilitys/seaspec");
function seaspecuse(aobjids, entities, creator) {
    if (entities[creator] != undefined) {
        if (!entities[creator].isdead) {
            entities[creator].usingability = true
            var objids = aobjids.giveid(true);
            var a = new seaspec(entities, objids, entities[creator].id, entities[creator].x, entities[creator].y)
            entities[objids] = a;
            entities[objids].radius = entities[creator].radius * 3.5


        }
    }
}
seaspecuse.prototype = {}
module.exports = seaspecuse