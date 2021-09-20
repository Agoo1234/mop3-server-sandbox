const Eventgamehandler = require('../../modules/IMPmodules/eventgamehandler')
const eventgamehandler = new Eventgamehandler()

const utils1 = require("../../modules/IMPmodules/util")

const util = new utils1()

const deathhandle = require('../../handler/deathhandle')
const pterodactylgrab = require('../objects/abilitys/pterodactylgrab')
function godown(entities, player, which) {
    entities[player].fallvelocity = 1
    let startgodown = Date.now() + 2000;
    let newgodown = setInterval(() => {
        if (!entities[player]) { clearInterval(newgodown); return };
        if (startgodown <= Date.now()) {
            if (entities[player].z > 0) {
                entities[player].goingsky = false

            } else {
                clearInterval(newgodown)
                entities[player].abilitys.button_w.abil_active = false
                entities[player].z = 0
                entities[player].specType = 0
                entities[player].isabletoboost = true
                entities[player].specType2 = 0
                entities[player].isgliding = false
                entities[player].usingability = false
                entities[player].isflying = false

                entities[player].zoomwidth /= 1.5



                entities[player].zoomheight /= 1.5
                entities[player].playcamera *= 1.5;
                eventgamehandler.sendabilityrechage(entities[player], which)
            }

        }
    }, 10);
}
function pterodactylability(entities, player, which) {
    if (entities[player].abilitys.button_w.abil_currentclick == 1 && !entities[player].abilitys.button_w.abil_active && entities[player].z == 0
    ) {
        entities[player].abilitys.button_w.abil_active = true
        entities[player].usingability = true

        let wheninsky = Date.now() + 2000
        let enteredinsky = false
        entities[player].isabletoboost = false
        entities[player].specType = 1
        entities[player].specType2 = 0
        let flycheck = setInterval(() => {
            if (!entities[player]) { clearInterval(flycheck); return }
            if (!entities[player].isflying && enteredinsky) { clearInterval(flycheck); return }
            if (enteredinsky) {//when bar is low
                //	console.log(entities[player].bar.normalbarpercentage, entities[player].bar.maxbarnormalpercentage / 7.5, entities[player].z, !entities[player].isgliding)
                if (entities[player].bar.normalbarpercentage <= entities[player].bar.maxbarnormalpercentage / 4 &&
                    !entities[player].isgliding && entities[player].z == 50) {

                    if (entities[player].flags.includes(21)) {
                        var delO = 21
                        var tmp = entities[player].flags.indexOf(delO); //remove from game arrays
                        if (-1 != tmp) {
                            entities[player].flags.splice(tmp, 1);
                        }
                    }
                    entities[player].isgliding = true
                    godown(entities, player, which)

                }
            }
            if (!enteredinsky) {
                if (wheninsky <= Date.now()) {
                    enteredinsky = true
                    whenglide = Date.now() + 2000
                    entities[player].isflying = true
                    entities[player].specType = 2
                    entities[player].zoomwidth *= 1.5
                    entities[player].zoomheight *= 1.5
                    entities[player].playcamera /= 1.5;
                    let autofly = setInterval(() => {
                        if (!entities[player]) { clearInterval(autofly); return };
                        if (entities[player].specType != 2) { clearInterval(autofly); entities[player].z = 50; return }
                        if (entities[player].z <= 50) {
                            entities[player].goingsky = true
                            entities[player].fallvelocity = 1.3
                        } else {
                            if (!entities[player]) { clearInterval(flycheck); return };
                            clearInterval(autofly)
                            entities[player].z = 50
                            entities[player].fallvelocity = 1
                        }
                    }, 10);
                }
            }


        }, 10);
    }
    //start grab
    if (entities[player].abilitys.button_w.abil_currentclick == 1 && entities[player].abilitys.button_w.abil_active
        && entities[player].z == 50 && entities[player].specType == 2 && entities[player].specType2 == 0) {
        entities[player].specType = 3
        entities[player].isgliding = true
        entities[player].fallvelocity = 1.5
        let de = setInterval(() => {
            if (!entities[player]) { clearInterval(de); return };

            if (entities[player].z > 0) {
                entities[player].goingsky = false
            } else {
                clearInterval(de)
                let newposition = util.rotate(entities[player].pos.x, entities[player].pos.y, entities[player].pos.x + (entities[player].radius), entities[player].pos.y, entities[player].angle);

                let tempentitygrab = new pterodactylgrab(newposition.x, newposition.y, entities[player].radius)
                for (var grabbedwho in entities) {
                    if (entities[grabbedwho].type == 2 && !entities[grabbedwho].isdiving && !entities[grabbedwho].isflying &&
                        !entities[grabbedwho].usingability && !entities[grabbedwho].flags.includes(35) && !entities[grabbedwho].isgrabbed
                        && entities[grabbedwho].tier <= entities[player].tier
                    ) {
                        if (util.getDistance2D(tempentitygrab.x, tempentitygrab.y, entities[grabbedwho].x, entities[grabbedwho].y) <= entities[grabbedwho].radius + tempentitygrab.radius) {

                            entities[grabbedwho].isflying = true
                            entities[grabbedwho].isgrabbed = true
                            entities[grabbedwho].fallvelocity = 1.15
                            entities[grabbedwho].goingsky = true
                            entities[grabbedwho].z = 50
                            entities[grabbedwho].canmove = false

                            entities[player].flags.push(21)
                            let declaredfall = false
                            let currgrab = setInterval(() => {
                                if (!entities[grabbedwho]) { clearInterval(currgrab); return }
                                if (entities[player]) {
                                    if (entities[player].flags.includes(21)) {
                                        let correctpos = util.rotate(entities[player].pos.x, entities[player].pos.y, entities[player].pos.x + entities[player].radius * 1.4, entities[player].pos.y, entities[player].angle);

                                        entities[grabbedwho].pos.x = correctpos.x
                                        entities[grabbedwho].pos.y = correctpos.y
                                    } else {
                                        clearInterval(currgrab);
                                        if (!declaredfall) {
                                            declaredfall = true
                                            let speed = entities[player].lastdistance
                                            let angle = entities[player].angle
                                            let newfall = setInterval(() => {
                                                if (!entities[grabbedwho]) { clearInterval(newfall); return };
                                                entities[grabbedwho].goingsky = false
                                                if (entities[grabbedwho].z > 0) {

                                                    let newpos = util.rotate(0, 0, 0 - speed * 5, 0, angle);


                                                    entities[grabbedwho].veloX = newpos.x
                                                    entities[grabbedwho].veloY = newpos.y
                                                } else {
                                                    clearInterval(newfall)

                                                    entities[grabbedwho].isgrabbed = false
                                                    entities[grabbedwho].isflying = false
                                                    entities[grabbedwho].canmove = true
                                                    entities[grabbedwho].fallvelocity = 1

                                                    entities[grabbedwho].veloX = 0
                                                    entities[grabbedwho].veloY = 0
                                                    entities[grabbedwho].hp -= 30
                                                    entities[grabbedwho].timerstunned = Date.now() + 2000
                                                    new deathhandle(entities, entities[grabbedwho].id, entities[player].id)
                                                }

                                            }, 10);
                                        }
                                    }
                                } else {
                                    clearInterval(currgrab);
                                    entities[grabbedwho].isgrabbed = false
                                    entities[grabbedwho].isflying = false
                                    entities[grabbedwho].canmove = true
                                    entities[grabbedwho].fallvelocity = 1
                                    entities[grabbedwho].goingsky = false
                                    entities[grabbedwho].veloX = 0
                                    entities[grabbedwho].veloY = 0
                                }
                            }, 10);

                            break
                        }

                    }
                }
                entities[player].fallvelocity = 1
                entities[player].z = 50
                entities[player].isgliding = false
                entities[player].goingsky = true
                entities[player].specType = 2
                entities[player].specType2 = 1
            }
        }, 10);
    } else if (entities[player].abilitys.button_w.abil_currentclick == 1 && entities[player].abilitys.button_w.abil_active
        && entities[player].z == 50 && entities[player].specType == 2 && entities[player].isgliding == false && entities[player].specType2 == 1) {
        //end ability
        if (entities[player].flags.includes(21)) {
            var delO = 21
            var tmp = entities[player].flags.indexOf(delO); //remove from game arrays
            if (-1 != tmp) {
                entities[player].flags.splice(tmp, 1);
            }
        } else {
            entities[player].isgliding = true
            godown(entities, player, which)

        }
    }
}
pterodactylability.prototype = {}
module.exports = pterodactylability