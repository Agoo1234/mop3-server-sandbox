const utils1 = require("../../modules/util")
const util = new utils1()
const waveobj = require("../objects/abilitys/wave");
function wave(entities, aobjids, oldangle, creator) {


    var aeobjids = aobjids.giveid(true);

    var newangler = oldangle - 180

    if (newangler >= 360) {
        newangler -= 360
    }
    if (newangler <= 0) {
        newangler += 360
    }
    var ra = util.rotate(entities[creator].x, entities[creator].y, entities[creator].x - entities[creator].radius * 1.5, entities[creator].y, newangler)

    var m = new waveobj(entities[creator].radius, aeobjids, entities[creator].id, ra.x, ra.y, newangler)

    entities[aeobjids] = m

    let newint = setInterval(() => {


        if (entities[aeobjids] != undefined) {
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

wave.prototype = {}
module.exports = wave