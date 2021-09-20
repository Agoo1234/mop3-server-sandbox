const foodspawn = require('./worldupdate/foodspawn')
const timecheck = require('./timecheck')
const game1 = require('../game')
const deathhandle = require('./deathhandle')
const game = new game1()
const writer1 = require("../modules/IMPmodules/writer.js");
const writer = new writer1();
const utils1 = require("../modules/IMPmodules/util");
const util = new utils1()


function basehandle(entities, player, aobjids, serverstarted, ws_news) {
    new timecheck(entities, player, aobjids, ws_news)

    if (serverstarted) new foodspawn(entities, player, aobjids);

    if (entities[player].type == 4 || entities[player].type == 10 || entities[player].type == 27 || entities[player].type == 87) {
        if (entities[player].biome == 1) {
            if (entities[player].type != 10) {
                entities[player].isdead = true
            }
            return
        }
    }


    if (!entities[player].isbiome) {
        if (entities[player].pos) {
            entities[player].pos.x += entities[player].veloX
            entities[player].pos.y += entities[player].veloY
        }
        entities[player].x += entities[player].veloX
        entities[player].y += entities[player].veloY

    }

    if (entities[player].pos) {

        let x = entities[player].x - entities[player].pos.x
        let y = entities[player].y - entities[player].pos.y
        if (x < 0) {
            x = -x
        }
        if (y < 0) {
            y = -y
        }
        entities[player].lastdistance = ((x + y) / 2)


        entities[player].x = entities[player].pos.x
        entities[player].y = entities[player].pos.y

    }
    if (entities[player].type == 14 && entities[player].secondaryType == 81 && entities[player].specType == 3) {
        if (entities[entities[player].victimID]) {
            entities[player].x = entities[entities[player].victimID].x
            entities[player].y = entities[entities[player].victimID].y
        } else {
            entities[player].isdead = true
        }
    }

    if (entities[player].type == 2 || entities[player].type == 64) {

        let testX = entities[player].mousex - entities[player].pos.x
        let testY = entities[player].mousey - entities[player].pos.y
        if (entities[player].canmoveangle) {

            entities[player].updateAngle({
                x: entities[player].mousex,
                y: entities[player].mousey,
            });
        }
        if (entities[player].canmove) {
            entities[player].updateMove(testX, testY)

        }

    }

    if (entities[player].type == 64 || entities[player].type == 2) {


        if (entities[player].isflying && entities[player].specType == 1) {
            if (entities[player].type == 2 && entities[player].secondaryType == 76) {
                if (entities[player].lastdistance < 1) {
                    if (entities[player].transparancy > 0) {
                        entities[player].transparancy -= 0.5
                    } else {
                        entities[player].transparancy = 0
                    }
                } else {
                    if (entities[player].transparancy < 100) {
                        entities[player].transparancy += 10
                    } else {
                        entities[player].transparancy = 100
                    }
                }

            }
        } else {
            entities[player].transparancy = 100
        }
        if (entities[player].type == 2 && entities[player].secondaryType == 79) {
            if (!entities[player].canUseTailslap) {

                entities[player].tailState -= 0.1
                if (entities[player].tailState <= 0) {
                    entities[player].tailState = 0
                    entities[player].canUseTailslap = true
                }
            }
        }

        if (entities[player].type == 64) {
            entities[player].tailfar = util.rotate(entities[player].pos.x, entities[player].pos.y, entities[player].pos.x + (entities[player].radius * 8), entities[player].pos.y, entities[player].angle);
        }
        if (entities[player].type == 2) {
            entities[player].mouth = util.rotate(entities[player].pos.x, entities[player].pos.y, entities[player].pos.x - (entities[player].radius), entities[player].pos.y, entities[player].angle);
        }
    }


    if (entities[player].type == 2) {



        if (entities[player]) {
            if (entities[player].isflying) {
                if (entities[player].goingsky) {
                    if (entities[player].z < 50) {
                        entities[player].z += (1.1 * entities[player].flyvelocity)
                    } else {
                        entities[player].z = 50
                    }
                } else {

                    if (entities[player].z > 0) {

                        entities[player].z -= (1.1 * entities[player].fallvelocity)
                    } else {
                        entities[player].z = 0
                    }

                }
            } else {
                if (entities[player].z > 0) {

                    entities[player].z = 0

                }
            }
            if (entities[player].arenaid == 0) {
                if (!entities[player].isdead) {
                    if (entities[player].timerbleeding >= Date.now()) {
                        if (entities[player].lastdamagebleeding <= Date.now()) {
                            entities[player].lastdamagebleeding = Date.now() + 1000
                            entities[player].hp -= 4
                        }
                    }
                    if (entities[player].timershivered >= Date.now()) {
                        if (entities[player].lastdamageshiver <= Date.now()) {
                            entities[player].lastdamageshiver = Date.now() + 2000
                            entities[player].hp -= 10
                        }
                    }
                    if (entities[player].timerburned >= Date.now()) {
                        if (entities[player].lastdamageburned <= Date.now()) {
                            entities[player].lastdamageburned = Date.now() + 750
                            if (entities[player].biome != 3) {

                                entities[player].hp -= 3

                            } else {
                                if (entities[player].whichbiome != 5 && entities[player].whichbiome != 6 && entities[player].whichbiome != 3) {
                                    entities[player].hp -= 10
                                } else {

                                    entities[player].hp -= 3

                                }
                            }


                        }
                    }


                }
            }
        }




        if (entities[player].isflying) {
            if (entities[player].isintree) entities[player].isintree = false;
        }
        if (entities[player].arenaid != 0) {
            entities[player].bar.normalbarpercentage = entities[player].bar.maxbarnormalpercentage
        }

        if (!entities[player].flags.includes(33)) {


            let addradi = entities[player].addrad
            let normalradpercentageplayer = 0
            if (entities[player].xp < entities[player].oldupxp) {
                addradi = entities[player].lessrad
                normalradpercentageplayer = util.correctpercentage(entities[player].xp, entities[player].oldupxp)

                normalradpercentageplayer = normalradpercentageplayer - 100
                if (normalradpercentageplayer > -1) {
                    normalradpercentageplayer = -1
                }
                if (normalradpercentageplayer > -1) {
                    normalradpercentageplayer = -1
                }

            } else {
                normalradpercentageplayer = util.correctpercentage(entities[player].xp - entities[player].oldupxp, entities[player].nextxp - entities[player].oldupxp)

            }
            if (normalradpercentageplayer > 100) {
                normalradpercentageplayer = 100
            }
            entities[player].radius = entities[player].baserad + (addradi * normalradpercentageplayer)
            entities[player].radius += (entities[player].moreradius + (entities[player].treerad))
            entities[player].radius *= (1 + (entities[player].z / 50))
            if (entities[player].isinhole) {
                entities[player].radius /= 3;
            }
            if (entities[player].radius < 5) {
                entities[player].radius = 5
            }
            /*    var lava = entities[player].hp; //waterBarPerc_n;
                var minLowLava = entities[player].maxhp / 2;
                //console.log("lava: " + lava)
                if (lava < minLowLava) {
                    var curlava = (minLowLava - lava)
    
                }*/
        } else {
            entities[player].radius = 40
        }

        entities[player].tails = []
        entities[player].tails.push(util.rotate(entities[player].pos.x, entities[player].pos.y, entities[player].pos.x + entities[player].radius, entities[player].pos.y, entities[player].angle));
        entities[player].tails.push(util.rotate(entities[player].pos.x, entities[player].pos.y, entities[player].pos.x + entities[player].radius - (entities[player].radius / 5), entities[player].pos.y, entities[player].angle));
        entities[player].tails.push(util.rotate(entities[player].pos.x, entities[player].pos.y, entities[player].pos.x + entities[player].radius - ((entities[player].radius / 5) * 2), entities[player].pos.y, entities[player].angle));
        entities[player].tails.push(util.rotate(entities[player].pos.x, entities[player].pos.y, entities[player].pos.x + entities[player].radius - ((entities[player].radius / 5) * 3), entities[player].pos.y, entities[player].angle));
        entities[player].tails.push(util.rotate(entities[player].pos.x, entities[player].pos.y, entities[player].pos.x + entities[player].radius - ((entities[player].radius / 5) * 4), entities[player].pos.y, entities[player].angle));
        entities[player].tails.push(util.rotate(entities[player].pos.x, entities[player].pos.y, entities[player].pos.x, entities[player].pos.y, entities[player].angle));
        entities[player].tails.push(util.rotate(entities[player].pos.x, entities[player].pos.y, entities[player].pos.x - entities[player].radius + ((entities[player].radius / 5) * 4), entities[player].pos.y, entities[player].angle));
        entities[player].tails.push(util.rotate(entities[player].pos.x, entities[player].pos.y, entities[player].pos.x - entities[player].radius + ((entities[player].radius / 5) * 3), entities[player].pos.y, entities[player].angle));
        entities[player].tails.push(util.rotate(entities[player].pos.x, entities[player].pos.y, entities[player].pos.x - entities[player].radius + ((entities[player].radius / 5) * 2), entities[player].pos.y, entities[player].angle))

        if (!entities[player].angle) {

            entities[player].angle = 0
            entities[player].angles.oldangle = 0
            entities[player].angles.newangle = 0
            entities[player].angles.trueangle = 0
        }

        if (entities[player].type == 2 && entities[player].secondaryType == 72) {
            if (entities[player].crystals) {

                for (var i = 0; i < entities[player].crystals.length; i++) {
                    try {

                        var pos = util.rotate(0, 0, 0, 0 + entities[player].crystals[i].pos * (entities[player].radius), entities[player].crystals[i].angleswitcher);

                        var angles = util.anglebetween2point(0, (entities[player].radius), pos.x, pos.y)
                        angles = angles + 90
                        if (angles < 0) {
                            angles += 360
                        };
                        entities[player].crystals[i].angle = angles
                        let per = (entities[player].radius + (entities[player].isintree ? -10 : 0));

                        entities[player].crystals[i].rad = (per / 15) * entities[player].crystals[i].lvl
                        entities[player].crystals[i].x = pos.x / entities[player].radius;
                        entities[player].crystals[i].y = pos.y / entities[player].radius;
                        if (entities[player].crystals[i].lvl >= entities[player].crystals[i].maxlvl - (entities[player].crystals[i].maxlvl / 50)) {
                            entities[player].crystals[i].lvl = entities[player].crystals[i].maxlvl
                        } else {
                            entities[player].crystals[i].lvl += entities[player].crystals[i].maxlvl / 400
                        }

                    } catch (error) {

                    }
                }
            }

        }

        if (entities[player].flags.includes(33)) {
            if (entities[player].isdiving) {
                entities[player].isdiving = false

            }
        }
        if (entities[player].isgrabbed) {
            if (!entities[player].flags.includes(20)) {
                entities[player].flags.push(20)
            }
        } else {
            if (entities[player].flags.includes(20)) {
                var delO = 20; //delete possible dying object from game
                var tmp = entities[player].flags.indexOf(delO); //remove from game arrays
                if (-1 != tmp) {
                    entities[player].flags.splice(tmp, 1);
                }
            }
        }
        if (entities[player].isdiving || entities[player].secondaryType == 70 && entities[player].usingability) {
            if (!entities[player].flags.includes(5)) {
                entities[player].flags.push(5)
            }
        } else {
            if (entities[player].flags.includes(5)) {
                var delO = 5; //delete possible dying object from game
                var tmp = entities[player].flags.indexOf(delO); //remove from game arrays
                if (-1 != tmp) {
                    entities[player].flags.splice(tmp, 1);
                }
            }

        }
        if (entities[player].timerbleeding >= Date.now()) {
            if (!entities[player].flags.includes(18)) {
                entities[player].flags.push(18)
            }
        } else {
            if (entities[player].flags.includes(18)) {
                var delO = 18; //delete possible dying object from game
                var tmp = entities[player].flags.indexOf(delO); //remove from game arrays
                if (-1 != tmp) {
                    entities[player].flags.splice(tmp, 1);
                }
            }
        }
        if (entities[player].timershivered >= Date.now()) {
            if (!entities[player].flags.includes(35)) {
                entities[player].flags.push(35)
            }
        } else {
            if (entities[player].flags.includes(35)) {
                var delO = 35; //delete possible dying object from game
                var tmp = entities[player].flags.indexOf(delO); //remove from game arrays
                if (-1 != tmp) {
                    entities[player].flags.splice(tmp, 1);
                }
            }
        }
        if (entities[player].timerfrozen >= Date.now()) {
            if (!entities[player].flags.includes(11)) {
                entities[player].flags.push(11)
            }
        } else {
            if (entities[player].flags.includes(11)) {
                var delO = 11; //delete possible dying object from game
                var tmp = entities[player].flags.indexOf(delO); //remove from game arrays
                if (-1 != tmp) {
                    entities[player].flags.splice(tmp, 1);
                }
            }
        }
        if (entities[player].timerburned >= Date.now()) {

            if (!entities[player].flags.includes(12)) { entities[player].flags.push(12) }
        } else {
            if (entities[player].flags.includes(12)) {
                var delO = 12; //delete possible dying object from game
                var tmp = entities[player].flags.indexOf(delO); //remove from game arrays
                if (-1 != tmp) {
                    entities[player].flags.splice(tmp, 1);
                }
            }
        }
        if (entities[player].timerstunned >= Date.now()) {

            if (!entities[player].flags.includes(9)) {
                entities[player].flags.push(9)
            }
        } else {
            if (entities[player].flags.includes(9)) {
                var delO = 9; //delete possible dying object from game
                var tmp = entities[player].flags.indexOf(delO); //remove from game arrays
                if (-1 != tmp) {
                    entities[player].flags.splice(tmp, 1);
                }
            }
        }



        if (entities[player].isdiving) {
            entities[player].bar.airbarpercentage -= 0.25
            entities[player].bar.playerbar = 1
            entities[player].bar.barpercentage = entities[player].bar.airbarpercentage
            entities[player].bar.maxbarpercentage = entities[player].bar.maxairbarpercentage
        } else {
            entities[player].bar.airbarpercentage = entities[player].bar.maxairbarpercentage
            entities[player].bar.playerbar = entities[player].bar.normalbar
            entities[player].bar.barpercentage = entities[player].bar.normalbarpercentage
            entities[player].bar.maxbarpercentage = entities[player].bar.maxbarnormalpercentage
        }
        entities[player].abilitys.button_w_mini.abil_usable = true
        entities[player].abilitys.button_w.abil_usable = true
        if (entities[player].abilitys.button_w_mini.abil_recharging) {
            if (entities[player].abilitys.button_w_mini.abil_timestamp <= Date.now()) {
                entities[player].abilitys.button_w_mini.abil_recharging = false
                entities[player].abilitys.button_w_mini.abil_usable = true
            } else {
                entities[player].abilitys.button_w_mini.abil_usable = false
                entities[player].abilitys.button_w_mini.abil_recharging = true
                entities[player].abilitys.button_w_mini.abil_active = false
            }
        }
        if (entities[player].abilitys.button_w.abil_recharging) {
            if (entities[player].abilitys.button_w.abil_timestamp <= Date.now()) {
                entities[player].abilitys.button_w.abil_recharging = false
                entities[player].abilitys.button_w.abil_usable = true

            } else {
                entities[player].abilitys.button_w.abil_usable = false
                entities[player].abilitys.button_w.abil_recharging = true
                entities[player].abilitys.button_w.abil_active = false
            }
        }

        if (entities[player].abilitys.button_w.abil_usable && !entities[player].abilitys.button_w.abil_active) {
            let found = false
            for (let er in entities[player].abilitys.button_w.abil_noflags) {
                if (entities[player].flags.includes(entities[player].abilitys.button_w.abil_noflags[er])) {
                    found = true
                    break
                }
            }
            if (found) {
                entities[player].abilitys.button_w.abil_usable = false
            } else {
                entities[player].abilitys.button_w.abil_usable = true
            }

        }
        if (entities[player].abilitys.button_w_mini.abil_usable && !entities[player].abilitys.button_w_mini.abil_active) {
            let found = false
            for (let era in entities[player].abilitys.button_w_mini.abil_noflags) {

                if (entities[player].flags.includes(entities[player].abilitys.button_w_mini.abil_noflags[era])) {
                    found = true
                    break
                }
            }
            if (found) {
                entities[player].abilitys.button_w_mini.abil_usable = false
            } else {
                entities[player].abilitys.button_w_mini.abil_usable = true
            }

        }
        if (((entities[player].bar.maxbarnormalpercentage / entities[player].abilitys.button_w.abil_bardivideusable) >=
            entities[player].bar.normalbarpercentage) && !entities[player].abilitys.button_w.abil_active && entities[player].abilitys.button_w.abil_bardivideusable != 1
        ) {
            entities[player].abilitys.button_w.abil_usable = false
        }
        if (((entities[player].bar.maxbarnormalpercentage / entities[player].abilitys.button_w_mini.abil_bardivideusable) >=
            entities[player].bar.normalbarpercentage) && !entities[player].abilitys.button_w_mini.abil_active && entities[player].abilitys.button_w_mini.abil_bardivideusable != 1
        ) {
            entities[player].abilitys.button_w_mini.abil_usable = false
        }


        if (entities[player].bar.normalbarpercentage >= entities[player].bar.maxbarnormalpercentage) {
            entities[player].bar.normalbarpercentage = entities[player].bar.maxbarnormalpercentage
        }

        if (entities[player].bar.airbarpercentage < 0.01) {

            entities[player].bar.airbarpercentage = 0.01
        }


        if (entities[player].bar.normalbarpercentage < 0.01) {

            entities[player].bar.normalbarpercentage = 0.01

            entities[player].nowater = true
            if (!entities[player].waterhit) {
                entities[player].waterhit = true
                entities[player].hp -= 13
                setTimeout(() => {
                    if (entities[player] != undefined) entities[player].waterhit = false
                }, 1500);
            }

        }

        if (entities[player].bar.normalbarpercentage >= 0.01) {
            entities[player].nowater = false
        }
        if (entities[player].bar.normalbar != 3) {
            if (entities[player].bar.normalbarpercentage >= 0.01) {
                if (entities[player].bar.normalbar == 2) {

                    entities[player].bar.normalbarpercentage -= 0.01

                } else if (entities[player].bar.normalbar == 0) {
                    if (entities[player].biome != 1) {
                        if (entities[player].whichbiome == 1) {
                            entities[player].bar.normalbarpercentage -= 1
                        }
                    }
                    entities[player].bar.normalbarpercentage -= 0.025

                }
            }
        } else {

            if (entities[player].bar.normalbarpercentage <= entities[player].bar.maxbarnormalpercentage) {
                if (!entities[player].usingability) {
                    entities[player].bar.normalbarpercentage += 0.02
                } else {
                    entities[player].bar.normalbarpercentage -= 0.04
                    if (entities[player].flags.includes(21)) {
                        entities[player].bar.normalbarpercentage -= 0.1
                    }
                }
            }
        }
        if (entities[player].flags.includes(99) || entities[player].isbot && entities[player].whichbiome != 1) {
            entities[player].bar.normalbarpercentage = 100
        }
        if (entities[player].godmode) {
            entities[player].hp = entities[player].maxhp
            entities[player].bar.normalbarpercentage = entities[player].bar.maxbarnormalpercentage
        }
        if (entities[player].bar.normalbarpercentage < entities[player].bar.maxbarnormalpercentage / 4) {
            if (!entities[player].flags.includes(3)) {
                entities[player].flags.push(3)
            }
        } else {
            if (entities[player].flags.includes(3)) {
                var delO = 3; //delete possible dying object from game
                var tmp = entities[player].flags.indexOf(delO); //remove from game arrays
                if (-1 != tmp) {
                    entities[player].flags.splice(tmp, 1);
                }
            }
        }
    }
    if (entities[player].hp) {


        entities[player].sendhp = true

        if (entities[player].hp > entities[player].maxhp + .1) {
            entities[player].hp = entities[player].maxhp + .09
        }
        if (entities[player].type == 2) {
            if ((entities[player].secondaryType == 79 || entities[player].secondaryType == 46) && (entities[player].biome == 3 || entities[player].biome == 4)) {
                entities[player].hp += entities[player].regenhp
            } else if (entities[player].secondaryType != 79 && entities[player].secondaryType != 46) {
                entities[player].hp += entities[player].regenhp
            }
        } else {
            entities[player].hp += entities[player].regenhp
        }
        entities[player].hurt = false

        if (entities[player].hp - entities[player].lasthp <= -0.1) {
            if (entities[player].hp < entities[player].maxhp - 0.25) {


                entities[player].hurt = true
                if (game.load(2) == 1) {
                    entities[player].lasthitsec = 15
                    entities[player].isupgrading = false
                    if (entities[player].ws) {
                        entities[player].ws.send(writer.choice(5, 0, 0, 0))
                        entities[player].animals = []
                    }

                }

            }


        }

        entities[player].lasthp = entities[player].hp


        if (entities[player].hp <= 0.01) {

            if (entities[player].type == 2) {
                if (entities[entities[player].lasthitby]) {
                    new deathhandle(entities, entities[player].id, entities[player].lasthitby)
                } else {
                    if (entities[player].ws) {
                        entities[player].ws.spectatingon = 0
                    }
                }
                entities[player].isdead = true
            } else {


                entities[player].isdead = true
            }
        }


    }

}



basehandle.prototype = {
};
module.exports = basehandle;