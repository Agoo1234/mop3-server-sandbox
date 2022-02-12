const utils1 = require("../../modules/IMPmodules/util");

const util = new utils1()
const deathhandle = require('../../handler/deathhandle')
const stingerfakeent = require('../objects/abilitys/giantscorpstingrab')
const collisiondynamic = require('../../modules/collisondynamic')
function stinguse(entities, player, writer, which) {
    let stingfirst = Date.now() + 900;
    let secondsting = Date.now() + 1900;
    let stingthird = Date.now() + 2100;
    let stingfirstuse = false
    let stingseconduse = false

    entities[player].specType = 1
    entities[player].specType2 = 0
    entities[player].usingability = true
    entities[player].control = false
    entities[player].candive = false
    entities[player].isabletoboost = false
    entities[player].abilitys.button_w.abil_active = true
    let sting = setInterval(() => {
        if (!entities[player]) {
            clearInterval(sting)
            return;
        }
        if (stingfirst <= Date.now() && !stingfirstuse) {
            entities[player].specType2 = 1
            entities[player].flags.push(21)
            stingfirstuse = true


            let stingpos = util.rotate(entities[player].pos.x, entities[player].pos.y, entities[player].pos.x - entities[player].radius * 2,
                entities[player].pos.y, entities[player].angle)
            let mystingentity = new stingerfakeent(stingpos.x, stingpos.y, entities[player].radius)
            let stingnew = setInterval(() => {

                if (!entities[player]) {
                    clearInterval(stingnew)
                    if (entities[mystingentity.biteid]) {
                        entities[mystingentity.biteid].isgrabbed = false
                        let newstingpos = util.rotate(entities[player].pos.x, entities[player].pos.y, entities[player].pos.x - (entities[player].radius * 1.25),
                            entities[player].pos.y, entities[player].angle)
                        mystingentity.x = newstingpos.x
                        mystingentity.y = newstingpos.y
                        this.pushnearplayers(entities, player, newstingpos)
                    }
                    return;
                }
                if (entities[mystingentity.biteid]) {


                    let newstingpos = util.rotate(entities[player].pos.x, entities[player].pos.y, entities[player].pos.x - (entities[player].radius + entities[mystingentity.biteid].radius),
                        entities[player].pos.y, entities[player].angle)
                    mystingentity.x = newstingpos.x
                    mystingentity.y = newstingpos.y
                }
                mystingentity.radius = entities[player].radius
                if (!mystingentity.triedtograbsomeone) {
                    for (let stingrab in entities) {
                        if (entities[stingrab].type == 2) {
                            if (!entities[stingrab].isgrabbed && entities[stingrab].timershivered <= Date.now() && !entities[stingrab].isdiving
                                && !entities[stingrab].isflying) {
                                if (entities[stingrab].id != entities[player].id) {
                                    let distance = util.getDistance2D(entities[stingrab].x, entities[stingrab].y, mystingentity.x, mystingentity.y)
                                    if (distance <= entities[stingrab].radius + mystingentity.radius) {
                                        mystingentity.biteid = entities[stingrab].id
                                        entities[mystingentity.biteid].isgrabbed = true
                                        entities[mystingentity.biteid].timerstunned = Date.now() + 1100;

                                        break
                                    }


                                } else continue;
                            }
                        }
                    }
                    mystingentity.triedtograbsomeone = true
                } else {

                    if (mystingentity.biteid != 0) {

                        if (!entities[player]) {
                            clearInterval(stingnew)
                            return
                        } else {
                            if (!entities[player].usingability) {
                                clearInterval(stingnew)
                                if (entities[mystingentity.biteid]) {
                                    entities[mystingentity.biteid].hp -= 30
                                    if (entities[player]) {
                                        new deathhandle(entities, entities[mystingentity.biteid], entities[player])
                                        entities[mystingentity.biteid].lasthitby = entities[player].id
                                    }
                                    entities[mystingentity.biteid].isgrabbed = false
                                    entities[mystingentity.biteid].timershivered = Date.now() + 7000

                                    let newstingpos = util.rotate(entities[player].pos.x, entities[player].pos.y, entities[player].pos.x - (entities[player].radius * 1.25),
                                        entities[player].pos.y, entities[player].angle)
                                    mystingentity.x = newstingpos.x
                                    mystingentity.y = newstingpos.y
                                    this.pushnearplayers(entities, player, mystingentity)
                                }
                                return
                            }

                            if (entities[mystingentity.biteid]) {


                                let position = { x: entities[mystingentity.biteid].pos.x - mystingentity.x, y: entities[mystingentity.biteid].pos.y - mystingentity.y }

                                if (position.x >= 0) {
                                    if (position.x >= 5) {
                                        position.x = 5
                                    }
                                }
                                if (position.x < 0) {
                                    if (position.x <= -5) {
                                        position.x = -5
                                    }

                                }

                                if (position.y >= 0) {
                                    if (position.y >= 5) {
                                        position.y = 5
                                    }
                                }
                                if (position.y < 0) {
                                    if (position.y <= -5) {
                                        position.y = -5
                                    }

                                }
                                entities[mystingentity.biteid].pos.x -= position.x
                                entities[mystingentity.biteid].pos.y -= position.y


                            }
                            return;
                        }
                    } else {
                        clearInterval(stingnew)
                    }
                }
            }, 10);
        }
        if (secondsting <= Date.now() && !stingseconduse) {
            entities[player].specType2 = 0
        }
        if (stingthird <= Date.now()) {
            clearInterval(sting)
            entities[player].specType = 0
            entities[player].specType2 = 0
            entities[player].control = true
            entities[player].candive = true
            entities[player].isabletoboost = true
            entities[player].usingability = false

            var delO = 21
            var tmp = entities[player].flags.indexOf(delO); //remove from game arrays
            if (-1 != tmp) {
                entities[player].flags.splice(tmp, 1);
            }

            entities[player].abilitys.button_w.abil_recharging = true
            entities[player].abilitys.button_w.abil_timestamp = Date.now() + entities[player].abilitys.button_w.abil_time * 1000;
            if (entities[player].ws) {
                entities[player].ws.send(writer.abilitytimer(entities[player].abilitys, which))
            }
            entities[player].abilitys.button_w.abil_active = false
        }

    }, 10);
}
stinguse.prototype = {
    pushnearplayers: function (entities, player, mystingentity) {
        for (var collideall in entities) {
            if (entities[player]) {
                let distance = util.getDistance2D(entities[collideall].x, entities[collideall].y, mystingentity.x, mystingentity.y)
                if (distance <= entities[collideall].radius + mystingentity.radius) {
                    if (entities[collideall].type == 2) {
                        if (!entities[collideall].isdiving && !entities[collideall].isflying) {
                            if (entities[collideall].id != entities[player].id) {
                                new collisiondynamic(entities, mystingentity, entities[collideall], "objtest", 0, 150)
                            }
                        }
                    }
                }
            }
        }
    },

}
module.exports = stinguse