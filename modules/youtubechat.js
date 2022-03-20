const gameserver = require("../gameserver");
const hill = require("../entity/objects/objects/hill")
const newobjids = require("../objids")
const utils1 = require("./IMPmodules/util")
const utils = new utils1()

const aobjids = new newobjids()

function makeMsgNone() {
    newMsg = ""
}
function youtubecommands(ws, msgData, writer, randomparseInt, entities, ws_new) {
    newMsg = msgData

    var dataS = String(msgData);
    var initial = dataS.split(":");
    if (ws.isyoutuber) { 
        if (msgData == 'invis:off ') { ws.player.isinvisible = false ; makeMsgNone()} // invis
        if (msgData == 'invis:on ') { ws.player.isinvisible = true ; makeMsgNone()} // invis
        if (msgData == 's:1 ' || msgData == 'cooldown:1 ') { ws.player.infability = true ; makeMsgNone()} //infability 
        if (msgData == 's:0 ' || msgData == 'cooldown:0 ') { ws.player.infability = false ; makeMsgNone()} //infability)
        if (msgData == 'cooldown ' || msgData == 's ') { if(ws.player.infability) {ws.player.infability = false} else {ws.player.infability = true} ; makeMsgNone()} // infability
        if (msgData == 'godmode ' || msgData == 'gm ') {
            if(ws.player.godmode) ws.player.godmode = false
            else ws.player.godmode = true;
            makeMsgNone()
        }
        if (msgData == 'godmode:on ' || msgData == 'gm:on ') { //godmode on
            ws.player.godmode = true
            makeMsgNone()
        }
        if (msgData == 'godmode:off ' || msgData == 'gm:off ') { //godmode off
            ws.player.godmode = false
            makeMsgNone()
        }
        switch (initial[0]) {

            case "name": // change name
                ws.player.name = initial[1]
                makeMsgNone()
                break
            case "size": // set size
                let m = parseInt(initial[1])
                if (m > 50) m = 50
                ws.player.moreradius = m
                makeMsgNone()
                break
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

            case "color": // set color
                ws.player.isinvisible = true
                ws.player.colorname = parseInt(initial[1])
                ws.player.isinvisible = false
                makeMsgNone()


                break;


            case "x": // set xp
                if(parseInt(initial[1] != null)) {
                    ws.player.xp = + parseInt(initial[1])
                    makeMsgNone()
                }
            case "xp": // set xp
                if(parseInt(initial[1] != null)) {
                    ws.player.xp = + parseInt(initial[1])
                    makeMsgNone()
                }
    
                break;
            case "species": // change species
                ws.player.species = parseInt(initial[1])
                makeMsgNone()
                break;
            case "change":

                ws.player.secondaryType = parseInt(initial[1])
                ws.player.species = parseInt(initial[2])
                ws.player.radius = parseInt(initial[3])
                ws.player.xp = utils.anitoxp(parseInt(initial[1]))
                makeMsgNone()
                break
            case "a":
                ws.player.secondaryType = parseInt(initial[1])
                ws.player.xp = utils.anitoxp(parseInt(initial[1]))
                makeMsgNone()
                break;
            }

    }

}
youtubecommands.prototype = {
    getMsg: function() {
        return newMsg;
    }
}
module.exports = youtubecommands;