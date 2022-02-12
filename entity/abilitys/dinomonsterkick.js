const deathhandle = require("../../handler/deathhandle");
const utils1 = require("../../modules/IMPmodules/util")

const util = new utils1()
function dinomonsterkick(entities, target, kicker, angle, newspeed) {
    let lastdate = Date.now()
    if (entities[target] != undefined) {
        if (!entities[target].isdead) {
            if (lastdate <= Date.now()) {
                let speed = util.randomNumber(2, 4)
                let timelet = Date.now() + 2000
                lastdate = Date.now() + 50
                let howmuch = 0


                entities[target].canmove = false
                entities[target].canmoveangle = false
                entities[target].maxangle = 0

                entities[target].timerstunned += 5
                entities[target].isflying = true
                entities[target].goingsky = true
                if (angle >= 360) {
                    angle -= 360
                }
                if (angle <= 0) {
                    angle += 360
                }

                let a = setInterval(() => {



                    if (entities[target] != undefined) {
                        howmuch++
                        entities[target].angle += 1

                        if (speed < 0) speed = 0;
                        let newpos = util.rotate(0, 0, 0 + (newspeed * speed), 0, angle);

                        entities[target].veloX = newpos.x
                        entities[target].veloY = newpos.y

                        if (timelet <= Date.now()) {
                            entities[target].goingsky = false
                        }
                        if (entities[target].z == 0 && timelet <= Date.now()) {
                            entities[target].veloX = 0
                            entities[target].veloY = 0
                            entities[target].canmove = true
                            entities[target].canmoveangle = true
                            entities[target].isflying = false

                            entities[target].hp -= 15
                            if (entities[kicker] != undefined) {
                                if (entities[target] != undefined) {
                                    new deathhandle(entities, entities[target].id, entities[kicker].id)
                                }
                            }
                            clearInterval(a)
                        }

                    } else {
                        clearInterval(a)

                    }
                }, 1);
            }
        }
    }
}
dinomonsterkick.prototype = {}
module.exports = dinomonsterkick