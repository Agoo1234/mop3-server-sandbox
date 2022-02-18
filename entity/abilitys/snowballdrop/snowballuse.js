const snowballmove = require("./snowballmove");

const snowbal = require("../../objects/objects/snowball");
function snowballcreatore(aobjids, entities, creator, angle) {
    if (creator != undefined) {
        if (!creator.isdead) {

            var objids = aobjids.giveid(true);

            entities[objids] = new snowbal(objids, creator.x, creator.y, creator, 1)

            entities[objids].angle = angle


            new snowballmove(entities[objids], objids)
        }
    }
}
snowballcreatore.prototype = {}
module.exports = snowballcreatore