const gameserver = require("../gameserver");
const newobjids = require("../objids")

const aobjids = new newobjids()

function makeMsgNone() {
    newMsg = ""
}
function playercommands(ws, msgData, writer, randomparseInt, entities, ws_new) {
    newMsg = msgData

    var dataS = String(msgData);
    var initial = dataS.split(":");
    if (1 = 1) { 
        switch (initial[0]) {
            case "zoom": // player zoom
                ws.player.playcamera = parseInt(initial[1])
                makeMsgNone()
                break;
            case "tp": // teleport
                ws.player.pos.x = parseInt(initial[1])
                ws.player.pos.y = parseInt(initial[2])
                console.log('Teleported to ' + 'x:' + initial[1] + 'y:' + initial[2])
                makeMsgNone()
                break;

            case "x":
            case "xp": // set xp
                ws.player.xp = + parseInt(initial[1])
                makeMsgNone()
    
                break;
            }

    }

}
playercommands.prototype = {
    getMsg: function() {
        return newMsg;
    }
}
module.exports = playercommands;