const sleigh = require("../entity/sleigh.js");

function fun() {
}
fun.prototype = {
    sleig: function (entities, writer, player, time, aobjids) {


        player.canmove = false


        let max = 5 + 1
        let last = false
        let first = true


        for (let i = 0; i < max; i++) {

            let objids = aobjids.giveid(true);
            if (i == max - 1) {
                last = true
            }

            //newsleig(10, objids, player.x, player.y, first, last, player.id)
            new sleigh(writer, aobjids, entities, time, objids, player.x, player.y, first, last, player.id)


            first = false

        }

    }
}
module.exports = fun