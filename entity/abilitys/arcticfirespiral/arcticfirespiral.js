
const utils1 = require("../../../modules/util")

const util = new utils1()
const freezeball = require("./freezeballuse");
function firespiral(entities, player, aobjids, speed, angle, distance, reverse) {

    new freezeball(aobjids, entities, player, 1, entities[player].pos.x, entities[player].pos.y, reverse, speed, angle, distance)

}
firespiral.prototype = {}
module.exports = firespiral