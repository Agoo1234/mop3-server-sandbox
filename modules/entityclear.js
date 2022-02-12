
const foodclear = require("../handler/worldupdate/foodclear");
const name1 = require("./botnames")
const name = new name1()
const util1 = require("./IMPmodules/util")
const util = new util1()
const tierload1 = require("../playergameplay/choices/tierschoice")
const tierload = new tierload1()

function entityclear(QuadTree, createbot, entities, ws_new, aobjids, game, writer, serverstarted) {
    for (let i in entities) {
        if (entities[i].isdead) {

            QuadTree.remove(entities[i])

            for (let d in ws_new) {
                if (ws_new[d].toupdate.includes(entities[i])) {
                    var delO = entities[i]; //delete possible dying object from game

                    var tmp = ws_new[d].tocreate.indexOf(delO); //remove from game arrays
                    if (-1 != tmp) {
                        ws_new[d].tocreate.splice(tmp, 1);
                    }


                    var tmp = ws_new[d].toupdate.indexOf(delO); //remove from game arrays
                    if (-1 != tmp) {
                        ws_new[d].toupdate.splice(tmp, 1);
                    }

                    ws_new[d].todelete.push(entities[i])
                }

            }


            if (entities[i].isbot) {
                if (entities[i].isplayer) {
                    if (entities[i].tier == 14) {


                        if (entities[i].respawnbot) {
                            maanimals = tierload.tier14(false)
                            new createbot(true, writer, aobjids, entities, maanimals, name.newnames(), 1500, false, util.randomNumber(0, 0), util.randomNumber(0, 0), 14)
                        }
                    }

                }

            }
            new foodclear(entities, i)
            setTimeout(() => {

                delete entities[i]

            }, 0);



        } else {
            continue;
        }
    }
}
entityclear.prototype = {}
module.exports = entityclear