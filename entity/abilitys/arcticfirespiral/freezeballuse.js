const firemove = require("./freezeballuse2");

const fireball = require("../../objects/abilitys/fire");
function freezeballuse(aobjids, entities, creator, spec, x, y, reverse, speed, angle, distance) {
    if (entities[creator] != undefined) {
        if (!entities[creator].isdead) {

            var objids = aobjids.giveid(true);

            entities[objids] = new fireball(objids, creator, x, y, spec)

            entities[objids].radius = 10
            entities[objids].angle = angle

            if (entities[objids].angle >= 360) {
                entities[objids].angle -= 360
            }
            if (entities[objids].angle <= 0) {
                entities[objids].angle += 360
            }


            new firemove(entities, objids, creator, reverse, speed, distance)
        }
    }
}
freezeballuse.prototype = {}
module.exports = freezeballuse