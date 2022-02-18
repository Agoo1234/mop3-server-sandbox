const utils1 = require("../../../modules/IMPmodules/util")
const util = new utils1()

function snowballusemove(entities, fireid) {
    let newdate = Date.now()
    let speed = 30
    
    if (entities[entities[fireid].spawnedby2].species == 3) {
        speed = 20
    }
    let snow = setInterval(() => {
        if (newdate <= Date.now()) {
            newdate = Date.now() + 25
            if (entities[fireid] != undefined) {
                if (!entities[fireid].isdead) {
                    if (speed < 0) {
                        speed = 0
                        clearInterval(snow)
                        return
                    }
                    var newpos = util.rotate(0, 0, 0 - speed, 0, entities[fireid].angle)
                    entities[fireid].veloX = newpos.x
                    entities[fireid].veloY = newpos.y

                    speed -= 0.8
                } else {
                    clearInterval(snow)
                }
            } else {
                clearInterval(snow)
            }
        }
    }, 0);

}
snowballusemove.prototype = {}
module.exports = snowballusemove