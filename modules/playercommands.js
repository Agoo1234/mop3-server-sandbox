const gameserver = require("../gameserver");
const newobjids = require("../objids")
const utils1 = require("./IMPmodules/util")
const utils = new utils1()

const aobjids = new newobjids()

function makeMsgNone() {
    newMsg = ""
}
function playercommands(ws, msgData, writer, randomparseInt, entities, ws_new) {
    newMsg = msgData

    var dataS = String(msgData);
    var initial = dataS.split(":");
    if (1 == 1) { 
        switch (initial[0]) {
            case "zoom": // player zoom
                ws.player.playcamera = parseInt(initial[1])
                makeMsgNone()
                break;
            case "tp": // teleport
                if (ws.player.hp >= ws.player.hp*0.66 || !ws.player.usingability || !ws.player.isflying || !ws.player.isgrabbed || !ws.player.flags.includes(21) || !ws.player.flags.includes(87)) {
                    ws.player.pos.x = parseInt(initial[1])
                    ws.player.pos.y = parseInt(initial[2])
                    console.log('Teleported to ' + 'x:' + initial[1] + 'y:' + initial[2])
                    makeMsgNone()
                    break;
                }

            case "x":
                if(parseInt(initial[1] != null)) {
                    ws.player.xp = + parseInt(initial[1])
                    makeMsgNone()
                }
                break;
            case "xp": // set xp
                if(parseInt(initial[1] != null)) {
                    ws.player.xp = + parseInt(initial[1])
                    makeMsgNone()
                }
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