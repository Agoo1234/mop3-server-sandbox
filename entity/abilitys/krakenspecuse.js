

const krakenspec = require("../objects/abilitys/krakenspec");
function krakenspecuse(aobjids, entities, creator) {
    if (entities[creator] != undefined) {
        if (!entities[creator].isdead) {

            var objids = aobjids.giveid(true);
            var a = new krakenspec(objids, entities[creator].id, entities[creator].x, entities[creator].y)
            entities[objids] = a;
            entities[objids].radius = entities[creator].radius * 3.2


        }
    }
}
krakenspecuse.prototype = {}
module.exports = krakenspecuse