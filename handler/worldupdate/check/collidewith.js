const utils1 = require("../../../modules/IMPmodules/util")
const util = new utils1()

function collidewith(entities, i, j) {
    this.collidestill = true
    let entity_1 = entities[i]
    let entity_2 = entities[j]
    if (entity_1 && entity_2) {
        if (!entity_1.isdead) {
            if (!entity_2.isdead) {
                let distance = util.getDistance2D(entity_1.x, entity_1.y, entity_2.x, entity_2.y)
                if (distance <= entity_2.radius) {
                    this.collidestill = false
                    return
                }
            }
        }
    }





}
collidewith.prototype = {
    hillcheck: function () {
        return this.collidestill
    },

}
module.exports = collidewith