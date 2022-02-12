
const crabsmasha = require("../objects/abilitys/crabsmash");
const wave = require("../objects/abilitys/wave");
const utils1 = require("../../modules/IMPmodules/util")
const util = new utils1()
function crabsmashuse(aobjids, entities, creator, d) {

    if (entities[creator] != undefined) {

        if (!entities[creator].isdead) {

            var objids = aobjids.giveid(true);

            var b = util.rotate(entities[creator].x, entities[creator].y, entities[creator].x - entities[creator].radius * 1.2, entities[creator].y + (d ? entities[creator].radius - (entities[creator].radius / 2) : -entities[creator].radius + (entities[creator].radius / 2)), entities[creator].angle)
            var oldangle = entities[creator].angle
            var a = new crabsmasha(entities[creator].radius * 1.2, objids, entities[creator].id, b.x, b.y, entities[creator].angle, d)
            entities[objids] = a
            setTimeout(() => {
                if (entities[creator] != undefined) {
                    if (entities[creator].biome == 1 && !entities[creator].isintree) {
                        var aeobjids = aobjids.giveid(true);

                        var p = (d ? -15 : 15)

                        var newangler = oldangle + p
                        if (newangler >= 360) {
                            newangler -= 360
                        }
                        if (newangler <= 0) {
                            newangler += 360
                        }
                        var ra = util.rotate(entities[creator].x, entities[creator].y, entities[creator].x - entities[creator].radius * 1.5, entities[creator].y, newangler)

                        var m = new wave(entities[creator].radius, aeobjids, entities[creator].id, ra.x, ra.y, newangler)
                        entities[aeobjids] = m
                        let newint = setInterval(() => {

                            if (!entities[aeobjids] != undefined) {
                                try {


                                    var ra = util.rotate(entities[aeobjids].x, entities[aeobjids].y, entities[aeobjids].x - entities[aeobjids].speed, entities[aeobjids].y, newangler)
                                    entities[aeobjids].x = ra.x
                                    entities[aeobjids].y = ra.y
                                } catch {
                                    clearInterval(newint)
                                }
                            } else {
                                clearInterval(newint)
                            }

                        }, 20);
                    }
                }
            }, 100);

        }
    }
}
crabsmashuse.prototype = {}
module.exports = crabsmashuse
