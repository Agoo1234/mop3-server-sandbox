const collisions = require("./collisions")
const collisions2 = require("./collisions2")

const base = require("../../handler/base")
const collidewith = require("./check/collidewith")
const collisionsplayer = require("./check/ownplayercollide")
const checkloaded = require("./check/checkplayerloaded")
const checkplayernormal = require("./check/normalplayercheck")
const entityclear = require("../../modules/entityclear")
const zoomentities = require("../../playergameplay/zoomentities")
const createbot = require("../../entity/bot.js");
const Rectangle = require("../../modules/rectangle")
const game1 = require('../../game')
const utils1 = require("../../modules/IMPmodules/util")
const game = new game1()
const util = new utils1()

var numbertest = 0
function normalworldupd(aobjids, writer, QuadTree, entities, current_websockets, serverstarted) {
    var p = true
    while (p) {
        new entityclear(QuadTree, createbot, entities, current_websockets, aobjids, game, writer)
        p = false
    }
    numbertest++
    if (numbertest > 1) {
        numbertest -= 2
    }

    for (let player in entities) {


        new base(entities, player, aobjids, serverstarted, current_websockets)
        new checkplayernormal(aobjids, current_websockets, entities, player, writer)

        if (serverstarted) {
            new checkloaded(entities, player, current_websockets)
        } else {
            entities[player].isloaded = true
        }
        if (entities[player].isloaded) {

            if (!entities[player].isinquadtree) {
                entities[player].isinquadtree = true
                QuadTree.add(entities[player])

            } else {
                QuadTree.update(entities[player])
            }
        } else {
            entities[player].isinquadtree = false
            QuadTree.remove(entities[player])

        }
        if (entities[player].isloaded) {
            if (entities[player].type == 2) {

                entities[player].isintree = false;
                entities[player].isinhole = false;
                entities[player].hillsnearby = [];
            }
            let timescheck = 2
            if (entities[player].class == "Food" || entities[player].type == 3) {
                timescheck = 1
            }
            var newerrange = new Rectangle(entities[player].x, entities[player].y, entities[player].radius * timescheck, entities[player].radius * timescheck);
            if (!entities[player].isbiome) {
                if (entities[player].pos) {
                    newerrange = new Rectangle(entities[player].pos.x, entities[player].pos.y, entities[player].radius * timescheck, entities[player].radius * timescheck);
                } else {
                    newerrange = new Rectangle(entities[player].x, entities[player].y, entities[player].radius * timescheck, entities[player].radius * timescheck);
                }
            } else {
                newerrange = new Rectangle(entities[player].x, entities[player].y, entities[player].width, entities[player].height);
            }
            let newerentity = QuadTree.query(entities[player], newerrange)
            let confirm = true

            let continues = true
            let continues2 = true

            while (confirm) {
                for (let others in newerentity) {

                    new collisions(entities, newerentity[others].id, entities[player].id, aobjids)
                    new collisions2(entities, entities[player].id, newerentity[others].id)
                    if (entities[player].type == 2) {

                        new collisionsplayer(entities, entities[player].id, newerentity[others].id)
                        if (newerentity[others].type == 3) {
                            if (!entities[player].isflying) {
                                if (entities[player].whichbiome != 5 && entities[player].whichbiome != 6) {
                                    if (!(entities[player].secondaryType == 70 && entities[player].usingability)) {
                                        if (entities[player].flags.includes(26)) {//check if animals is able to climb hills.

                                            let firsthill = new collidewith(entities, entities[player].id, newerentity[others].id)

                                            if (!firsthill.collidestill) {
                                                entities[player].hillsnearby.push({
                                                    id: newerentity[others].id,
                                                    dist: newerentity[others].radius - util.getDistance2D(newerentity[others].x, newerentity[others].y, entities[player].x, entities[player].y)
                                                });

                                            }
                                        }
                                    }
                                }
                            }
                        } entities[player].hillsnearby.sort(function (a, b) {
                            return b.dist - a.dist;
                        });

                        let myhill = entities[player].hillsnearby[0]
                        if (myhill) {
                            entities[player].treerad = myhill.dist / 10
                        } else {
                            entities[player].treerad = 0
                        }
                        if (newerentity[others].type == 9) {

                            if (!entities[player].isflying) {
                                if (continues2) {

                                    let firsthill = new collidewith(entities, entities[player].id, newerentity[others].id)
                                    continues2 = firsthill.hillcheck();
                                    if (!continues2) { entities[player].isinhole = true; }
                                    else entities[player].isinhole = false;
                                }
                            }
                        }
                    }
                }
                confirm = false
            }

        }

        if (entities[player].pos) {
            if (isNaN(entities[player].pos.x)) {
                entities[player].pos.x = entities[player].radius;
            }
            if (isNaN(entities[player].pos.y)) {
                entities[player].pos.y = entities[player].radius;
            }
            if (entities[player].pos.x < entities[player].radius) {

                entities[player].pos.x += entities[player].radius - entities[player].pos.x;
            }
            if (entities[player].pos.x > game.load(0) - entities[player].radius) {

                entities[player].pos.x += (game.load(0) - entities[player].radius) - entities[player].pos.x;
            }
            if (entities[player].pos.y < entities[player].radius) {

                entities[player].pos.y += entities[player].radius - entities[player].pos.y
            }
            if (entities[player].pos.y > game.load(1) - entities[player].radius) {

                entities[player].pos.y += (game.load(1) - entities[player].radius) - entities[player].pos.y
            }
        }
        if (entities[player].x < entities[player].radius) {

            entities[player].x += entities[player].radius - entities[player].x;
        }
        if (entities[player].x > game.load(0) - entities[player].radius) {

            entities[player].x += (game.load(0) - entities[player].radius) - entities[player].x;
        }
        if (entities[player].y < entities[player].radius) {

            entities[player].y += entities[player].radius - entities[player].y
        }
        if (entities[player].y > game.load(1) - entities[player].radius) {

            entities[player].y += (game.load(1) - entities[player].radius) - entities[player].y
        }

    }

    for (let marct in current_websockets) {
        try {
            current_websockets[marct].updategame()
            if (current_websockets[marct].canSend) {

                current_websockets[marct].sendMove();

            } else {
                if (!current_websockets[marct].declareddisconnection) {



                    current_websockets[marct].sendMove();





                    if (entities[current_websockets[marct].spectatingon]) {

                        current_websockets[marct].camx = entities[current_websockets[marct].spectatingon].x;
                        current_websockets[marct].camy = entities[current_websockets[marct].spectatingon].y;
                    }
                    new zoomentities(entities, current_websockets[marct])

                    let trueupd = []
                    let truedel = []
                    let truecreate = []

                    for (let upd in current_websockets[marct].toupdate) {
                        if (current_websockets[marct].toupdate[upd].type != 3) {
                            trueupd.push(current_websockets[marct].toupdate[upd])
                        }
                    }
                    for (let crea in current_websockets[marct].tocreate) {

                        truecreate.push(current_websockets[marct].tocreate[crea])

                    }
                    for (let del in current_websockets[marct].todelete) {

                        truedel.push(current_websockets[marct].todelete[del])

                    }

                    current_websockets[marct].send(writer.worldUpdate(current_websockets[marct].camx * 4, current_websockets[marct].camy * 4, 2000, 0, 100, 0, truecreate, trueupd, truedel));  //x, y, zoom, xp, barType

                    current_websockets[marct].todelete = []
                    current_websockets[marct].tocreate = []

                }

            }

        } catch (error) {

            console.log(error)
        }

    }

}

normalworldupd.prototype = {}
module.exports = normalworldupd