const vector = require('victor');
const sleig = require("./objects/objects/sleig.js");
const createbot = require("./bot.js");


function newsleig(writer, aobjids, entities, time, objids, x, y, a, b, c) {

    let positiontest = new vector(0, 0)

    let sleiga = new sleig(objids, positiontest)


    entities[objids] = sleiga;
    let myid = objids

    if (b == false) {
        entities[myid].isinvisible = true
        entities[myid].radius = 10
    }

    entities[myid].x = x
    entities[myid].y = y
    entities[myid].pos.x = x
    entities[myid].pos.y = y
    entities[myid].mousex = x
    entities[myid].mousey = y

    if (b == false) {
        setTimeout(() => {
            for (let i = 0; i < 2; i++) {
                new createbot(false, writer, aobjids, entities, [40, 0, 0], "  ", 10, true, x, y, myid, i)
            }
        }, 1000);

    }
    setTimeout(() => {
        let newmate = setInterval(() => {

            try {


                if (!entities[c].isdead) {
                    if (b == true) {
                        entities[c].pos.x = entities[myid].x
                        entities[c].pos.y = entities[myid].y
                        entities[c].angle = entities[myid].angle
                    }
                    if (a == true) {
                        newpositionx = entities[c].mousex
                        newpositiony = entities[c].mousey
                    } else {

                        newpositionx = entities[objids - 1].tailfar.x
                        newpositiony = entities[objids - 1].tailfar.y

                    }
                    entities[myid].holdboost = entities[c].holdboost
                    entities[myid].mousex = newpositionx
                    entities[myid].mousey = newpositiony

                } else {
                    entities[myid].isdead = true
                    clearInterval(newmate)
                }

            } catch (error) {
                console.log(error)
                clearInterval(newmate)
            }

        }, time);
    }, 1000);
}
newsleig.prototype = {
}
module.exports = newsleig;