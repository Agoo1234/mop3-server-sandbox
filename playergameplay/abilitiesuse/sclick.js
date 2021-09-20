
const tailslapuse = require('../../entity/abilitys/kdtailslap')

const utils1 = require("../../modules/IMPmodules/util")

const util = new utils1()
function abilities(aobjids, player, entities) {
    if (entities[player]) {

        if (entities[player].bar.normalbar != 2) {

        } else {

            if (entities[player].secondaryType == 79) {
                if (entities[player].canUseTailslap && entities[player].tailState == 0) {

                    entities[player].tailState = 100
                    entities[player].canUseTailslap = false
                    new tailslapuse(aobjids, entities, player)
                }
            }
        }
    }
}
abilities.prototype = {}
module.exports = abilities