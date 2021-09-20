const vector = require('victor');
const utils1 = require("../../../modules/IMPmodules/util")
const biomepos = require("../../../playergameplay/newbiomepos");
const animalswitcher = require("../../../playergameplay/animalswitch.js");
const tierswitcher = require("../../../playergameplay/tierswitch.js");
const apexchoices = require("../../../playergameplay/choices/choices")
const holdingobj = require("../../../playergameplay/abilitiesuse/abilitiesholdbutton")
const tierload1 = require("../../../playergameplay/choices/tierschoice")
const tierload = new tierload1()


const player = require("../../../entity/objects/objects/player.js")
const util = new utils1()

const game1 = require("../../../game");

const game = new game1()

function normalplayercheck(aobjids, ws_new, entities, i, writer) {




    if (entities[i].type == 14 && entities[i].secondaryType == 68) {
        if (entities[i].state != 2) {
            if (entities[entities[i].p2id] != undefined) {
                if (entities[entities[i].p1id] != undefined) {
                    if (entities[i].state == 0) {

                        entities[entities[i].p1id].pos.x = entities[i].x - 150
                        entities[entities[i].p1id].pos.y = entities[i].y
                        entities[entities[i].p2id].pos.x = entities[i].x + 150
                        entities[entities[i].p2id].pos.y = entities[i].y
                    }
                } else {

                    if (entities[i].state != 2) {
                        entities[i].winner = 2
                        entities[i].state = 2
                        setTimeout(() => {
                            if (entities[i] != undefined) {
                                if (entities[entities[i].p2id] != undefined) {
                                    var delO = 33; //delete possible dying object from game
                                    var tmp = entities[entities[i].p2id].flags.indexOf(delO); //remove from game arrays
                                    if (-1 != tmp) {
                                        entities[entities[i].p2id].flags.splice(tmp, 1);
                                    }
                                    entities[entities[i].p2id].arenaid = 0
                                }
                                entities[i].isdead = true
                            }
                        }, 10000);
                    }
                }
            } else {
                if (entities[i].state != 2) {

                    entities[i].winner = 1
                    entities[i].state = 2
                    setTimeout(() => {
                        if (entities[i] != undefined) {
                            if (entities[entities[i].p1id] != undefined) {
                                var delO = 33; //delete possible dying object from game
                                var tmp = entities[entities[i].p1id].flags.indexOf(delO); //remove from game arrays
                                if (-1 != tmp) {
                                    entities[entities[i].p1id].flags.splice(tmp, 1);
                                }
                                entities[entities[i].p1id].arenaid = 0

                            }
                            entities[i].isdead = true
                        }
                    }, 10000);
                }
            }
        }
    }
    if (entities[i].type == 2 || entities[i].type == 64) {

        if (entities[i].isboosting) {

            if (entities[i].boostingat === 0) {

                var dy = entities[i].y - entities[i].mousey;
                var dx = entities[i].x - entities[i].mousex;
                var theta = Math.atan2(dy, dx);// range (-PI, PI]
                theta *= 180 / Math.PI; // rads to degs, range (-180, 180]
                if (theta < 0) {
                    theta += 360;
                }
                entities[i].boosttheta = theta
            }

            entities[i].boostingat++
            let speed = (entities[i].speed * 10) / entities[i].boostingat

            let newpos = util.rotate(0, 0, 0 + speed, 0, entities[i].boosttheta)

            entities[i].pos.x -= newpos.x
            entities[i].pos.y -= newpos.y
            if (entities[i].boostingat >= 8) {
                entities[i].boostingat = 0
                entities[i].isboosting = false
            }

        }
        //  console.log(entities[i])
        if (entities[i].type == 2) {
            let customwitch = 0
            if (entities[i].abilitys.button_w.abil_currentclick == 1) {
                customwitch = new holdingobj(aobjids, i, entities, writer, ws_new)
            }
            if (entities[i].abilitys.button_w_mini.abil_Type == 100) {
                if ((((entities[i].bar.normalbar == 0 && entities[i].biome != 1 || entities[i].bar.normalbar == 2 && entities[i].biome != 3))
                    || (entities[i].bar.airbarpercentage == 0.01) || (entities[i].isintree || entities[i].isflying)) && entities[i].isdiving) {
                    entities[i].abilitys.button_w_mini.abil_active = false
                    entities[i].abilitys.button_w_mini.abil_recharging = true
                    entities[i].abilitys.button_w_mini.abil_timestamp = Date.now() + entities[i].abilitys.button_w_mini.abil_time * 1000;
                    entities[i].isdiving = false

                    if (entities[i].ws) {
                        entities[i].ws.send(writer.abilitytimer(entities[i].abilitys, 0))
                    }
                }
                if (entities[i].abilitys.button_w_mini.abil_currentclick == 0) {
                    if (entities[i].isdiving) {
                        entities[i].abilitys.button_w_mini.abil_active = false
                        entities[i].abilitys.button_w_mini.abil_recharging = true
                        entities[i].abilitys.button_w_mini.abil_timestamp = Date.now() + entities[i].abilitys.button_w_mini.abil_time * 1000;
                        entities[i].isdiving = false

                        if (entities[i].ws) {
                            entities[i].ws.send(writer.abilitytimer(entities[i].abilitys, customwitch))
                        }
                    }
                }
            }
        }



        if (entities[i].holdboost) {
            if (!entities[i].isdead) {
                if (entities[i].type == 2 && !entities[i].flags.includes(3) || entities[i].type == 64) {
                    if (entities[i].timerfrozen <= Date.now() && entities[i].timerstunned <= Date.now()) {
                        if (entities[i].isabletoboost) {
                            if (!entities[i].isflying) {
                                if (entities[i].whenboost) {
                                    entities[i].boostingat = 0
                                    entities[i].whenboost = false
                                    entities[i].isboosting = true
                                    entities[i].isinboostingang = true
                                    entities[i].bar.normalbarpercentage -= 3



                                    setTimeout(() => {
                                        if (!entities[i]) return
                                        if (entities[i].isdead) return;
                                        entities[i].isinboostingang = false
                                    }, 250);
                                    setTimeout(
                                        function () {
                                            if (!entities[i]) return
                                            if (entities[i].isdead) return;
                                            entities[i].whenboost = true
                                        }, 1500);
                                    //   setTimeout(function(){ 		entities[i].isboosting = true  }, 100);
                                }
                            }
                        }
                    }
                }
            } else {
                try {
                    clearTimeout(holdboosting)
                } catch {

                }
            }
        }
    }


    if (entities[i].type == 2) {

        if (entities[i].secondaryType != entities[i].lastani) {

            entities[i].lastani = entities[i].secondaryType
            if (!entities[i].isbot) {
                let oldplayer = entities[i]

                let newid = aobjids.giveid(true)

                let newplayer = new player(entities[i].ws, newid, new vector(entities[i].pos.x, entities[i].pos.y), entities[i].name)
                newplayer.xp = oldplayer.xp
                newplayer.secondaryType = oldplayer.secondaryType
                newplayer.lastani = oldplayer.lastani
                newplayer.biome = oldplayer.biome
                newplayer.angle = oldplayer.angle
                newplayer.whichbiome = oldplayer.whichbiome
                newplayer.spawnbiome = oldplayer.spawnbiome
                newplayer.colorname = oldplayer.colorname
                newplayer.infability = oldplayer.infability
                newplayer.species = oldplayer.species

                new biomepos(entities, newplayer)

                entities[newplayer.id] = newplayer

                entities[newplayer.id].ws = entities[i].ws
                entities[i].ws.player = entities[newplayer.id]
                entities[i].isdead = true


                entities[i].ws.player = newplayer

                new animalswitcher(entities[newplayer.id].ws.player)
                new tierswitcher(entities[newplayer.id].ws.player, writer, entities[newplayer.id].ws.player.id)


            } else {
                new biomepos(entities, entities[i])
                new animalswitcher(entities[i])
                new tierswitcher(entities[i], writer, entities[i].id)

            }

        }

        if (!entities[i].isbot) {
            if (entities[i].isplayer) {

                if (!entities[i].isupgrading) {
                    if (entities[i].lasthitsec == 0) {


                        if (entities[i].xp >= entities[i].nextxp) {
                            if (entities[i].tier < 14) {
                                if (entities[i].xp >= 1000000) {
                                    entities[i].choiceid = util.randomIntNumber(0, 999999999999)
                                    let ider = entities[i].choiceid
                                    entities[i].isupgrading = true
                                    entities[i].animals = tierload.tier14(false)
                                    if (game.load(2) == 1) {
                                        entities[i].ws.send(writer.choice(0, 0, entities[i].animals))
                                    } else {
                                        entities[i].ws.send(writer.choice(0, game.load(5), entities[i].animals))
                                        setTimeout(() => {
                                            if (entities[i] != undefined) {
                                                if (entities[i].choiceid != ider) return;
                                                entities[i].ws.send(writer.choice(5, 0, []))
                                                entities[i].secondaryType = entities[i].animals[0]
                                                new apexchoices(entities[i], 0, entities[i].animals, 0, entities, false)
                                            }

                                        }, game.load(5) * 1000);
                                    }
                                }
                            }
                            if (entities[i].tier < 15) {

                                if (entities[i].xp >= 10000000) {
                                    entities[i].choiceid = util.randomIntNumber(0, 999999999999)
                                    let ider = entities[i].choiceid
                                    entities[i].isupgrading = true
                                    entities[i].animals = tierload.tier15(false)
                                    if (game.load(2) == 1) {
                                        entities[i].ws.send(writer.choice(0, 0, entities[i].animals))
                                    } else {
                                        entities[i].ws.send(writer.choice(0, game.load(5), entities[i].animals))
                                        setTimeout(() => {
                                            if (entities[i] != undefined) {
                                                if (entities[i].choiceid != ider) return;
                                                entities[i].ws.send(writer.choice(5, 0, []))

                                                entities[i].secondaryType = entities[i].animals[0]
                                                new apexchoices(entities[i], 0, entities[i].animals, 0, entities, false)
                                            }

                                        }, game.load(5) * 1000);
                                    }
                                }
                            }
                            if (entities[i].tier < 16) {
                                if (entities[i].xp >= 30000000) {
                                    entities[i].choiceid = util.randomIntNumber(0, 999999999999)
                                    let ider = entities[i].choiceid
                                    entities[i].isupgrading = true
                                    entities[i].animals = tierload.tier16(false)
                                    if (game.load(2) == 1) {
                                        entities[i].ws.send(writer.choice(0, 0, entities[i].animals))
                                    } else {
                                        entities[i].ws.send(writer.choice(0, game.load(5), entities[i].animals))
                                        setTimeout(() => {
                                            if (entities[i] != undefined) {
                                                if (entities[i].choiceid != ider) return;
                                                entities[i].ws.send(writer.choice(5, 0, []))
                                                entities[i].secondaryType = entities[i].animals[0]
                                                new apexchoices(entities[i], 0, entities[i].animals, 0, entities, false)
                                            }

                                        }, game.load(5) * 1000);
                                    }
                                }

                            }
                        }
                    }
                }
            }

        }
    }






    if (entities[i].type == 2) {

        if (entities[i].isloaded) {
            entities[i].angles.anglenewspeed = entities[i].angles.anglespeed
            if (!entities[i].flags.includes(33)) {

                if (entities[i].isflying && entities[i].speeds.flyspeed) {
                    entities[i].speed = entities[i].speeds.flyspeed

                } else {
                    if (entities[i].biome == 0 || entities[i].biome == 4) {
                        entities[i].speed = entities[i].speeds.landspeed
                    } else if (entities[i].biome == 1) {

                        entities[i].speed = entities[i].speeds.oceanspeed
                    } else if (entities[i].biome == 2) {
                        entities[i].speed = entities[i].speeds.arcticspeed

                    } else if (entities[i].biome == 3) {
                        if (entities[i].whichbiome != 5 && entities[i].whichbiome != 6 && entities[i].whichbiome != 3) {


                            entities[i].timerburned = Date.now() + 3000;

                        }
                        entities[i].speed = entities[i].speeds.lavaspeed
                    }
                }


            } else {
                entities[i].speed = 2.5
            }
            if (entities[i].timerfrozen <= Date.now() && entities[i].timerstunned <= Date.now()) {
                if (entities[i].usingability) {
                    switch (entities[i].secondaryType) {
                        case 80:
                            entities[i].speed /= 3
                            entities[i].angles.anglenewspeed /= 3
                            break
                        case 73:
                            entities[i].speed *= entities[i].speeds.flyspeed
                            break
                        case 24:
                            entities[i].speed /= 8
                            break
                        case 32:
                            entities[i].speed /= 8
                            break
                        case 48:
                        case 49:
                            entities[i].speed /= 3
                            break
                        case 77:

                            switch (entities[i].specType) {
                                case 3:

                                    entities[i].speed *= 4
                                    break
                                case 2:
                                    if (entities[i].flags.includes(21)) {
                                        entities[i].speed /= 1.2
                                    }
                                    break
                            }
                            break;
                        case 76:
                            switch (entities[i].specType) {
                                case 2:
                                    entities[i].speed *= 3
                                    break
                                case 3:
                                    entities[i].speed /= 2
                                    break
                            }
                            break;
                        case 78:

                            switch (entities[i].specType) {
                                case 1:
                                    entities[i].speed /= 3
                                    break
                            }

                            break
                    }
                }
            } else {
                entities[i].speed /= 4
            }

            if (entities[i].isdiving) {
                entities[i].speed = entities[i].speed / 1.75

            }
            if (entities[i].isinhole) {

                if (!entities[i].flags.includes(17)) {
                    entities[i].flags.push(17)

                }
            } else {
                if (entities[i].flags.includes(17)) {

                    var delO = 17
                    var tmp = entities[i].flags.indexOf(delO); //remove from game arrays
                    if (-1 != tmp) {
                        entities[i].flags.splice(tmp, 1);
                    }

                }

            }
            if (entities[i].isflying) {
                entities[i].bar.normalbarpercentage -= 0.15
                if (!entities[i].flags.includes(19)) {
                    entities[i].flags.push(19)

                }
            } else {
                if (entities[i].flags.includes(19)) {

                    var delO = 19
                    var tmp = entities[i].flags.indexOf(delO); //remove from game arrays
                    if (-1 != tmp) {
                        entities[i].flags.splice(tmp, 1);
                    }

                }

            }

            if (entities[i].usingability) {
                if (!entities[i].flags.includes(7)) {
                    entities[i].flags.push(7)

                }
            } else {
                if (entities[i].flags.includes(7)) {

                    var delO = 7
                    var tmp = entities[i].flags.indexOf(delO); //remove from game arrays
                    if (-1 != tmp) {
                        entities[i].flags.splice(tmp, 1);
                    }

                }
            }
            if (entities[i].invincible) {
                if (!entities[i].flags.includes(6)) {
                    entities[i].flags.push(6)

                }
            } else {
                if (entities[i].flags.includes(6)) {

                    var delO = 6
                    var tmp = entities[i].flags.indexOf(delO); //remove from game arrays
                    if (-1 != tmp) {
                        entities[i].flags.splice(tmp, 1);
                    }

                }
            }

            if (entities[i].biome == 1) {
                if (entities[i].bar.normalbar == 0) {
                    if (!entities[i].isflying) {
                        if (!entities[i].isintree) {
                            entities[i].bar.normalbarpercentage += 0.3
                        }
                    }
                }
                if (!entities[i].flags.includes(1)) {
                    entities[i].flags.push(1)

                    deletethem = [0, 2, 25]
                    for (let a = 0; a < deletethem.length; a++) {
                        var delO = deletethem[a]
                        var tmp = entities[i].flags.indexOf(delO); //remove from game arrays
                        if (-1 != tmp) {
                            entities[i].flags.splice(tmp, 1);
                        }
                    }

                }

            } else if (entities[i].biome == 2) {
                if (!entities[i].flags.includes(2)) {
                    entities[i].flags.push(2)

                    deletethem = [0, 1, 25]
                    for (let a = 0; a < deletethem.length; a++) {
                        var delO = deletethem[a]
                        var tmp = entities[i].flags.indexOf(delO); //remove from game arrays
                        if (-1 != tmp) {
                            entities[i].flags.splice(tmp, 1);
                        }
                    }

                }
            } else if (entities[i].biome == 0) {
                if (!entities[i].flags.includes(0)) {
                    entities[i].flags.push(0)

                    deletethem = [2, 1, 25]
                    for (let a = 0; a < deletethem.length; a++) {
                        var delO = deletethem[a]
                        var tmp = entities[i].flags.indexOf(delO); //remove from game arrays
                        if (-1 != tmp) {
                            entities[i].flags.splice(tmp, 1);
                        }
                    }

                }
            } else if (entities[i].biome == 3 || entities[i].biome == 4) {
                if (entities[i].bar.normalbar == 2) {
                    if (!entities[i].isflying) {
                        entities[i].bar.normalbarpercentage += 0.02
                    }
                }
                if (!entities[i].flags.includes(25)) {
                    entities[i].flags.push(25)

                    deletethem = [2, 1, 0]
                    for (let a = 0; a < deletethem.length; a++) {
                        var delO = deletethem[a]
                        var tmp = entities[i].flags.indexOf(delO); //remove from game arrays
                        if (-1 != tmp) {
                            entities[i].flags.splice(tmp, 1);
                        }
                    }

                }
            }
        }
    }
    if (entities[i].type == 34) {
        if (entities[entities[i].spawnedby2]) {
            if (entities[i].x > entities[entities[i].spawnedby2].x - entities[entities[i].spawnedby2].width / 2) {
                entities[i].x += 10
            }
            if (entities[i].x < entities[entities[i].spawnedby2].x + entities[entities[i].spawnedby2].width / 2) {
                entities[i].x -= 10
            }
            if (entities[i].y > entities[entities[i].spawnedby2].y - entities[entities[i].spawnedby2].height / 2) {
                entities[i].y += 10
            }
            if (entities[i].y < entities[entities[i].spawnedby2].y + entities[entities[i].spawnedby2].height / 2) {
                entities[i].y -= 10
            }
        }
    }






}
normalplayercheck.prototype = {

}
module.exports = normalplayercheck
