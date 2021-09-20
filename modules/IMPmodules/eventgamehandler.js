const writer1 = require("./writer.js");
const writer = new writer1();
function eventwriter() {
}
eventwriter.prototype = {
    sendabilityrechage: function (player, which) {
        if (which == 1) {
            player.abilitys.button_w.abil_recharging = true
            player.abilitys.button_w.abil_timestamp = Date.now() + player.abilitys.button_w.abil_time * 1000;
        } else {
            player.abilitys.button_w_mini.abil_recharging = true
            player.abilitys.button_w_mini.abil_timestamp = Date.now() + player.abilitys.button_w.abil_time * 1000;
        }
        if (player.ws) {
            player.ws.send(writer.abilitytimer(player.abilitys, which))
        }
    },
    customplayermessage: function (player) {

    },
}
module.exports = eventwriter