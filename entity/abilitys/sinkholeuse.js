
const sinkhole = require("../objects/abilitys/sinkhole");


function sinkholeuse(aobjids, entities, creator) {

    if (entities[creator] != undefined) {
        if (!entities[creator].isdead) {
            var a = aobjids.giveid(true)
            var sink = new sinkhole(a, creator, entities[creator].mouth.x, entities[creator].mouth.y, entities[creator].radius * 1.3)

            entities[a] = sink
        }
    }
}
sinkholeuse.prototype = {}
module.exports = sinkholeuse