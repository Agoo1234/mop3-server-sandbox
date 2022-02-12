const snowballmove = require("./snowballmove");

const snowbal = require("../../objects/objects/snowball");
function snowballcreatore(aobjids, entities, creator, angle) {
    if (entities[creator] != undefined) {
        if (!entities[creator].isdead) {

            var objids = aobjids.giveid(true);

            entities[objids] = new snowbal(objids, entities[creator].x, entities[creator].y, creator, 1)

            entities[objids].angle = angle


            new snowballmove(entities, objids)
        }
    }
}
snowballcreatore.prototype = {}
module.exports = snowballcreatore