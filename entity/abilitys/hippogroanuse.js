
const hippogroan = require("../objects/abilitys/hippogroan");

function hippogroanuse(aobjids, entities, creator) {
    if (entities[creator] != undefined) {
        if (!entities[creator].isdead) {

            var objids = aobjids.giveid(true);
            var a = new hippogroan(entities[creator].radius, objids, entities[creator].id, entities[creator].x, entities[creator].y)

            entities[objids] = a;


        }
    }
}
hippogroanuse.prototype = {}
module.exports = hippogroanuse