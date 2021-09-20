
const vector = require('victor');
const bot = require("./objects/objects/bot.js");
const game1 = require('../game')
const game = new game1()
const utils1 = require("../modules/IMPmodules/util")
const util = new utils1()
const apexchoices = require("../playergameplay/choices/choices")

const bigabilities = require("../playergameplay/abilitiesuse/abilitiesusebigbutton");
const miniabilities = require("../playergameplay/abilitiesuse/abilitiesuseminibutton");
const animalswitcher = require('../playergameplay/animalswitch.js');

function newbot(respawn, writer, aobjids, entities, type, name, time, ghost, x, y, a, b, c, d, e) {

    let objids = aobjids.giveid(true);

    let positiontest = new vector(10000, 10000); // spawn pos
    let botplay = new bot(objids, positiontest, name + ' ')
    entities[objids] = botplay;

    let myid = objids
    objids++
    var randomtest = Math.floor(Math.random() * (type.length / 3));

    new apexchoices(entities[myid], randomtest, type, 0, entities, true)
    entities[myid].respawnbot = respawn
    entities[myid].mousex = x
    entities[myid].mousey = y


    if (ghost) {
        entities[myid].godmode = true
    }
    new animalswitcher(entities[myid])
    switch (entities[myid].tier) {
        case 14:

            entities[myid].xp = util.randomNumber(1100000, 9900000)
            break
        case 15:
            entities[myid].xp = util.randomNumber(11000000, 19900000)
            break
        case 16:
            entities[myid].xp = util.randomNumber(20000000, 40000000)
            break

    }

    if (game.load(7)) {
        let newermate = setInterval(() => {
            if (entities[myid]) {

                entities[myid].abilitys.button_w_mini.abil_currentclick = !entities[myid].abilitys.button_w_mini.abil_currentclick
                entities[myid].abilitys.button_w.abil_currentclick = !entities[myid].abilitys.button_w_mini.abil_currentclick
                entities[myid].abiluse(bigabilities, aobjids, writer, entities, 1)
                entities[myid].abiluse(miniabilities, aobjids, writer, entities, 0)
            } else {
                clearInterval(newermate)
            }
        }, 8000);
    }
    switch (entities[myid].secondaryType) {

        case 40:
            {
                entities[myid].isplayer = false
                let newmate = setInterval(() => {
                    try {


                        if (entities[a]) {
                            var far = entities[a].radius * 6
                            if (b) {
                                far = -far
                            }

                            var newpos = util.rotate(entities[a].x, entities[a].y, entities[a].x, entities[a].y + far, entities[a].angle)
                            entities[myid].holdboost = entities[a].holdboost

                            entities[myid].pos.x = newpos.x
                            entities[myid].pos.y = newpos.y
                            entities[myid].angle = entities[a].angle
                            entities[myid].radius = entities[a].radius * 2.5
                        } else {
                            entities[myid].isdead = true
                            clearInterval(newmate)
                        }

                    } catch (error) {
                        console.log(error)
                        clearInterval(newmate)
                    }

                }, time);




            }
            break;
        case 14:

            if (entities[myid].species == 5) {
                entities[myid].xp = 1000000

                let attacking = false


                function newload() {


                    let object = entities[a]

                    if (object) {
                        let distnew = util.getDistance2D(entities[myid].x, entities[myid].y, object.x, object.y)
                        let newpos = util.rotate(object.x, object.y, object.x + object.radius * 1.15, object.y, object.angle);
                        let newpos1 = util.rotate(object.x, object.y, object.x + object.radius * 1.1, object.y, object.angle);
                        let newpos2 = util.rotate(object.x, object.y, object.x + object.radius * 1.2, object.y, object.angle);


                        let distance = util.getDistance2D(entities[myid].x, entities[myid].y, newpos.x, newpos.y)
                        let distance1 = util.getDistance2D(entities[myid].x, entities[myid].y, newpos1.x, newpos1.y)
                        let distance2 = util.getDistance2D(entities[myid].x, entities[myid].y, newpos2.x, newpos2.y)

                        let difference = object.angle - entities[myid].angle;
                        while (difference < -180) difference += 360;
                        while (difference > 180) difference -= 360;

                        if (difference < 0) {
                            difference = -difference
                        }

                        if (difference >= 40) {
                            entities[myid].holdboost = true
                        } else {
                            if (dist < object.radius + entities[myid]) {
                                entities[myid].holdboost = false
                            } else {
                                entities[myid].holdboost = true
                            }
                        }
                        //console.log(distance)
                        let newdis = 25
                        let dadis = 37
                        if (distance < newdis || distance1 < newdis || distance2 < newdis) {
                            attacking = true
                        } else if (distance > dadis || distance1 > dadis || distance2 > dadis) {
                            attacking = false
                        }
                        if (attacking) {


                            entities[myid].mousex = object.x
                            entities[myid].mousey = object.y

                            oldposx = entities[myid].x
                            oldposy = entities[myid].y
                        } else {

                            entities[myid].mousex = newpos1.x
                            entities[myid].mousey = newpos1.y

                            oldposx = entities[myid].x
                            oldposy = entities[myid].y
                        }
                    }

                }

                let newmate = setInterval(() => {

                    if (entities[a] != undefined) {
                        if (entities[myid] != undefined) {
                            newload()
                        } else {
                            clearInterval(newmate)
                        }
                    } else {
                        entities[myid].isdead = true
                        clearInterval(newmate)
                    }
                }, time);
            } else {
                let newmate = setInterval(() => {

                    if (entities[myid] != undefined) {
                        if (!entities[myid].isdead) {
                            let newpos = util.rotate(entities[myid].x, entities[myid].y, entities[myid].x - 200, entities[myid].y, util.randomNumber(0, 360));
                            entities[myid].mousex = newpos.x
                            entities[myid].mousey = newpos.y
                            var randomtest = Math.floor(Math.random() * 6)
                            if (randomtest == 0) {
                                entities[myid].holdboost = true
                            } else {
                                entities[myid].holdboost = false
                            }
                        } else {
                            clearInterval(newmate)
                        }
                    } else {
                        clearInterval(newmate)
                    }

                }, time);

            }
            break;
        default:


            let newmate = setInterval(() => {

                if (entities[myid] != undefined) {
                    if (!entities[myid].isdead) {
                        let newpos = util.rotate(entities[myid].x, entities[myid].y, entities[myid].x - 200, entities[myid].y, util.randomNumber(0, 360));
                        entities[myid].mousex = newpos.x
                        entities[myid].mousey = newpos.y
                        var randomtest = Math.floor(Math.random() * 6)
                        if (randomtest == 0) {
                            entities[myid].holdboost = true
                        } else {
                            entities[myid].holdboost = false
                        }
                    } else {
                        clearInterval(newmate)
                    }
                } else {
                    clearInterval(newmate)
                }

            }, time);

            break;

    }


}
newbot.prototype = {


}
module.exports = newbot;