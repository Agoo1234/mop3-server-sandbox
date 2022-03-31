
const tailslapuse = require('../../entity/abilitys/kdtailslap')

const utils1 = require("../../modules/IMPmodules/util")
const fireuse = require("../../entity/abilitys/fire/fireballuse")

const util = new utils1()
function abilities(aobjids, player, entities) {
    if (entities[player]) {
        // if (entities[player].bar.normalbar !=2) {}
       if (entities[player].bar.normalbar == 0) {
            if (entities[player].bar.normalbarpercentage > 6.0){
                
            }
        } 
        else if (entities[player].bar.normalbar == 2 && entities[player].secondaryType != 79 && entities[player].secondaryType != 46) {
            if (entities[player].bar.normalbarpercentage > 6.0) {
                new fireuse(aobjids, 0, entities, entities[player].id, entities[player].specType2)
                entities[player].bar.normalbarpercentage -= 6.0
            }
        }
        else {


            if (entities[player].secondaryType == 79) {
                if (entities[player].canUseTailslap && (entities[player].tailState == 0 || entities[player].infability) && entities[player].arenaid == 0) {

                    entities[player].tailState = 100
                    entities[player].canUseTailslap = false
                    new tailslapuse(aobjids, entities, player)
                }
            }
            if (entities[player].secondaryType == 46) {
                if (entities[player].abilitys.button_w.abil_currentclick == 0 && !entities[player].abilitys.button_w.abil_active) {
                    entities[player].abilitys.button_w.abil_active = true
                    entities[player].goingsky = true
                    entities[player].usingability = true
                    entities[player].isflying = true
                    entities[player].zoomwidth *= 2
                    entities[player].zoomheight *= 2
                    entities[player].playcamera /= 2;


                } else if (entities[player].abilitys.button_w.abil_currentclick == 0 && entities[player].abilitys.button_w.abil_active && entities[player].z == 50) {
                    entities[player].goingsky = false
                    let flyhigh = setInterval(() => {
                        if (entities[player]) {
                            if (entities[player].z == 0) {
                                clearInterval(flyhigh)
                                entities[player].usingability = false
                                entities[player].isflying = false
                                entities[player].abilitys.button_w.abil_active = false
                                entities[player].zoomwidth /= 2;
                                entities[player].zoomheight /= 2;
                                entities[player].playcamera *= 2;

                            }
                        } else {
                            clearInterval(flyhigh)
                        }
                    }, 0);
                }
            }
        }
    }
}
abilities.prototype = {}
module.exports = abilities