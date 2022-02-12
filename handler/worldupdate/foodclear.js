const util1 = require("../../modules/IMPmodules/util")
const util = new util1()
function foodclear(entities, player) {
    if (entities[player].class == "Food") {
        switch (entities[player].type) {
            case 21://waterberry
            case 20://waterberry
            case 50://melon
            case 51://melon
                if (entities[entities[player].spawnedby2]) {
                    let foodid = entities[player].spawnedby2
                    let randomnumb = util.randomNumber(entities[player].lowestrespawnsec * 1000, entities[player].bigestrespawnsec * 1000)
                    setTimeout(() => {
                        if (entities[foodid]) {
                            entities[foodid].lowerfood()
                        }
                    }, randomnumb);

                }
                break
            case 22://mushroom
            case 24://mushroom
                let foodid = entities[player].spawnedby2
                let randomnumb = util.randomNumber(entities[player].lowestrespawnsec * 1000, entities[player].bigestrespawnsec * 1000)
                setTimeout(() => {
                    if (entities[foodid]) {
                        entities[foodid].lowermushroom()
                    }
                }, randomnumb);
                break
        }
    }
}






foodclear.prototype = {}
module.exports = foodclear