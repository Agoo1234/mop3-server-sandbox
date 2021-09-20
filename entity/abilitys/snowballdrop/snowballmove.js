const utils1 = require("../../../modules/util")
const util = new utils1()

function fireusemove(entities, fireid) {

    let speed = 7

    let fire = setInterval(() => {

        if (entities[fireid] != undefined) {
            if (!entities[fireid].isdead) {
                if (speed < 0) {
                    speed = 0
                }
                var newpos = util.rotate(entities[fireid].x, entities[fireid].y, entities[fireid].x - speed, entities[fireid].y, entities[fireid].angle)
                entities[fireid].x = newpos.x
                entities[fireid].y = newpos.y
                entities[fireid].radius += 0.5

            } else {
                clearInterval(fire)
            }
        } else {
            clearInterval(fire)
        }

    }, 20);

}
fireusemove.prototype = {}
module.exports = fireusemove