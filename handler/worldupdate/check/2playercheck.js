const tailbiteplayer = require("../../../playergameplay/tailbite.js");
const hit = require("../../../playergameplay/hit.js");
const collisiondynamic = require("../../../modules/collisondynamic")
const utils1 = require("../../../modules/IMPmodules/util")
const util = new utils1()
const game1 = require('../../../game')
const game = new game1()

function playercheck2(entities, player_1, player_2) {

    let distance = util.getDistance2D(entities[player_2].x, entities[player_2].y, entities[player_1].x, entities[player_1].y)
    if (distance <= (entities[player_1].radius + entities[player_2].radius)) {
        if (entities[player_1].tier == entities[player_2].tier) {

            if (entities[player_1].tier < 14) {
                if (!entities[player_1].isflying && !entities[player_2].isflying && !entities[player_1].isdiving && !entities[player_2].isdiving) {
                    new collisiondynamic(entities, entities[player_2], entities[player_1], false, distance)
                }
            }
        }
    }
    if (entities[player_1].tier > entities[player_2].tier) {// player tier
        if (distance <= (entities[player_1].radius + entities[player_2].radius)) {
            if (!entities[player_1].isflying && !entities[player_2].isflying && !entities[player_1].isdiving && !entities[player_2].isdiving
                && entities[player_1].arenaid == 0 && entities[player_2].arenaid == 0) {

                new collisiondynamic(entities, entities[player_2], entities[player_1], false, distance)
                if (!entities[player_2].isgrabbed && entities[player_2].timershivered <= Date.now()) {
                    if (!(entities[player_1].secondaryType == 53 && entities[player_1].usingability) &&
                        !(entities[player_1].secondaryType == 73 && entities[player_1].usingability) &&
                        !(entities[player_1].secondaryType == 78 && entities[player_1].usingability)
                    ) {

                        var newerangle = util.anglebetween2point(entities[player_1].x, entities[player_1].y, entities[player_2].x, entities[player_2].y)
                        difference = entities[player_1].angle - newerangle
                        difference -= 180
                        while (difference < -180) difference += 360;
                        while (difference > 180) difference -= 360;


                        if (difference < 0) {
                            difference = -difference
                        }

                        if (difference <= 22) {
                            if (!entities[player_1].isflying && !entities[player_2].isflying && !entities[player_1].isdiving && !entities[player_2].isdiving) {
                                new hit(entities, entities[player_1], entities[player_2])
                            }

                        }
                    }
                }

            }

        }

    }

    if (entities[player_1].isplayer && entities[player_2].isplayer) {
        let distance = util.getDistance2D(entities[player_1].pos.x, entities[player_1].pos.y, entities[player_2].pos.x, entities[player_2].pos.y)

        if (distance <= entities[player_1].radius + entities[player_2].radius * 2) {

            if (!entities[player_1].isdead && !entities[player_2].isdead) {
                if (!entities[player_1].invincible && !entities[player_2].invincible) {
                    if (!entities[player_1].isdiving && !entities[player_2].isdiving) {
                        if (!entities[player_1].isflying && !entities[player_2].isflying) {

                            if (game.load(2) != 1 || game.load(2) == 1 && entities[player_1].arenaid == entities[player_2].arenaid) {
                                if (!(entities[player_1].secondaryType == 53 && !entities[player_1].candive)) {

                                    if (entities[player_1].arenaid == entities[player_2].arenaid) {
                                        if ((entities[player_1].tier == entities[player_2].tier && entities[player_2].tier >= 14 || entities[player_1].tier < entities[player_2].tier) ||
                                            entities[player_2].arenaid != 0
                                        ) {

                                            for (let id in entities[player_2].tails) {
                                                var hitdistance = util.getDistance2D(entities[player_1].mouth.x, entities[player_1].mouth.y, entities[player_2].tails[id].x, entities[player_2].tails[id].y)
                                                new tailbiteplayer(entities, entities[player_1].id, entities[player_2].id, hitdistance)
                                            }

                                        }
                                    }

                                }
                            }

                        };
                    }

                }
            };

        }
    }


}
playercheck2.prototype = {}
module.exports = playercheck2