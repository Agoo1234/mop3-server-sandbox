

const collisiondynamic = require("../../modules/collisondynamic")
const utils1 = require("../../modules/IMPmodules/util")
const util = new utils1()
const checkplayer2 = require("../../handler/worldupdate/check/2playercheck")
const death = require("../../handler/deathhandle")
const fireuse = require('../../entity/abilitys/fire/fireballuse')
const dinomonsterkick = require('../../entity/abilitys/dinomonsterkick');

const game1 = require('../../game');
const game = new game1()


const name1 = require("../../modules/botnames");


const name = new name1()



function collisions(entities, i, j, aobjids) {
    let entity_1 = entities[i]
    let entity_2 = entities[j]

    if (entity_1) {
        if (entity_2) {

            if (!entity_1.isdead && !entity_2.isdead) {
                if (entity_1.type == 2) {


                    if (entity_1.arenaid != 0) {
                        let amdistance = util.getDistance2D(entities[entity_1.arenaid].x, entities[entity_1.arenaid].y, entity_1.x, entity_1.y)
                        if (amdistance >= entities[entity_1.arenaid].insradius - entity_1.radius) {
                            new collisiondynamic(entities, entity_1, entities[entity_1.arenaid], true, amdistance)

                        }

                    }
                }
                if (entity_2.type == 2 && !entity_2.isdead && entity_2.isplayer && entity_2.arenaid == 0) {
                    if (entity_1.type == 2 && !entity_1.isdead && entity_1.isplayer && entity_1.arenaid == 0) {

                        if (!entity_2.isdiving) {
                            if (!entity_2.isflying) {
                                if (!entity_2.usingability && entity_1.usingability) {
                                    if (entity_2.timerstunned <= Date.now()) {
                                        if (entity_1.secondaryType == 73) {
                                            let amdistance = util.getDistance2D(entity_2.x, entity_2.y, entity_1.mouth.x, entity_1.mouth.y)

                                            if (amdistance <= (entity_1.radius + entity_2.radius) / 1.5) {


                                                if (entity_1.speed >= 9) {
                                                    entity_2.hp -= 20
                                                    entity_2.lasthitby = entity_1.id

                                                    new dinomonsterkick(entities, entity_2.id, entity_1.id, entity_1.angle - 180, entity_1.lastdistance)
                                                    entity_1.usingability = false



                                                } else {
                                                    entity_2.hp -= 4
                                                    entity_2.lasthitby = entity_1.id
                                                    let ang = entity_1.angle - util.randomNumber(-10, 10)
                                                    if (ang <= 0) {
                                                        ang += 360
                                                    }
                                                    if (ang >= 360) {
                                                        ang -= 360
                                                    }
                                                    let pos = util.rotate(0, 0, 0 - entity_1.radius * 3, 0, ang)
                                                    entity_2.pos.x += pos.x
                                                    entity_2.pos.y += pos.y
                                                }

                                                new death(entities, entity_2.id, entity_1.id)
                                            }
                                        }
                                    }
                                }
                            }

                        }

                    }
                }
                if (entity_1.type == 2 && entity_2.type == 2) {
                    if (!entity_1.isinhole && !entity_2.isinhole) {
                        new checkplayer2(entities, i, j);
                    }
                }






                if (!entity_1.isdiving && !entity_2.isdiving) {

                    if (!entity_1.isflying && !entity_2.isflying) {
                        let distanceplay = 0
                        if (entity_1.pos && !entity_2.pos) {
                            distanceplay = util.getDistance2D(entity_1.pos.x, entity_1.pos.y, entity_2.x, entity_2.y)
                        } if (entity_2.pos && !entity_1.pos) {
                            distanceplay = util.getDistance2D(entity_1.x, entity_1.y, entity_2.pos.x, entity_2.pos.y)
                        } if (!entity_2.pos && !entity_1.pos) {
                            distanceplay = util.getDistance2D(entity_1.x, entity_1.y, entity_2.x, entity_2.y)
                        }
                        if (entity_2.pos && entity_1.pos) {
                            distanceplay = util.getDistance2D(entity_1.pos.x, entity_1.pos.y, entity_2.pos.x, entity_2.pos.y)
                        }

                        if (entity_1.type == 71 && (entity_2.type == 71 || entity_2.type == 2)) {

                            if (entity_1.lastuse < Date.now()) {

                                if (entity_2.type == 71) {
                                    if (entity_2.id != entity_1.id && entity_2.spawnedby2 != entity_1.spawnedby2) {
                                        if (distanceplay < 250) {
                                            var anglenewe = util.anglebetween2point(entity_1.x, entity_1.y, entity_2.x, entity_2.y)
                                            entity_1.angle = anglenewe - 180
                                            new fireuse(aobjids, 0, entities, entity_1.id, 0)
                                            entity_1.lastuse = Date.now() + 2500;

                                        }
                                    }

                                }
                                if (entity_2.type == 2) {
                                    if (entity_2.id != entity_1.spawnedby2) {
                                        if (distanceplay < 250) {
                                            var anglenewe = util.anglebetween2point(entity_1.x, entity_1.y, entity_2.x, entity_2.y)
                                            entity_1.angle = anglenewe - 180
                                            new fireuse(aobjids, 0, entities, entity_1.id, 0)
                                            entity_1.lastuse = Date.now() + 2500;

                                        }
                                    } else {


                                        if (distanceplay <= entity_1.radius + entity_2.radius) {
                                            new collisiondynamic(entities, entity_2, entity_1, false, distanceplay)

                                        }
                                    }
                                }
                            }
                        }

                        if (entity_1.type == 2 && !entity_1.isdead && entity_1.isplayer && entity_1.arenaid == 0) {

                            if (entity_2.type == 14 && entity_2.secondaryType == 76) {
                                if (entity_2.spawnedby2 != entity_1.id) {

                                    if (distanceplay <= (entity_1.radius + entity_2.radius)) {
                                        entity_1.hp -= 20
                                        entity_1.timerfrozen = Date.now() + 3000

                                        entity_2.killerid = entity_1.id
                                        entity_2.isdead = true
                                        new death(entities, entity_1.id, entity_2.spawnedby2)

                                    }
                                }
                            }
                            if (entity_2.type == 14 && entity_2.secondaryType == 81) {
                                if (entity_2.speartype == "Spear") {
                                    if (entity_2.specType != 2 && entity_2.specType != 3) {
                                        if (entity_2.spawnedby2 != entity_1.id) {

                                            if (distanceplay <= (entity_1.radius + entity_2.radius)) {
                                                entity_1.hp -= 20
                                                entity_1.timerbleeding = Date.now() + 4300
                                                entity_2.spawnedtime = Date.now() - 300
                                                entity_2.specType = 3
                                                entity_2.veloX = 0
                                                entity_2.veloY = 0
                                                entity_2.victimID = entity_1.id
                                                new collisiondynamic(entities, entity_2, entity_1, "objtest", distanceplay, 20)

                                                new death(entities, entity_1.id, entity_2.spawnedby2)
                                            }
                                        }
                                    }
                                }
                            }
                            if (entity_1.timerstunned <= Date.now()) {

                                if (entity_2.type == 14 && entity_2.secondaryType == 51) {
                                    if (entity_2.spawnedby2 != entity_1.id) {

                                        if (distanceplay <= (entity_1.radius + entity_2.radius)) {
                                            entity_1.hp -= 20
                                            entity_1.timerstunned = Date.now() + 2000

                                            new collisiondynamic(entities, entity_2, entity_1, "objtest", distanceplay, 50)

                                            new death(entities, entity_1.id, entity_2.spawnedby2)
                                        }
                                    }
                                }
                            }
                        }





                        if (entity_2.type == 21 && (entity_1.type == 18 || entity_1.type == 70)) {
                            if (distanceplay <= (entity_1.radius + entity_2.radius)) {
                                entity_2.isdead = true
                            }
                        }
                        if (entity_1.class == "Food") {
                            if (entity_2.type == 10) {
                                if (distanceplay <= entity_2.radius + entity_1.radius) {
                                    new collisiondynamic(entities, entity_2, entity_1, "objtest", distanceplay, 50)
                                }
                            }
                            if (entity_2.type == 4 || entity_2.type == 27) {
                                if (distanceplay <= entity_2.radius + entity_1.radius) {
                                    new collisiondynamic(entities, entity_2, entity_1, false, distanceplay)
                                }
                            }
                        }
                        if (entity_2.class == "Food" && !entity_2.isdead) {

                            if (entity_1.type == 2 && !entity_1.isdead && entity_1.isplayer && entity_1.arenaid == 0) {



                                if (distanceplay <= entity_2.radius + entity_1.radius) {
                                    if (entity_1.foods.includes(entity_2.type)) {
                                        if (entity_2.type == 21 && entity_1.bar.normalbar != 0) return

                                        entity_2.isdead = true
                                        entity_2.killerid = entity_1.id
                                        if (entity_1.bar.normalbar != 1 && entity_1.bar.normalbar != 2) {
                                            if (entity_1.bar.normalbar == 0) {
                                                entity_1.bar.normalbarpercentage += entity_2.water
                                            } else if (entity_1.bar.normalbar == 3) {
                                                entity_1.bar.normalbarpercentage += entity_2.energy
                                            }
                                        }
                                        entity_1.xp += entity_2.xp * entity_1.tier

                                    } else {
                                        if (entity_2.collideable) {
                                            if (distanceplay <= entity_1.radius + entity_1.radius) {
                                                new collisiondynamic(entities, entity_1, entity_2, false, distanceplay)
                                            }
                                        }
                                    }
                                }


                            }
                        }

                        if (entity_2.type == 72) {

                            if (entity_1.type == 2 || entity_1.class == 'Food') {

                                if (entity_1.id != entity_2.spawnedby2) {

                                    if (distanceplay <= entity_2.radius + entity_1.radius) {
                                        entity_2.timerburned = Date.now() + 2000;
                                        entity_2.lasthitby = entity_1.id
                                        new collisiondynamic(entities, entity_2, entity_1, true, distanceplay)
                                    }
                                    if (entity_2.class == 'Food') {
                                        if (entities[entity_1.spawnedby2] != undefined) {
                                            if (!entities[entity_1.spawnedby2].isdead) {
                                                if (distanceplay <= entity_1.radius / 10) {

                                                    entities[entity_1.spawnedby2].xp += entity_2.xp
                                                    if (entity_1.playerbar == 0) {
                                                        entities[entity_1.spawnedby2].bar.normalbarpercentage += entity_2.water
                                                    }
                                                    entity_2.killerid = entity_1.id
                                                    entity_2.isdead = true
                                                    entity_2.xp = 0
                                                    entity_2.water = 0
                                                }
                                            }
                                        }
                                    }


                                }
                            }
                        }

                        if (entity_2.type == 71 && entity_1.type == 18) {
                            if (entity_2.spawnedby2 != entity_1.spawnedby2) {

                                if (distanceplay <= entity_2.radius + entity_1.radius) {
                                    entity_2.hp -= 30
                                    entity_1.isdead = true
                                    entity_1.killerid = entity_2.id

                                }
                            }
                        }

                        if (entity_2.type == 14 && entity_2.secondaryType == 28) {

                            if (entity_1.spawnedby2 != entity_2.spawnedby2) {

                                if ((entity_1.type == 2 && !entity_1.isdead && entity_1.isplayer && entity_1.arenaid == 0 || entity_1.class == "Food")) {

                                    if (entity_2.spawnedby2 != entity_1.id) {



                                        if (distanceplay <= entity_2.radius + entity_1.radius) {
                                            let pos = util.rotate(entity_2.x, entity_2.y, entity_2.x - entity_1.speed, entity_2.y, entity_1.angle)
                                            if (entity_2.type == 2 && !entity_2.isdead && entity_2.isplayer && entity_2.arenaid == 0 || entity_2.type == 64) {
                                                let newx = entity_2.pos.x - pos.x
                                                let newy = entity_2.pos.y - pos.y
                                                entity_2.pos.x -= newx
                                                entity_2.pos.y -= newy
                                            } else {
                                                let newx = entity_2.x - pos.x
                                                let newy = entity_2.y - pos.y
                                                entity_2.x -= newx
                                                entity_2.y -= newy

                                            }
                                        }
                                    }


                                }
                            }

                        }
                        if (entity_1.class == "Food" || entity_1.type == 27 || entity_1.type == 4 || entity_1.type == 19 || entity_1.type == 87) {

                            if (entity_2.type == 3) {


                                if (distanceplay <= entity_2.radius + entity_1.radius) {
                                    new collisiondynamic(entities, entity_2, entity_1, false, distanceplay)
                                }
                            }


                        }

                        if (entity_2.type == 14 && entity_2.secondaryType == 63 || entity_2.type == 14 && entity_2.secondaryType == 5) {

                            if (entity_1.type == 2 && !entity_1.isdead && entity_1.isplayer && entity_1.arenaid == 0 || entity_1.class == 'Food') {

                                if (entity_2.spawnedby2 != entity_1.id) {



                                    if (distanceplay <= entity_2.radius + entity_1.radius) {
                                        if (entity_1.type == 2 && !entity_1.isdead && entity_1.isplayer && entity_1.arenaid == 0 && entity_1.biome == 1 || entity_1.class == 'Food') {
                                            new collisiondynamic(entities, entity_2, entity_1, true, distanceplay)
                                            if (entity_2.type == 14 && entity_2.secondaryType == 5) {
                                                if (entity_1.type == 2 && !entity_1.isdead && entity_1.isplayer && entity_1.arenaid == 0) {
                                                    if (entity_1.damage != 0) {
                                                        if (entity_1.timerstunned <= Date.now()) {
                                                            entity_1.hp -= entity_2.damage

                                                            entity_1.timerstunned = Date.now() + 3000
                                                            new death(entities, entity_1.id, entity_2.spawnedby2)
                                                        }
                                                    }
                                                }
                                            }
                                        }

                                    }

                                    if (entity_2.class == 'Food') {
                                        if (entities[entity_1.spawnedby2] != undefined) {
                                            if (!entities[entity_1.spawnedby2].isdead) {
                                                if (distanceplay <= entity_1.radius / 10) {

                                                    entities[entity_1.spawnedby2].xp += entity_2.xp
                                                    if (entity_1.playerbar == 0) {
                                                        entities[entity_1.spawnedby2].bar.normalbarpercentage += entity_2.water
                                                    }
                                                    entity_2.killerid = entity_1.id
                                                    entity_2.isdead = true
                                                    entity_2.xp = 0
                                                    entity_2.water = 0

                                                }
                                            }
                                        }
                                    }



                                }
                            }
                        }
                        if (entity_2.type == 87) {
                            if (entity_1.speartype == "Spear" && entity_1.type == 14 && entity_1.secondaryType == 81 && entity_1.specType == 0 && entity_1.spawnedtime + 1000 <= Date.now()) {
                                if (entity_2.spawnedby2 != entity_1.spawnedby2) {
                                    if (distanceplay <= entity_2.radius + entity_1.radius) {
                                        entity_1.isdead = true
                                        entity_1.killerid = entity_2.id
                                    }
                                }
                            }
                        }
                        if (entity_1.type == 2) {
                            if (entity_2.type == 87) {
                                if (distanceplay <= entity_2.radius + entity_1.radius) {
                                    new collisiondynamic(entities, entity_1, entity_2, false, distanceplay)
                                }
                            }
                            if (entity_2.type == 14 && entity_2.secondaryType == 32) {
                                if (entity_2.spawnedby2 != entity_1.id) {

                                    if (distanceplay <= entity_2.radius + entity_1.radius) {

                                        if (entity_1.timerstunned <= Date.now()) {

                                            entity_1.hp -= 40
                                            entity_1.timerstunned = Date.now() + 2000;
                                            new collisiondynamic(entities, entity_1, entity_2, "tailslap", 2, 50 + entity_2.radius)
                                            new death(entities, entity_1.id, entity_2.spawnedby2)



                                        }
                                    }
                                }
                            }
                        }
                        if (entity_1.type == 2 || entity_1.class == 'Food') {//Player collide

                            if (entity_2.type == 14 && entity_2.secondaryType == 31) {
                                if (entity_2.spawnedby2 != entity_1.id) {

                                    if (distanceplay <= entity_2.radius + entity_1.radius) {
                                        if (entity_1.type == 2) {
                                            if (entity_1.timerstunned <= Date.now()) {

                                                entity_1.hp -= 25
                                                entity_1.timerstunned = Date.now() + 2000;
                                                new collisiondynamic(entities, entity_2, entity_1, "objtest", distanceplay, 100)
                                                new death(entities, entity_1.id, entity_2.spawnedby2)

                                            }
                                        } else if (entity_1.class == 'Food') {
                                            if (entities[entity_2.spawnedby2]) {
                                                if (entities[entity_2.spawnedby2].foods.includes(entity_1.type)) {
                                                    entity_1.isdead = true
                                                    entity_1.killerid = entities[entity_2.spawnedby2].id
                                                    if (entities[entity_2.spawnedby2].bar.normalbar != 1 && entities[entity_2.spawnedby2].bar.normalbar != 2) {
                                                        if (entities[entity_2.spawnedby2].bar.normalbarpercentage == 0) {
                                                            entities[entity_2.spawnedby2].bar.normalbarpercentage += entity_1.water
                                                        } else if (entities[entity_2.spawnedby2].bar.normalbar == 3) {
                                                            entities[entity_2.spawnedby2].bar.normalbarpercentage += entity_1.energy
                                                        }
                                                    }
                                                    entities[entity_2.spawnedby2].xp += entity_1.xp

                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        if (entity_1.type == 2) {//Player collide
                            if (entity_2.type == 14 && entity_2.secondaryType == 3) {
                                if (entity_2.spawnedby2 != entity_1.id) {

                                    if (entity_1.timerstunned <= Date.now()) {

                                        if (distanceplay <= entity_2.radius + entity_1.radius) {
                                            entity_1.hp -= entity_2.damage
                                            entity_1.timerstunned = Date.now() + entity_2.stuntime;

                                            new death(entities, entity_1.id, entity_2.spawnedby2)
                                        }
                                    }

                                }
                            }
                            if (entity_2.type == 19) {
                                if (entity_2.spawnedby2 != entity_1.id) {



                                    if (distanceplay <= entity_2.radius + entity_1.radius) {
                                        entity_1.hp -= 15
                                        entity_1.timerfrozen = Date.now() + 2000;
                                        entity_2.isdead = true
                                        entity_1.lasthitby = entity_2.spawnedby2
                                        new death(entities, entity_1.id, entity_2.spawnedby2)

                                    }

                                }
                            }
                            if (entity_2.type == 14 && entity_2.secondaryType == 11) {
                                if (entity_1.timerfrozen <= Date.now()) {
                                    if (entity_2.spawnedby2 != entity_1.id) {


                                        if (distanceplay <= entity_2.radius + entity_1.radius) {
                                            entity_1.hp -= 20
                                            entity_1.timerfrozen = Date.now() + 2000;

                                            new death(entities, entity_1.id, entity_2.spawnedby2)
                                        }

                                    }

                                }
                            }

                            if (entity_2.type == 14 && entity_2.secondaryType == 74) {

                                if (entity_2.spawnedby2 != entity_1.id) {
                                    if (entity_1.timerstunned <= Date.now() && entity_1.timerfrozen <= Date.now()) {

                                        if (distanceplay <= entity_2.radius + entity_1.radius) {

                                            entity_1.timerstunned = Date.now() + 3000
                                            let difference = entity_1.angle - entity_2.angle;
                                            while (difference < -180) difference += 360;
                                            while (difference > 180) difference -= 360;

                                            if (difference < 0) {
                                                difference = -difference
                                            }

                                            if (difference >= 80) {
                                                difference = 80
                                            }
                                            if (difference <= 30) {
                                                difference = 30
                                            }
                                            entity_1.hp -= 2000 / difference

                                            new death(entities, entity_1.id, entity_2.spawnedby2)
                                            new collisiondynamic(entities, entity_1, entity_2, "tailslap", 2, 100 + entity_2.radius)
                                        }
                                    }

                                }

                            }




                            if (entity_2.type == 18 || entity_2.type == 70) {
                                if (entity_2.spawnedby2 != entity_1.id) {
                                    if (distanceplay <= entity_2.radius + entity_1.radius) {

                                        if (entity_2.type == 70) {
                                            entity_1.hp -= 1

                                            if (entity_1.whichbiome != 5 && entity_1.whichbiome != 6 && entity_1.whichbiome != 3) {
                                                entity_1.timerburned = Date.now() + 4000;
                                            } else {
                                                entity_1.timerburned = Date.now() + 1000;
                                            }

                                            entity_2.isdead = true
                                            entity_1.lasthitby = entity_2.spawnedby2
                                            entity_2.killerid = entity_1.id
                                            new death(entities, entity_1.id, entity_2.spawnedby2)

                                        } else {



                                            if (entity_1.timerburned <= Date.now()) {
                                                entity_1.hp -= 20

                                                entity_2.isdead = true
                                                entity_1.lasthitby = entity_2.spawnedby2
                                                entity_2.killerid = entity_1.id

                                            } else {
                                                if (entity_1.timerburned - 500 <= Date.now()) {
                                                    entity_1.hp -= 5


                                                    entity_2.isdead = true
                                                    entity_1.lasthitby = entity_2.spawnedby2
                                                    entity_2.killerid = entity_1.id

                                                }
                                            }



                                            if (entity_1.whichbiome != 5 && entity_1.whichbiome != 6 && entity_1.whichbiome != 3) {
                                                entity_1.timerburned = Date.now() + 4000;
                                            } else {
                                                entity_1.timerburned = Date.now() + 1000;
                                            }


                                            new death(entities, entity_1.id, entity_2.spawnedby2)
                                        }
                                    }

                                }


                            }



                            if (entity_2.type == 3) {
                                if (!entity_1.flags.includes(26)) {
                                    if (distanceplay <= entity_2.radius + entity_1.radius) {
                                        new collisiondynamic(entities, entity_1, entity_2, false, distanceplay)
                                    }
                                }

                            }
                        }
                    }//Player collide

                }
            }

        }
    }

}







collisions.prototype = {}
module.exports = collisions