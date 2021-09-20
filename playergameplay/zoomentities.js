const zoomnormal = require('./zoom/zoomnormal')
const zoomarena = require('./zoom/zoomarena')
function zoomentities(entities, ws) {

    Object.keys(entities).forEach(function (da) {
        if (ws != null) {

            if (entities[da].isinvisible
                || entities[da].type == 2 == (ws.isalive ? entities[da].isinhole && (entities[da].id != ws.player.id) : entities[da].isinhole)
                || entities[da].isdead
                || entities[da].spawnedtime + 100 >= Date.now()) {

                if (ws.toupdate.includes(entities[da])) {
                    var delO = entities[da]; //delete possible dying object from game

                    var tmp = ws.tocreate.indexOf(delO); //remove from game arrays
                    if (-1 != tmp) {
                        ws.tocreate.splice(tmp, 1);
                    }


                    var tmp = ws.toupdate.indexOf(delO); //remove from game arrays
                    if (-1 != tmp) {
                        ws.toupdate.splice(tmp, 1);
                    }

                    ws.todelete.push(entities[da])
                }
            } else {

                if (!ws.isalive) {
                    new zoomnormal(entities, da, ws)
                } else {
                    if (!ws.player.flags.includes(33)) {
                        new zoomnormal(entities, da, ws)

                    } else {
                        new zoomarena(entities, da, ws)
                    }
                }

            }

        }
    });
}
zoomentities.prototype = {
};
module.exports = zoomentities;