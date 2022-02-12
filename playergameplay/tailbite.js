const deathhandle = require("../handler/deathhandle");

function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}
const game1 = require('../game')
const game = new game1()


function rotate(cx, cy, x, y, angle, anticlock_wise = false) {
    if (angle == 0) {
        return { x: parseFloat(x), y: parseFloat(y) };
    } if (anticlock_wise) {
        var radians = (Math.PI / 180) * angle;
    } else {
        var radians = (Math.PI / -180) * angle;
    }
    var cos = Math.cos(radians);
    var sin = Math.sin(radians);
    var nx = (cos * (x - cx)) + (sin * (y - cy)) + cx;
    var ny = (cos * (y - cy)) - (sin * (x - cx)) + cy;
    return { x: nx, y: ny };
}
function tailbite(entities, player_1, player_2, distancemouth) {

    if (entities[player_1].isdead == false) {
        if (entities[player_2].isdead == false) {





            let difference = entities[player_1].angle - entities[player_2].angle;
            while (difference < -180) difference += 360;
            while (difference > 180) difference -= 360;

            if (difference < 0) {
                difference = -difference
            }


            //     console.log(distance2,distance3,distance4,distance5,distance6)
            //console.log(distance2||distance3||distance4||distance5||distance6 < (entities[player_2].radius / 50)*2)
            if (difference < 22) {
                if (distancemouth <= (entities[player_1].radius / 5)) {




                    if (entities[player_2].gothit == true) {

                        if (entities[player_2].arenaid != 0) {
                            if (entities[entities[player_2].arenaid] != undefined) {
                                if (entities[entities[player_2].arenaid].p1id != entities[player_2].id) {
                                    entities[entities[player_2].arenaid].p1bites++
                                } else {
                                    entities[entities[player_2].arenaid].p2bites++
                                }
                            }
                        }
                        entities[player_2].gothit = false

                        // entities[player_1].gothitspeed = true


                        entities[player_2].hp = entities[player_2].hp - entities[player_1].damage
                        var a = (rotate(entities[player_1].pos.x, entities[player_1].pos.y, entities[player_1].pos.x + 80, entities[player_1].pos.y, entities[player_1].angle));
                        var b = (rotate(entities[player_2].pos.x, entities[player_2].pos.y, entities[player_2].pos.x - 80, entities[player_2].pos.y, entities[player_2].angle));


                        entities[player_1].pos.x = a.x

                        entities[player_1].pos.y = a.y

                        entities[player_2].pos.x = b.x

                        entities[player_2].pos.y = b.y
                        if (game.load(2) == 1) {

                            entities[player_2].lasthitby = player_1


                        }
                        entities[player_1].xp += entities[player_2].xp / 50
                        entities[player_2].xp -= entities[player_2].xp / 50

                        //     setTimeout(function(){entities[player_1].gothitspeed = false}, 100);


                        setTimeout(function () {
                            if (entities[player_2] != undefined) entities[player_2].gothit = true
                        }, 3000);
                    }

                    new deathhandle(entities, player_2, player_1)



                }






            }
        }



    }
};
tailbite.prototype = {


};

module.exports = tailbite;