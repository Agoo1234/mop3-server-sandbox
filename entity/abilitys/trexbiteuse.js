
const trexbite = require("../objects/abilitys/trexbite");
const death = require("../../handler/deathhandle")
const utils1 = require("../../modules/IMPmodules/util")
const util = new utils1()

function trexbiteuse(aobjids, entities, creator, other2, writer) {
    if (entities[creator] != undefined) {
        if (!entities[creator].isdead) {
            let grabfix = 0 // fix grabbug
            let objids = aobjids.giveid(true);

            let a = new trexbite(objids, entities[creator].id, entities[creator].mouth.x, entities[creator].mouth.y, entities[creator].angle)
            let mec = !entities[creator].abilitys.button_w.abil_currentclick
            if (other2 == 0) {
                entities[creator].abilitys.button_w_mini.abil_active = true
                let mec = !entities[creator].abilitys.button_w_mini.abil_currentclick
            } else {
                entities[creator].abilitys.button_w.abil_active = true

            }
            entities[objids] = a;

            entities[objids].radius = entities[creator].radius / 1.15

            if (entities[objids].angle >= 360) {
                entities[objids].angle -= 360
            }
            if (entities[objids].angle <= 0) {
                entities[objids].angle += 360
            }
            let d = setInterval(() => {

                if (entities[creator] != undefined) {
                    if (entities[objids] != undefined) {
                        if (!entities[creator].isdead) {
                            if (!entities[objids].isdead) {
                                if (!entities[objids].hassomeone) {

                                    for (let i in entities) {

                                        if (entities[i].type == 2) {
                                            if (!entities[i].isdiving) {
                                                if (!entities[i].isflying) {
                                                    if (entities[i].timerstunned <= Date.now()) {
                                                        if (entities[i].id != entities[objids].spawnedby2) {
                                                            let distance = util.getDistance2D(entities[objids].x, entities[objids].y, entities[i].x, entities[i].y)
                                                            if (distance <= entities[objids].radius + entities[i].radius) {
                                                                entities[objids].hassomeone = true
                                                                entities[objids].biteid = entities[i].id
                                                                grabfix = entities[i].id
                                                                break
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                } else {
                                    if (entities[entities[objids].biteid] != undefined) {

                                        if (entities[creator] != undefined) {
                                            if (!entities[creator].isupgrading) {
                                                if (!entities[creator].isdead) {
                                                    let newpos = util.rotate(entities[entities[objids].spawnedby2].pos.x, entities[entities[objids].spawnedby2].pos.y,
                                                        entities[entities[objids].spawnedby2].pos.x - (entities[entities[objids].spawnedby2].radius + entities[entities[objids].biteid].radius), entities[entities[objids].spawnedby2].pos.y,
                                                        entities[entities[objids].spawnedby2].angle);


                                                    if (entities[entities[objids].biteid].hp > 14 && entities[creator].usingability) {


                                                        entities[entities[objids].biteid].pos.x = newpos.x
                                                        entities[entities[objids].biteid].pos.y = newpos.y

                                                        if (entities[entities[objids].biteid].timerstunned <= Date.now()) {
                                                            entities[entities[objids].biteid].timerstunned = Date.now() + 1000;
                                                            entities[entities[objids].biteid].hp -= 6
                                                            new death(entities, entities[entities[objids].biteid].id, entities[entities[objids].spawnedby2].id)
                                                        }
                                                    } else {

                                                        entities[objids].isdead = true
                                                    }

                                                }
                                            }
                                        }
                                    }
                                }
                                entities[objids].angle = entities[creator].angle
                                entities[objids].x = entities[creator].mouth.x
                                entities[objids].y = entities[creator].mouth.y
                            } else {
                                if (entities[entities[objids].biteid] != undefined) {
                                    entities[entities[objids].biteid].hp -= 15
                                    new death(entities, entities[entities[objids].biteid].id, entities[entities[objids].spawnedby2].id)
                                    entities[entities[objids].biteid].timerbleeding = Date.now() + 4000
                                    entities[entities[objids].biteid].lasthitby = entities[creator].id
                                }

                                if (entities[creator] != undefined) entities[creator].candive = true
                                if (entities[creator] != undefined) entities[creator].isabletoboost = true
                                if (entities[creator] != undefined) entities[creator].usingability = false
                                if (other2 == 1) {
                                    entities[creator].abilitys.button_w.abil_recharging = true
                                    entities[creator].abilitys.button_w.abil_active = false
                                    entities[creator].abilitys.button_w.abil_timestamp = Date.now() + entities[creator].abilitys.button_w.abil_time * 1000;
                                    if (entities[creator].ws) {
                                        entities[creator].ws.send(writer.abilitytimer(entities[creator].abilitys, other2))
                                    }
                                } else {
                                    entities[creator].abilitys.button_w_mini.abil_recharging = true
                                    entities[creator].abilitys.button_w_mini.abil_active = false
                                    entities[creator].abilitys.button_w_mini.abil_timestamp = Date.now() + entities[crea].abilitys.button_w.abil_time * 1000;
                                    if (entities[creator].ws) {
                                        entities[creator].ws.send(writer.abilitytimer(entities[creator].abilitys, other2))
                                    }

                                }
                                clearInterval(d)
                            }
                        } else {
                            entities[objids].isdead = true

                            clearInterval(d)
                        }
                    } else {

                        if (entities[grabfix] != undefined) {
                            if (entities[creator] != undefined) {
                                entities[grabfix].hp -= 15
                                new death(entities, entities[grabfix].id, entities[creator].id)
                                entities[grabfix].timerbleeding = Date.now() + 4000
                                entities[grabfix].lasthitby = entities[creator].id
                            }
                        }
                        if (entities[creator] != undefined) entities[creator].candive = true
                        if (entities[creator] != undefined) entities[creator].isabletoboost = true
                        if (entities[creator] != undefined) entities[creator].usingability = false
                        if (other2 == 1) {
                            entities[creator].abilitys.button_w.abil_recharging = true
                            entities[creator].abilitys.button_w.abil_timestamp = Date.now() + entities[creator].abilitys.button_w.abil_time * 1000;
                            if (entities[creator].ws) {
                                entities[creator].ws.send(writer.abilitytimer(entities[creator].abilitys, other2))
                            }
                        } else {
                            entities[creator].abilitys.button_w_mini.abil_recharging = true
                            entities[creator].abilitys.button_w_mini.abil_timestamp = Date.now() + entities[crea].abilitys.button_w.abil_time * 1000;
                            if (entities[creator].ws) {
                                entities[creator].ws.send(writer.abilitytimer(entities[creator].abilitys, other2))
                            }

                        }
                        clearInterval(d)
                    }
                } else {
                    clearInterval(d)
                }

            }, 20);
        }
    }
}
trexbiteuse.prototype = {}
module.exports = trexbiteuse