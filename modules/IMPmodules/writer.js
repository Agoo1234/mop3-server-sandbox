

const customdata1 = require('../writerworldupdcustomdata')
const customdata = new customdata1()
const game1 = require('../../game');
const game = new game1()

function writer() {
    //nothin
    this.a = 0;
};
function MsgWriter(msgSize) {
    this.encode_utf8 = function (s) {
        return unescape(encodeURIComponent(s));
    }



    this.decode_utf8 = function (s) {
        return decodeURIComponent(escape(s));
    }

    if (msgSize === 'first') {
        this.len = 0;


        this.writeUInt8 = function (val) {

            this.len += 1;
        };
        this.writeUInt16 = function (val) {

            this.len += 2;
        };
        this.writeInt16 = function (val) {

            this.len += 2;
        };
        this.writeUInt32 = function (val) {

            this.len += 4;
        };
        this.writeString = function (val) {
            val = this.encode_utf8(val);
            len = val.length;
            this.writeUInt16(val.length);
            for (var ind = 0; ind < len; ind++) {
                this.writeUInt8(val.charCodeAt(ind));
            }

        };
        this.returnoff = function () {

            return this.len
        }
    } else {
        this.len = 0;
        this.dataView = new DataView(new ArrayBuffer(msgSize));

        this.writeUInt8 = function (val) {
            this.dataView.setUint8(this.len, val);
            this.len += 1;
        };
        this.writeUInt16 = function (val) {
            this.dataView.setUint16(this.len, val, false);
            this.len += 2;
        };
        this.writeInt16 = function (val) {
            this.dataView.setInt16(this.len, val, false);
            this.len += 2;
        };
        this.writeUInt32 = function (val) {
            this.dataView.setUint32(this.len, val, false);
            this.len += 4;
        };
        this.writeString = function (val) {
            val = this.encode_utf8(val);
            len = val.length;
            this.writeUInt16(val.length);
            for (var ind = 0; ind < len; ind++) {
                this.writeUInt8(val.charCodeAt(ind));
            }
        };
    }
}
writer.prototype = {
    //write ( valset );



    dot2numIP: function (dot) {
        var d = dot.split('.');
        return ((((((+d[0]) * 256) + (+d[1])) * 256) + (+d[2])) * 256) + (+d[3]);
    },
    updme: function (players) {

        var buf = new MsgWriter(3);
        buf.writeUInt8(254); //type  0
        buf.writeUInt16(players); //game state  3,4
        return buf.dataView.buffer;
    },
    writeservers: function (ip, gamemode, players) {


        var off = 0
        var buf = new MsgWriter(9);
        buf.writeUInt8(255); //type  0

        buf.writeUInt32(this.dot2numIP(ip)); //game state  3,4

        buf.writeUInt16(players); //game state  3,4

        buf.writeUInt8(gamemode); //type  0

        buf.writeUInt8(0); //type  0



        return buf;
    },
    firstConnect: function (playersNum, serverVer) {
        var buf = new MsgWriter(7);
        buf.writeUInt8(1); //type  0
        buf.writeUInt8(game.load(2)); //game mode
        buf.writeUInt8(0); //game state
        buf.writeUInt16(playersNum); //game state  3,4
        buf.writeUInt16(serverVer); //game state  5,6
        return buf.dataView.buffer;
    },
    abilitytimer: function (ability, which) {
        var buf = new MsgWriter(6);
        buf.writeUInt8(35);
        buf.writeUInt8(which);
        if (which == 1) {
            buf.writeUInt32(ability.button_w.abil_time * 1000);

        } else {
            buf.writeUInt32(ability.button_w_mini.abil_time * 1000);

        }
        return buf.dataView.buffer;
    },
    abilityuse: function (ability) {

        var buf = new MsgWriter(12);
        buf.writeUInt8(36);
        buf.writeUInt8(ability.abil_dive_isMain);
        buf.writeUInt8(ability.button_w_mini.abil_recharging);
        buf.writeUInt8(ability.button_w.abil_recharging);

        buf.writeUInt8(ability.button_w_mini.abil_usable);
        buf.writeUInt8(ability.button_w_mini.abil_possible);
        buf.writeUInt8(ability.button_w_mini.abil_active);
        buf.writeUInt8(ability.button_w_mini.abil_Type);


        buf.writeUInt8(ability.button_w.abil_usable);
        buf.writeUInt8(ability.button_w.abil_possible);
        buf.writeUInt8(ability.button_w.abil_active);
        buf.writeUInt8(ability.button_w.abil_Type);





        return buf.dataView.buffer;
    },

    codecheck: function (code) {
        var off = 0
        var buf = new MsgWriter(3 + 1 + code.length);
        buf.writeUInt8(12);
        buf.writeString(code + " ")


        return buf.dataView.buffer;
    },
    serverinfo: function (playeralive, playerspec) {
        var server = new MsgWriter(7);
        server.writeUInt8(10);
        server.writeUInt16(playeralive + playerspec);
        server.writeUInt16(playerspec); //how much nonalive
        server.writeUInt16(playeralive);//how much alive
        return server.dataView.buffer;
    },

    sendJoin: function (zoom, x, y, river, volcano, lakes, mud, ice, hills, lakeislands, foodspot, waterspot) {
        let realOff = 0


        var buf = new MsgWriter('first');

        buf.writeUInt8(3); //type 3
        buf.writeUInt8(1); //spectating 
        buf.writeUInt16(game.load(0)); //game width
        buf.writeUInt16(game.load(1)); //game height
        buf.writeUInt8(game.load(2)); //game mode
        buf.writeUInt16(x * 4); //cam x
        buf.writeUInt16(y * 4); //cam y
        buf.writeUInt16(zoom); //cam zoom


        //MINIMAP , NOW BIOMES

        buf.writeUInt16(game.load(1) / 4); // OCEAN WIDTH
        buf.writeUInt16(game.load(0)); // ARCTIC WIDTH
        buf.writeUInt16(game.load(1) / 4); // ARCTIC HEIGHT


        buf.writeUInt16(river.length);

        for (var i = 0; i < river.length; i++) { //go through each element
            buf.writeUInt16(river[i].width);

            buf.writeUInt16(river[i].height);

            buf.writeUInt16(river[i].x);

            buf.writeUInt16(river[i].y);


        }
        buf.writeUInt16(volcano.length);

        for (var i = 0; i < volcano.length; i++) { //go through each element
            buf.writeUInt8(volcano[i].radius / 5); // volcano rad but divided by 5.(client takes it *5)


            buf.writeUInt16(volcano[i].x); // pos x of volcano


            buf.writeUInt16(volcano[i].y); // pos y of volcano


        }


        buf.writeUInt16(lakes.length);

        for (var i = 0; i < lakes.length; i++) { //go through each element

            buf.writeUInt8(lakes[i].x / (game.load(0) / 200)); // pos x of volcano


            buf.writeUInt8(lakes[i].y / (game.load(1) / 200)); // pos y of volcano

            buf.writeUInt8(lakes[i].radius / 5); // volcano rad but divided by 5.(client takes it *5)


        }
        buf.writeUInt16(mud.length);

        for (var i = 0; i < mud.length; i++) { //go through each element

            buf.writeUInt8(mud[i].x / (game.load(0) / 200)); // pos x of volcano


            buf.writeUInt8(mud[i].y / (game.load(1) / 200)); // pos y of volcano

            buf.writeUInt8(mud[i].radius / 5); // volcano rad but divided by 5.(client takes it *5)


        }
        buf.writeUInt16(ice.length);

        for (var i = 0; i < ice.length; i++) { //go through each element

            buf.writeUInt8(ice[i].x / (game.load(0) / 200)); // pos x of volcano


            buf.writeUInt8(ice[i].y / (game.load(1) / 200)); // pos y of volcano

            buf.writeUInt8(ice[i].radius / 5); // volcano rad but divided by 5.(client takes it *5)


        }
        buf.writeUInt16(hills.length);

        for (var i = 0; i < hills.length; i++) { //go through each element

            buf.writeUInt8(hills[i].x / (game.load(0) / 200)); // pos x of volcano


            buf.writeUInt8(hills[i].y / (game.load(1) / 200)); // pos y of volcano


            buf.writeUInt8(hills[i].radius / 5); // volcano rad but divided by 5.(client takes it *5)


        }
        buf.writeUInt16(lakeislands.length);

        for (var i = 0; i < lakeislands.length; i++) { //go through each element

            buf.writeUInt8(lakeislands[i].x / (game.load(0) / 200)); // pos x of volcano


            buf.writeUInt8(lakeislands[i].y / (game.load(1) / 200)); // pos y of volcano


            buf.writeUInt8(lakeislands[i].radius / 5); // volcano rad but divided by 5.(client takes it *5)


        }
        buf.writeUInt16(foodspot.length);

        for (var i = 0; i < foodspot.length; i++) { //go through each element

            buf.writeUInt8(foodspot[i].x / (game.load(0) / 200)); // pos x of volcano


            buf.writeUInt8(foodspot[i].y / (game.load(1) / 200)); // pos y of volcano




        }
        buf.writeUInt16(waterspot.length);

        for (var i = 0; i < waterspot.length; i++) { //go through each element

            buf.writeUInt8(waterspot[i].x / (game.load(0) / 200)); // pos x of volcano


            buf.writeUInt8(waterspot[i].y / (game.load(1) / 200)); // pos y of volcano

        }
        realOff += buf.returnoff()
        var buf = new MsgWriter(realOff);

        buf.writeUInt8(3); //type 3
        buf.writeUInt8(1); //spectating 
        buf.writeUInt16(game.load(0)); //game width
        buf.writeUInt16(game.load(1)); //game height
        buf.writeUInt8(game.load(2)); //game mode
        buf.writeUInt16(x * 4); //cam x
        buf.writeUInt16(y * 4); //cam y
        buf.writeUInt16(zoom); //cam zoom


        //MINIMAP , NOW BIOMES

        buf.writeUInt16(game.load(1) / 4); // OCEAN WIDTH
        buf.writeUInt16(game.load(0)); // ARCTIC WIDTH
        buf.writeUInt16(game.load(1) / 4); // ARCTIC HEIGHT


        buf.writeUInt16(river.length);

        for (var i = 0; i < river.length; i++) { //go through each element
            buf.writeUInt16(river[i].width);

            buf.writeUInt16(river[i].height);

            buf.writeUInt16(river[i].x);

            buf.writeUInt16(river[i].y);


        }
        buf.writeUInt16(volcano.length);

        for (var i = 0; i < volcano.length; i++) { //go through each element
            buf.writeUInt8(volcano[i].radius / 5); // volcano rad but divided by 5.(client takes it *5)


            buf.writeUInt16(volcano[i].x); // pos x of volcano


            buf.writeUInt16(volcano[i].y); // pos y of volcano


        }


        buf.writeUInt16(lakes.length);

        for (var i = 0; i < lakes.length; i++) { //go through each element

            buf.writeUInt8(lakes[i].x / (game.load(0) / 200)); // pos x of volcano


            buf.writeUInt8(lakes[i].y / (game.load(1) / 200)); // pos y of volcano

            buf.writeUInt8(lakes[i].radius / 5); // volcano rad but divided by 5.(client takes it *5)


        }
        buf.writeUInt16(mud.length);

        for (var i = 0; i < mud.length; i++) { //go through each element

            buf.writeUInt8(mud[i].x / (game.load(0) / 200)); // pos x of volcano


            buf.writeUInt8(mud[i].y / (game.load(1) / 200)); // pos y of volcano

            buf.writeUInt8(mud[i].radius / 5); // volcano rad but divided by 5.(client takes it *5)


        }
        buf.writeUInt16(ice.length);

        for (var i = 0; i < ice.length; i++) { //go through each element

            buf.writeUInt8(ice[i].x / (game.load(0) / 200)); // pos x of volcano


            buf.writeUInt8(ice[i].y / (game.load(1) / 200)); // pos y of volcano

            buf.writeUInt8(ice[i].radius / 5); // volcano rad but divided by 5.(client takes it *5)


        }
        buf.writeUInt16(hills.length);

        for (var i = 0; i < hills.length; i++) { //go through each element

            buf.writeUInt8(hills[i].x / (game.load(0) / 200)); // pos x of volcano


            buf.writeUInt8(hills[i].y / (game.load(1) / 200)); // pos y of volcano


            buf.writeUInt8(hills[i].radius / 5); // volcano rad but divided by 5.(client takes it *5)


        }
        buf.writeUInt16(lakeislands.length);

        for (var i = 0; i < lakeislands.length; i++) { //go through each element

            buf.writeUInt8(lakeislands[i].x / (game.load(0) / 200)); // pos x of volcano


            buf.writeUInt8(lakeislands[i].y / (game.load(1) / 200)); // pos y of volcano


            buf.writeUInt8(lakeislands[i].radius / 5); // volcano rad but divided by 5.(client takes it *5)


        }
        buf.writeUInt16(foodspot.length);

        for (var i = 0; i < foodspot.length; i++) { //go through each element

            buf.writeUInt8(foodspot[i].x / (game.load(0) / 200)); // pos x of volcano


            buf.writeUInt8(foodspot[i].y / (game.load(1) / 200)); // pos y of volcano




        }
        buf.writeUInt16(waterspot.length);

        for (var i = 0; i < waterspot.length; i++) { //go through each element

            buf.writeUInt8(waterspot[i].x / (game.load(0) / 200)); // pos x of volcano


            buf.writeUInt8(waterspot[i].y / (game.load(1) / 200)); // pos y of volcano

        }
        return buf.dataView.buffer;
    },
    playerevent: function (evnumber, msg) { // Evnumber = Can be seen in client.js. at case 23 for types.
        let realoff = msg ? msg.length + 1 : 0

        var playevent = new MsgWriter(2 + 2 + realoff);
        playevent.writeUInt8(23);
        playevent.writeUInt8(evnumber);
        if (evnumber = 255) {
            playevent.writeString(msg + " ");
        }
        return playevent.dataView.buffer;
    },
    joinresponse: function (resp) { // Evnumber = Can be seen in client.js. at case 23 for types.
        var playevent = new MsgWriter(3);
        playevent.writeUInt8(2);
        playevent.writeUInt8(resp);
        playevent.writeUInt8(1);
        return playevent.dataView.buffer;
    },
    recharge: function (type, usable) { // Evnumber = Can be seen in client.js. at case 23 for types.
        var playevent = new MsgWriter(3);
        playevent.writeUInt8(25);
        playevent.writeUInt8(type);
        playevent.writeUInt8(usable);
        return playevent.dataView.buffer;
    },

    choice: function (msgkind, timer, types) {

        var choicetest = new MsgWriter(6 + types.length + 1);

        choicetest.writeUInt8(24);

        choicetest.writeUInt8(msgkind);

        choicetest.writeUInt8(timer);

        choicetest.writeUInt8(types.length / 3)


        for (var i = 0; i < types.length; i++) { //go through each element

            choicetest.writeUInt8(types[i])



        }


        return choicetest.dataView.buffer;
    },



    isAlive: function () {
        var buf = new MsgWriter(1); //spawned
        buf.writeUInt8(6);
        return buf.dataView.buffer;

    },

    joinResponse: function () {
        var buf = new MsgWriter(3);
        buf.writeUInt8(2);
        buf.writeUInt8(1);
        buf.writeUInt8(0);
        return buf.dataView.buffer;

    },

    death: function (deathreason, deathxp) {
        var buf = new MsgWriter(6)
        buf.writeUInt8(14);
        buf.writeUInt8(deathreason);
        buf.writeUInt32(deathxp);
        return buf.dataView.buffer;
    },


    encode_utf8: function (s) {
        return unescape(encodeURIComponent(s));
    },



    decode_utf8: function (s) {
        return decodeURIComponent(escape(s));
    },

    chat: function (id, mes,) {


        var chatBuf = new MsgWriter(1 + 4 + 2 + this.encode_utf8(mes).length);
        chatBuf.writeUInt8(19); //Opcode

        chatBuf.writeUInt32(id); //Player id
        chatBuf.writeString(mes)

        return chatBuf.dataView.buffer;
    },
    /*
     
     
        devarerequests: function () {
            var buf = new MsgWriter(1)
            buf.writeUInt8(57, 0);
            return buf;
     
        },
     
        new1v1req: function (entity, arr) {
            realOff = 0
     
            realLen = 0
            for (var o = 0; o < arr.length; o++) {
                realLen += 2; //name length
                //   var testval = this.decode_utf8(arr[o].MES);
                var val = this.encode_utf8(arr[o].MES);
                var len = val.length;
                for (var ind = 0; ind < len; ind++) { //name as string in charcodes
                    realLen++;
                };
                realLen += 4;
            };
            var off = 0
            var buf = new MsgWriter(13 + realLen);
            buf.writeUInt8(52);
     
            buf.writeUInt32(entity.id)
     
            buf.writeUInt16(entity.name.length)
     
     
            var realLen = 0;
     
            for (var i = 0; i < arr.length; i++) {
     
     
     
     
                var val = this.encode_utf8(arr[i].MES);
                var len = val.length;
     
     
                for (var ind = 0; ind < len; ind++) { //name as string in charcodes
                    buf.writeUInt8(val.charCodeAt(ind));
                 
                };
            };
     
            buf.writeUInt8(entity.secondaryType)
     
            buf.writeUInt32(entity.xp)
     
            buf.writeUInt16(entity.rank)
     
            buf.writeUInt16(10)
     
            return buf;
     
     
        },
        */
    aniinfo: function (species, playerid, nextxp, secondaryType, predators, preys, tailbite, foods) {

        var aninfo = new MsgWriter(21 + 3 + predators.length
            + preys.length
            + tailbite.length
            + foods.length);
        aninfo.writeUInt8(18); //type 18

        aninfo.writeUInt8(secondaryType);

        aninfo.writeUInt8(species);

        aninfo.writeUInt8(1);

        aninfo.writeUInt32(playerid);

        aninfo.writeUInt32(nextxp);

        //danger animals

        aninfo.writeUInt8(predators.length)

        for (var i = 0; i < predators.length; i++) { //go through each element
            aninfo.writeUInt8(predators[i])

        }
        //prey animals
        aninfo.writeUInt8(preys.length)

        for (var i = 0; i < preys.length; i++) { //go through each element
            aninfo.writeUInt8(preys[i])

        }


        //tailbite
        aninfo.writeUInt8(tailbite.length)

        for (var i = 0; i < tailbite.length; i++) { //go through each element
            aninfo.writeUInt8(tailbite[i])

        }

        //obj edible 
        aninfo.writeUInt8(foods.length)

        for (var i = 0; i < foods.length; i++) { //go through each element
            aninfo.writeUInt8(foods[i])

        }

        return aninfo.dataView.buffer;
    },













    leaderboard: function (youRank, arr) {
        var buf = new MsgWriter('first');
        var leaderboardlen = arr.length
        var top = 1
        for (let i = 0; i < leaderboardlen; i++, top++) {

            buf.writeUInt16(top); //rank


            buf.writeString(arr[i].name); //rank

            if (arr[i].score < 0) {
                arr[i].score = 0
            }
            if (arr[i].score > 3000000000) {
                arr[i].score = 3000000000
            }
            //score
            buf.writeUInt32(arr[i].score);


        };

        var realLen = buf.returnoff()
        var buf = new MsgWriter(4 + realLen);
        buf.writeUInt8(8); //type 8

        buf.writeUInt16(youRank); //own rank

        buf.writeUInt8(leaderboardlen); //num players on board

        var top = 1
        for (let i = 0; i < leaderboardlen; i++, top++) {

            buf.writeUInt16(top); //rank

            buf.writeString(arr[i].name); //rank

            if (arr[i].score < 0) {
                arr[i].score = 0
            }
            if (arr[i].score > 3000000000) {
                arr[i].score = 3000000000
            }
            //score
            buf.writeUInt32(arr[i].score);
        };

        return buf.dataView.buffer;



    },





    worldUpdate: function (x, y, zoom, xp, nextxp, bar, entities_create, entities_upd, entities_del) {
        var buf = new MsgWriter('first')
        //Player info  -  own player
        buf.writeUInt8(4);  //type 4
        buf.writeUInt16(x); //cam x
        buf.writeUInt16(y); //cam y
        buf.writeUInt16(zoom); //zoom
        buf.writeUInt8(2); //isDevMode??? what does that mean?
        if (bar != 0) {
            if (bar.barpercentage >= bar.maxbarpercentage) {
                bar.barpercentage = bar.maxbarpercentage
            }

            c = bar.barpercentage / bar.maxbarpercentage;
            d = c * 100;



            if (d < 0) {
                d = 0
            }

            buf.writeUInt8(d); //bar percentage
            buf.writeUInt8(bar.playerbar); //bar type:   0-WATER    1-AIR  2-LAVA  3-ICE
        } else {
            buf.writeUInt8(0); //bar percentage
            buf.writeUInt8(0); //bar type:   0-WATER    1-AIR  2-LAVA  3-ICE
        }

        buf.writeUInt32(xp); //xp
        c = xp / nextxp;

        d = c * 100;
        if (d > 101) {
            d = 101
        }
        buf.writeUInt8(d); //xp per_n
        buf.writeUInt8(0); //xp per_n

        //FIRSTSEEN OBJECTS START

        //Entity info

        buf.writeUInt16(entities_create.length);

        var off = 18;

        for (var i = 0; i < entities_create.length; i++) {
            var ent = entities_create[i];

            buf.writeUInt8(ent.type); //entity type

            if (ent.type == 2 || ent.type == 14 || ent.type == 86) {
                buf.writeUInt8(ent.secondaryType); //entity secondary type

            }

            buf.writeUInt32(ent.id); //id

            buf.writeUInt16(ent.radius * 4); //radius


            if (ent.x < 0) {
                ent.x = 0
            }
            if (ent.y < 0) {
                ent.y = 0
            }

            if (ent.x > game.load(0)) {
                ent.x = game.load(0) - 1
            }
            if (ent.y > game.load(1)) {
                ent.y = game.load(1) - 1
            }

            buf.writeUInt16(ent.x * 4); //x client registers /4

            buf.writeUInt16(ent.y * 4); //y




            buf.writeUInt8(ent.biome); //current animal biome


            //bit group & flags
            buf.writeUInt8(ent.spawned); //spawned from id(object)  0 = false 1 = true


            buf.writeUInt8(ent.isbiome); //is rectangle obj (biome) -  set to 1 if not /-/-/ since starting bit == 1


            buf.writeUInt8(ent.angleupd); //sends angle - angle of it is updatable not static

            if (ent.spawned) {
                buf.writeUInt32(ent.spawnedby); //x client registers /4

            }
            if (ent.isbiome) {
                buf.writeUInt16(ent.width); //x client registers /4  
                buf.writeUInt16(ent.height); //y
            }
            if (ent.angleupd) {
                //angle update
                var d = 0
                if (ent.type == 14) {
                    d -= 90

                }
                if (ent.angle <= 0) {
                    ent.angle += 360
                }
                if (ent.angle >= 360) {
                    ent.angle -= 360
                }
                var angle = ent.angle + d

                if (angle <= 0) {
                    angle += 360
                }
                if (angle >= 360) {
                    angle -= 360
                }
                buf.writeUInt8(angle / 3); //angle in degrees but: * 3;

            };


            // CUSTOM DATA

            customdata.oncreate(ent, buf)



        };

        //FIRSTSEEN OBJECTS END






        //Update seen objects


        buf.writeUInt16(entities_upd.length); //count of objects to update


        for (var i = 0; i < entities_upd.length; i++) {

            var obj = entities_upd[i];

            buf.writeUInt32(obj.id); //objects id




            if (obj.x < 0) {
                obj.x = 0
            }
            if (obj.y < 0) {
                obj.y = 0
            }


            if (obj.x > game.load(0)) {
                obj.x = game.load(0) - 1
            }
            if (obj.y > game.load(1)) {
                obj.y = game.load(1) - 1
            }

            buf.writeUInt16(obj.x * 4); //x *4



            buf.writeUInt16(obj.y * 4); //y *4





            buf.writeUInt16(obj.radius * 10); //radius *10


            buf.writeUInt8(obj.specType); //specType


            buf.writeUInt8(obj.sendhp); //send Hp


            buf.writeUInt8(obj.hurt); //is hurt


            if (obj.hp != undefined) {
                c = obj.hp / obj.maxhp;
                d = c * 100;

                if (obj.maxhp > obj.hp) {
                    obj.sendhp = true
                } else {
                    obj.sendhp = false
                }
            }

            if (obj.sendhp) {
                if (d < 0) {
                    d = 0
                }
                buf.writeUInt8(d) //hp %

            }
            if (obj.angleupd) {
                //angle update
                var d = 0
                if (obj.type == 14) {
                    d -= 90
                }
                if (obj.angle <= 0) {
                    obj.angle += 360
                }
                if (obj.angle >= 360) {
                    obj.angle -= 360
                }
                var angle = obj.angle + d
                if (angle <= 0) {
                    angle += 360
                }
                if (angle >= 360) {
                    angle -= 360
                }
                buf.writeUInt8(angle / 3) //angle *3


            }
            //custom data
            customdata.onupdate(obj, buf)


        }

        buf.writeUInt16(entities_del.length); //devare objects count

        for (var i = 0; i < entities_del.length; i++) {

            var oldobj = entities_del[i];
            buf.writeUInt32(oldobj.id);

            buf.writeUInt32(oldobj.killerid);

            //end of update seen objects
        };


        var totallen = buf.returnoff()
        var buf = new MsgWriter(totallen);
        //Player info  -  own player
        buf.writeUInt8(4);  //type 4
        buf.writeUInt16(x); //cam x
        buf.writeUInt16(y); //cam y
        buf.writeUInt16(zoom); //zoom
        buf.writeUInt8(2); //isDevMode??? what does that mean?
        if (bar != 0) {
            if (bar.barpercentage >= bar.maxbarpercentage) {
                bar.barpercentage = bar.maxbarpercentage
            }

            c = bar.barpercentage / bar.maxbarpercentage;
            d = c * 100;



            if (d < 0) {
                d = 0
            }

            buf.writeUInt8(d); //bar percentage
            buf.writeUInt8(bar.playerbar); //bar type:   0-WATER    1-AIR  2-LAVA  3-ICE
        } else {
            buf.writeUInt8(0); //bar percentage
            buf.writeUInt8(0); //bar type:   0-WATER    1-AIR  2-LAVA  3-ICE
        }

        buf.writeUInt32(xp); //xp
        c = xp / nextxp;

        d = c * 100;
        if (d > 101) {
            d = 101
        }
        buf.writeUInt8(d); //xp per_n
        buf.writeUInt8(0); //xp per_n

        //FIRSTSEEN OBJECTS START

        //Entity info

        buf.writeUInt16(entities_create.length);

        var off = 18;

        for (var i = 0; i < entities_create.length; i++) {
            var ent = entities_create[i];

            buf.writeUInt8(ent.type); //entity type

            if (ent.type == 2 || ent.type == 14 || ent.type == 86) {
                buf.writeUInt8(ent.secondaryType); //entity secondary type

            }

            buf.writeUInt32(ent.id); //id

            buf.writeUInt16(ent.radius * 4); //radius


            if (ent.x < 0) {
                ent.x = 0
            }
            if (ent.y < 0) {
                ent.y = 0
            }

            if (ent.x > game.load(0)) {
                ent.x = game.load(0) - 1
            }
            if (ent.y > game.load(1)) {
                ent.y = game.load(1) - 1
            }

            buf.writeUInt16(ent.x * 4); //x client registers /4

            buf.writeUInt16(ent.y * 4); //y




            buf.writeUInt8(ent.biome); //current animal biome


            //bit group & flags
            buf.writeUInt8(ent.spawned); //spawned from id(object)  0 = false 1 = true


            buf.writeUInt8(ent.isbiome); //is rectangle obj (biome) -  set to 1 if not /-/-/ since starting bit == 1


            buf.writeUInt8(ent.angleupd); //sends angle - angle of it is updatable not static

            if (ent.spawned) {
                buf.writeUInt32(ent.spawnedby); //x client registers /4

            }
            if (ent.isbiome) {
                buf.writeUInt16(ent.width); //x client registers /4  
                buf.writeUInt16(ent.height); //y
            }
            if (ent.angleupd) {
                //angle update
                var d = 0
                if (ent.type == 14) {
                    d -= 90

                }
                if (ent.angle <= 0) {
                    ent.angle += 360
                }
                if (ent.angle >= 360) {
                    ent.angle -= 360
                }
                var angle = ent.angle + d

                if (angle <= 0) {
                    angle += 360
                }
                if (angle >= 360) {
                    angle -= 360
                }
                buf.writeUInt8(angle / 3); //angle in degrees but: * 3;

            };


            // CUSTOM DATA

            customdata.oncreate(ent, buf)



        };

        //FIRSTSEEN OBJECTS END






        //Update seen objects


        buf.writeUInt16(entities_upd.length); //count of objects to update


        for (var i = 0; i < entities_upd.length; i++) {

            var obj = entities_upd[i];

            buf.writeUInt32(obj.id); //objects id




            if (obj.x < 0) {
                obj.x = 0
            }
            if (obj.y < 0) {
                obj.y = 0
            }


            if (obj.x > game.load(0)) {
                obj.x = game.load(0) - 1
            }
            if (obj.y > game.load(1)) {
                obj.y = game.load(1) - 1
            }

            buf.writeUInt16(obj.x * 4); //x *4



            buf.writeUInt16(obj.y * 4); //y *4





            buf.writeUInt16(obj.radius * 10); //radius *10


            buf.writeUInt8(obj.specType); //specType


            buf.writeUInt8(obj.sendhp); //send Hp


            buf.writeUInt8(obj.hurt); //is hurt


            if (obj.hp != undefined) {
                c = obj.hp / obj.maxhp;
                d = c * 100;

                if (obj.maxhp > obj.hp) {
                    obj.sendhp = true
                } else {
                    obj.sendhp = false
                }
            }

            if (obj.sendhp) {
                if (d < 0) {
                    d = 0
                }
                buf.writeUInt8(d) //hp %

            }
            if (obj.angleupd) {
                //angle update
                var d = 0
                if (obj.type == 14) {
                    d -= 90
                }
                if (obj.angle <= 0) {
                    obj.angle += 360
                }
                if (obj.angle >= 360) {
                    obj.angle -= 360
                }
                var angle = obj.angle + d
                if (angle <= 0) {
                    angle += 360
                }
                if (angle >= 360) {
                    angle -= 360
                }
                buf.writeUInt8(angle / 3) //angle *3


            }
            //custom data
            customdata.onupdate(obj, buf)


        }

        buf.writeUInt16(entities_del.length); //devare objects count

        for (var i = 0; i < entities_del.length; i++) {

            var oldobj = entities_del[i];
            buf.writeUInt32(oldobj.id);

            buf.writeUInt32(oldobj.killerid);

            //end of update seen objects
        };




        return buf.dataView.buffer;

    },










};

