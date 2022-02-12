const game1 = require("../game");
const deathhandle = require("../handler/deathhandle");

const game = new game1()

function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}
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
function tailbite(entities, player1, player2) {

    if (player1.isdead == false) {
        if (player2.isdead == false) {






            //     console.log(distance2,distance3,distance4,distance5,distance6)
            //console.log(distance2||distance3||distance4||distance5||distance6 < (player2.radius / 50)*2)




            if (player2.gothit == true) {


                player2.gothit = false

                // player1.gothitspeed = true


                player2.hp = player2.hp - player1.damage
                var a = (rotate(player1.pos.x, player1.pos.y, player1.pos.x + 20, player1.pos.y, player1.angle));
                var b = (rotate(player2.pos.x, player2.pos.y, player2.pos.x - 40, player2.pos.y, player1.angle));


                player1.pos.x = a.x

                player1.pos.y = a.y

                player2.pos.x = b.x

                player2.pos.y = b.y
                if (game.load(2) == 1) {

                    player2.lasthitby = player1.id

                }
                player1.xp += player2.xp / 500
                player2.xp -= player2.xp / 500

                //     setTimeout(function(){player1.gothitspeed = false}, 100);


                setTimeout(function () { player2.gothit = true }, 500);
            }

            new deathhandle(entities, player2.id, player1.id)









        }




    }
};
tailbite.prototype = {


};

module.exports = tailbite;