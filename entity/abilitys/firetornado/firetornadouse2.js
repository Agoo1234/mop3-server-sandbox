
const utils1 = require("../../../modules/IMPmodules/util")
const util = new utils1()


function firetornadouse(entities, fireid, creator, aobjids) {
    let con = Date.now();
    let speed = 15
    let radius = 0
    let randomdistance = util.randomNumber(350, 450)
    let fire = setInterval(() => {
        if (con <= Date.now()) {
            con = Date.now() + 20;
            if (entities[fireid] != undefined && entities[creator] != undefined) {
                if (!entities[fireid].isdead && !entities[creator].isdead) {
                    if (util.getDistance2D(entities[fireid].x, entities[fireid].y, entities[creator].x, entities[creator].y) > randomdistance) {
                        var angle = util.anglebetween2point(entities[fireid].x, entities[fireid].y, entities[creator].x, entities[creator].y)
                        entities[fireid].angle = angle
                        var newposa = util.rotate(entities[fireid].x, entities[fireid].y, entities[fireid].x + 2, entities[fireid].y, entities[fireid].angle)
                        var newpos = { x: newposa.x - entities[fireid].x, y: newposa.y - entities[fireid].y }
                        entities[fireid].veloX = newpos.x
                        entities[fireid].veloY = newpos.y
                    }


                    if (speed < 0) {
                        speed = 0

                    } else {
                        var newpos = util.rotate(entities[fireid].x, entities[fireid].y, entities[fireid].x - speed, entities[fireid].y, entities[fireid].angle)
                        entities[fireid].veloX = 0
                        entities[fireid].veloY = 0
                        entities[fireid].x = newpos.x
                        entities[fireid].y = newpos.y


                        speed -= 0.35

                    }
                } else {
                    if (entities[fireid]) entities[fireid].isdead = true;
                    clearInterval(fire)
                }
            } else {
                if (entities[fireid]) entities[fireid].isdead = true;
                clearInterval(fire)
            }

        }
    }, 0);

}
firetornadouse.prototype = {}
module.exports = firetornadouse