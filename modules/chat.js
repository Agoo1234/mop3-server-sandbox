const gameserver = require("../gameserver");
const hill = require("../entity/objects/objects/hill")
const newobjids = require("../objids")

const aobjids = new newobjids()

function makeMsgNone() {
    newMsg = ""
}
function devcommands(ws, msgData, writer, randomparseInt, entities, ws_new) {
    newMsg = msgData

    var dataS = String(msgData);
    var initial = dataS.split(":");
    if (ws.isdeveloper == true) { 
        if (msgData == 'heal ') { //heal player
            ws.player.hp = ws.player.maxhp
            ws.player.barpercentage = 100
            makeMsgNone()
        }
        /*   if(msgData == 'tpall:hole '){
               Object.keys(hole).forEach(function(da){
               hole[da].x= ws.player.pos.x
               hole[da].y = ws.player.pos.y
               });
           }*/
        if (msgData == 'ecl ') { // count entities
            var count = 0
            for (let da in entities) {
                if (entities[da].isloaded) {
                    count++
                }
            }
            console.log(count)
            ws.send(writer.chat(ws.player.id, count + " "))
        }
        if (msgData == 'ec ') { // log in console, count entities
            var count = 0
            for (let da in entities) {
                console.log(entities[da])
                count++
            }

            ws.send(writer.chat(ws.player.id, count + " "))
        }

        if (msgData == 'up ') { ws.player.xp = 0 ; makeMsgNone()} // set xp to 0
        if (msgData == 'invis:off ') { ws.player.isinvisible = false ; makeMsgNone()} // invis
        if (msgData == 'invis:on ') { ws.player.isinvisible = true ; makeMsgNone()} // invis
        if (msgData == 's:1 ') { ws.player.infability = true ; makeMsgNone()} //infability 
        if (msgData == 's:0 ') { ws.player.infability = false ; makeMsgNone()} //infability
        if (msgData == 'stopserver ') { makeMsgNone(); process.exit(1); ; } // stop server
        if (msgData == 'godmode:on ') { //godmode on
            ws.player.godmode = true
            makeMsgNone()
        }
        if (msgData == 'godmode:off ') { //godmode off
            ws.player.godmode = false
            makeMsgNone()
        }
        /*for (var j in initial) {
            console.log(initial[j])
            if (isNaN(initial[j])) return
        }*/
        switch (initial[0]) {

            case "tpall": // tp all entities to player

                for (let da in entities) {

                    if (entities[da].type == 2) {
                        var string = initial[1]

                        if (entities[da].name.includes(string)) {

                            entities[da].pos.x = ws.player.pos.x
                            entities[da].pos.y = ws.player.pos.y
                        }

                    }

                }
                makeMsgNone()
                break;
            case "c": // send messages through all players

                for (let da in entities) {
                    if (entities[da].type == 2) {
                        if (entities[da].id != ws.player.id) {
                            var string = initial[1]
                            for (let bart in ws_new) {
                                if (ws_new[bart].toupdate.includes(ws.player)) {
                                    ws_new[bart].send(writer.chat(entities[da].id, string))
                                }
                            }
                        }
                    }
                }
                makeMsgNone()
                break
            case "cp":

                for (let da in entities) { // send for players
                    if (entities[da].type == 2) {
                        if (entities[da].id != ws.player.id) {
                            if (entities[da].name == initial[1] + " ") {
                                var string = initial[2]
                                for (let bart in ws_new) {
                                    if (ws_new[bart].toupdate.includes(ws.player)) {
                                        ws_new[bart].send(writer.chat(entities[da].id, string))
                                    }
                                }
                            }
                        }
                    }

                }
                makeMsgNone()
                break
            case "size": // set size
                let m = parseInt(initial[1])
                if (m > 50) m = 50
                ws.player.moreradius = m
                makeMsgNone()
                break
            case "changeall": // change all entities

                for (let da in entities) {

                    if (entities[da].type == 2) {
                        var string = initial[1]


                        if (entities[da].name.includes(string)) {
                            entities[da].secondaryType = parseInt(initial[2])
                            entities[da].species = parseInt(initial[3])
                            entities[da].radius = parseInt(initial[4])

                        }

                    }

                }
                makeMsgNone()
                break;

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
                ws.player.xp = + parseInt(initial[1])
                makeMsgNone()

                break;
        
            case "xp": // set xp
                ws.player.xp = + parseInt(initial[1])
                makeMsgNone()
    
                break;
            case "createobj": // create object

                var randomid = randomparseInt(200000000, 250000000)

                objtype = parseInt(initial[1])
                objrad = parseInt(initial[2])

                makeMsgNone()

                break;
            case "makehill": // make a hill
                var objids = aobjids.giveid(true)
                h = new hill(objids, ws.player.pos.x, ws.player.pos.y)
                entities[objids] = h
                

                makeMsgNone()
                break;
            case "species": // change species
                ws.player.species = parseInt(initial[1])
                makeMsgNone()






                break;
            case "change":

                ws.player.secondaryType = parseInt(initial[1])
                ws.player.species = parseInt(initial[2])
                ws.player.radius = parseInt(initial[3])
                makeMsgNone()
                break
            case "a":
                ws.player.secondaryType = parseInt(initial[1])
                makeMsgNone()
                break;
            case "killall":
                for (let da in entities) {
                    if (entities[da] != ws.player) {
                        entities[da].invincible = false
                        entities[da].godmode = false
                        entities[da].hp = -1
                    }
                    
                }
                makeMsgNone()
                break
            case "killme":
                ws.player.invincible = false
                ws.player.godmode = false
                ws.player.hp = -1
                makeMsgNone()
                break
            case "kill":
                var namepart = initial[1]
                for (let da in entities) {
                    if(entities[da].type == 2){
                        if(entities[da].name.includes(namepart)) {
                        entities[da].invincible = false
                        entities[da].godmode = false
                        entities[da].hp = -1
                        }
                    }
                }
                makeMsgNone()
                break
            }

    }

}
devcommands.prototype = {
    getMsg: function() {
        return newMsg;
    }
}
module.exports = devcommands;