/*
var o_biome_land = 1,
  o_animal = 2,
  o_hill = 3,
  o_waterSpot = 4,
  o_hidingHole = 5,
  o_hidingBush = 6,
  o_mudSpot = 7,
  o_rockHill = 8,
  o_bigHidingHole = 9,
  o_lake = 10,
  o_lakeIsland = 11,
  o_biome_ocean = 12,
  o_hidingHoleOcean = 13,
  o_abilityGObj = 14,
  o_fruitTree = 15,
  o_biome_arctic = 16,
  o_arcticIce = 17,
  o_fireBall = 18,
  o_snowBall = 19,
  o_berry = 20,
  o_water = 21,
  o_mushroom = 22,
  o_lillypad = 23,
  o_bigMushroom = 24,
  o_bigMushroomBush = 25,
  o_plankton = 26,
  o_berryBush = 27,
  o_planktonBush = 28,
  o_banana = 29,
  o_coconut = 30,
  o_raspberry = 31,
  o_pear = 32,
  o_beach = 33,
  o_biome_ocean_extraWater = 34,
  o_seaweed = 35,
  o_starfish = 36,
  o_kelp = 37,
  o_clam = 38,
  o_conchShell = 39,
  o_river = 40,
  o_volcano = 42,
  o_lava = 43,
  o_lavaLake = 44,
  o_healingStone = 46,
  o_biome_volcano = 47,
  o_arcticNut = 48,
  o_carrot = 49,
  o_watermelon = 50,
  o_watermelonSlice = 51,
  o_meatSmall = 52,
  o_meatMedium = 53,
  o_meatLarge = 54,
  // poison biome
  o_biome_poison = 55,
  o_poisonBerry = 56,
  o_spiderWeb = 57,
  o_bog = 58,
  o_poisonBall = 59,
  o_cloudBerry = 60,
  o_flock = 61,
  o_flockspot = 62,
  o_egg = 63,
  o_sleigh = 64,
  o_quill = 65,
  o_ostrichEgg = 66,
  o_waterDrop = 67,
  o_beeHive = 68,
  o_honeyComb = 69,
  o_fire = 70,
  o_fireTornado = 71,
  o_sinkHole = 72,
  o_DangerAreaCircle = 73,
  o_animalCarcass = 74,
  o_chilli = 75,
  o_safeArea = 76,
  o_spawnEgg = 77,
  o_teamStone = 78,
  o_biome_desert = 79;
*/


module.exports = writer;