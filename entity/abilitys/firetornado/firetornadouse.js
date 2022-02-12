const firemove = require("./firetornadouse2");

const firetornado = require("../../objects/abilitys/firetornado");
function firetornadouse(aobjids, moreangle, entities, creator) {
    if (entities[creator] != undefined) {
        if (!entities[creator].isdead) {

            var objids = aobjids.giveid(true);

            var fire = new firetornado(objids, creator, entities[creator].mouth.x, entities[creator].mouth.y)

            entities[objids] = fire
            entities[objids].angle = entities[creator].angle + moreangle
            entities[objids].radius = entities[creator].radius / 1.5;

            if (entities[objids].angle >= 360) {
                entities[objids].angle -= 360
            }
            if (entities[objids].angle <= 0) {
                entities[objids].angle += 360
            }

            new firemove(entities, objids, creator, aobjids)


        }
    }
}
firetornadouse.prototype = {}
module.exports = firetornadouse