
const utils1 = require("../../modules/IMPmodules/util")
const collisionother = require('../objects/objects/fakecollision')
const collisiondynamic = require('../../modules/collisondynamic')
const death = require('../../handler/deathhandle')
const util = new utils1()
function falconabil(entities, player, aobjids, writer, which) {
    if (entities[player].abilitys.button_w.abil_active && entities[player].abilitys.button_w.abil_currentclick == 1
        && entities[player].isflying && entities[player].specType == 1 && entities[player].z == 50) {
        entities[player].specType = 2
        entities[player].goingsky = false
        entities[player].fallvelocity = 1.5
        let date = Date.now() - 10000;
        let times = 0
        let de = setInterval(() => {
            if (!entities[player]) { clearInterval(de); return };
            if (entities[player].specType != 2) { clearInterval(de); entities[player].z = 0; }
            if (entities[player].z > 0) {

                if (Date.now() > date) {
                    date = Date.now() + 200
                    times++
                    let angle = entities[player].angle + util.randomNumber(-10, 10)
                    if (angle <= 0) {
                        angle += 360
                    }
                    if (angle >= 360) {
                        angle -= 360
                    }



                }
            } else {
                clearInterval(de)
                entities[player].specType = 3
                entities[player].z = 0
                let timenew = Date.now() + 500;
                let falconkickpos = util.rotate(entities[player].pos.x, entities[player].pos.y, entities[player].pos.x - entities[player].radius * 0.9,
                    entities[player].pos.y, entities[player].angle)
                let entitycollider = new collisionother(falconkickpos.x, falconkickpos.y, entities[player].radius / 1.75)
                let mer = setInterval(() => {
                    if (Date.now() > timenew) {
                        if (!entities[player]) { clearInterval(dem); return };
                        clearInterval(mer)
                        entities[player].specType = 0
                        entities[player].isflying = false

                        entities[player].usingability = false
                        entities[player].abilitys.button_w.abil_recharging = true
                        entities[player].abilitys.button_w.abil_timestamp = Date.now() + entities[player].abilitys.button_w.abil_time * 1000;
                        if (entities[player].ws) {
                            entities[player].ws.send(writer.abilitytimer(entities[player].abilitys, which))
                        }
                        entities[player].abilitys.button_w.abil_active = false
                        entities[player].zoomwidth /= 1.5
                        entities[player].zoomheight /= 1.5
                        entities[player].playcamera *= 1.5;
                        entities[player].fallvelocity = 5
                        entitycollider = null
                    } else {
                        if (!entities[player]) { clearInterval(dem); return };
                        let falconkickpos = util.rotate(entities[player].pos.x, entities[player].pos.y, entities[player].pos.x - entities[player].radius * 0.9,
                            entities[player].pos.y, entities[player].angle)
                        entitycollider.x = falconkickpos.x
                        entitycollider.y = falconkickpos.y
                        entitycollider.radius = entities[player].radius / 1.75
                        for (var m in entities) {
                            if (entities[m].type == 2) {
                                if (entities[m].id != entities[player].id && entities[m].arenaid == 0) {
                                    let distance = util.getDistance2D(entitycollider.x, entitycollider.y, entities[m].x, entities[m].y)
                                    if (distance <= entitycollider.radius + entities[m].radius) {
                                        if (entities[m].timerstunned - 300 < Date.now()) {
                                            entities[m].hp -= 10
                                            entities[m].timerstunned = Date.now() + 1250;
                                            new collisiondynamic(entities, entities[m], entitycollider, "objtest", distance, 120)
                                            new death(entities, entities[m].id, entities[player].id)
                                        }
                                    }
                                }
                            }
                        }
                    }
                }, 50);
            }
        }, 10);
    }

    if (entities[player].abilitys.button_w.abil_currentclick == 1) {
        if (!entities[player].abilitys.button_w.abil_active) {
            entities[player].abilitys.button_w.abil_active = true
            entities[player].isflying = true
            entities[player].specType = 1
            entities[player].usingability = true
            entities[player].zoomwidth *= 1.5
            entities[player].fallvelocity = 2
            entities[player].zoomheight *= 1.5
            entities[player].playcamera /= 1.5;
            entities[player].goingsky = true

            /*	let normaltime = Date.now() + 15000;
                let per = setInterval(() => {
                    if (!entities[player]) { clearInterval(per); return };
                    if (entities[player].specType != 1) {
                        clearInterval(per)
                    } else {
                        if (Date.now() > normaltime) {
                            if (entities[player].specType != 1) {
                                clearInterval(per)
                            } else {
                                clearInterval(per)
                                let dem = setInterval(() => {
        	
                                    if (!entities[player]) { clearInterval(dem); return };
                                    if (entities[player].z >= 0) {
                                        entities[player].z -= 0.6
                                    } else {
                                        if (!entities[player]) { clearInterval(dem); return };
                                        clearInterval(dem)
                                        entities[player].specType = 0
        	
                                        entities[player].isflying = false
                                        entities[player].usingability = false
                                        entities[player].abilitys.button_w.abil_active = false
                                        entities[player].zoomwidth /= 2
                                        entities[player].zoomheight /= 2
                                        entities[player].playcamera *= 2;
                                    }
        	
        	
                                }, 10);
                            }
                        }
                    }
                }, 30);*/
            let p = setInterval(() => {
                if (!entities[player]) { clearInterval(p); return };
                if (entities[player].specType != 1) { clearInterval(p); entities[player].z = 50; return }
                if (entities[player].z <= 50) {

                } else {
                    if (!entities[player]) { clearInterval(dem); return };
                    clearInterval(p)

                }
            }, 10);
        }
    }
}
falconabil.prototype = {
}
module.exports = falconabil