
const utils1 = require("../../../modules/util")
const util = new utils1()

function freezeballmove(entities, fireid, creator, reverse, speed, distance) {

    let anglespecial = entities[fireid].angle - (reverse ? 180 : 0)

    let fire = setInterval(() => {

        if (entities[fireid] != undefined) {
            if (entities[creator] != undefined) {
                if (!entities[fireid].isdead) {
                    let newpos = util.rotate(entities[creator].x, entities[creator].y, entities[creator].x, entities[creator].y + distance, anglespecial)
                    entities[fireid].x = newpos.x
                    entities[fireid].y = newpos.y
                    anglespecial += reverse ? -speed : speed
                    if (anglespecial >= 360) {
                        anglespecial -= 360
                    }
                    if (anglespecial <= 0) {
                        anglespecial += 360
                    }
                    entities[fireid].angle = anglespecial - (reverse ? 155 : 25)

                } else {
                    clearInterval(fire)
                }
            } else {
                if (entities[fireid]) entities[fireid].isdead = true
                clearInterval(fire)
            }
        } else {
            clearInterval(fire)
        }

    }, 20);

}
freezeballmove.prototype = {}
module.exports = freezeballmove