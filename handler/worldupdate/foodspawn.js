const utils1 = require("../../modules/IMPmodules/util")
const util = new utils1()
const mushroom = require("../../entity/objects/food/mushroom.js")
const redmushroom = require("../../entity/objects/food/redmushroom.js")

const watermelon = require("../../entity/objects/food/watermelon.js")
const watermelonslice = require("../../entity/objects/food/watermelonslice.js")

const waterberry = require("../../entity/objects/food/waterberry.js")

const berry = require("../../entity/objects/food/berry.js")
function foodspawn(entities, objectid, aobjids) {
    if (entities[objectid].isloaded) {
        if (entities[objectid].spawnedtime + 5000 < Date.now()) {
            switch (entities[objectid].type) {


                case 1:
                    if (entities[objectid].mushroomamount < entities[objectid].maxmushroomamount) {
                        let random = util.randomNumber(0, 100)

                        entities[objectid].addedmushroom();
                        let objids = aobjids.giveid(true);
                        let newpos = {
                            x: util.randomNumber(entities[objectid].x - entities[objectid].width / 2,
                                entities[objectid].x + entities[objectid].width / 2

                            )
                            , y: util.randomNumber(entities[objectid].y - entities[objectid].height / 2,
                                entities[objectid].y + entities[objectid].height / 2)
                        }
                        if (util.isnumbcorrectbetween(0, 15, random)) {
                            entities[objids] = new redmushroom(objids, entities[objectid].id, newpos.x, newpos.y)
                        } else {
                            entities[objids] = new mushroom(objids, entities[objectid].id, newpos.x, newpos.y)
                        }

                    }
                    break;
                case 4:
                    if (entities[objectid].foodamount < 12) {
                        let objids = aobjids.giveid(true);
                        let newpos = util.rotate(entities[objectid].x, entities[objectid].y, entities[objectid].x + entities[objectid].radius, entities[objectid].y, util.randomNumber(0, 360))
                        entities[objectid].addedfood();
                        entities[objids] = new waterberry(objids, entities[objectid].id, newpos.x, newpos.y)
                    }
                    break
                case 27:
                    if (entities[objectid].foodamount < 10) {
                        let objids = aobjids.giveid(true);
                        let newpos = util.rotate(entities[objectid].x, entities[objectid].y, entities[objectid].x + entities[objectid].radius, entities[objectid].y, util.randomNumber(0, 360))
                        entities[objectid].addedfood();
                        entities[objids] = new berry(objids, entities[objectid].id, newpos.x, newpos.y)
                    }
                    break
                case 44:
                    if (entities[objectid].foodamount < 2) {
                        let which = (Math.floor(Math.random() * 2))
                        entities[objectid].addedfood()
                        if (which == 1) {
                            let objids = aobjids.giveid(true);
                            let newpos = util.rotate(entities[objectid].x, entities[objectid].y, entities[objectid].x + util.randomNumber(entities[objectid].radius / 2, entities[objectid].radius), entities[objectid].y, util.randomNumber(0, 360))
                            entities[objids] = new watermelon(objids, entities[objectid].id, newpos.x, newpos.y)

                        } else {
                            let objids = aobjids.giveid(true);
                            let newpos = util.rotate(entities[objectid].x, entities[objectid].y, entities[objectid].x + util.randomNumber(entities[objectid].radius / 2, entities[objectid].radius), entities[objectid].y, util.randomNumber(0, 360))
                            entities[objids] = new watermelonslice(objids, entities[objectid].id, newpos.x, newpos.y)

                        }
                    }
                    break
            }
        }
    }
}
foodspawn.prototype = {}
module.exports = foodspawn