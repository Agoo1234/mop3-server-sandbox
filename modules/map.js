
const beach = require("../entity/objects/biomes/beach.js");
const land = require("../entity/objects/biomes/landbiome.js");
const ocean = require("../entity/objects/biomes/oceanbiome.js");
const arctic = require("../entity/objects/biomes/arcticbiome.js");
const river = require("../entity/objects/biomes/river.js");
const hill = require("../entity/objects/objects/hill.js");
const lavalake = require("../entity/objects/objects/lavalake.js");


const berryspot = require("../entity/objects/objects/berryspot.js")
const oceanextra = require("../entity/objects/biomes/oceanextrawater.js")
const volcanobiome = require("../entity/objects/biomes/volcanobiome.js")
const volcano = require("../entity/objects/biomes/volcano.js")
const waterspots = require("../entity/objects/objects/waterspot.js")
const lake = require("../entity/objects/objects/lake.js")
const mud = require("../entity/objects/objects/mud.js")
const game1 = require('../game');
const bush = require("../entity/objects/objects/bush.js");
const game = new game1()

var centerx = (game.load(0)) / 2
var centery = 5000
function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}
function rotate(cx, cy, x, y, angle, anticlock_wise = false) {
    if (angle == 0) {
        return { x: parseFloat(x), y: parseFloat(y) };
    } if (anticlock_wise) {
        var radians = (Math.PI / 180) * angle;
    } else {
        var radians = (Math.PI / -180) * angle;
    }
    var cos = Math.cos(radians);
    var sin = Math.sin(radians);
    var nx = (cos * (x - cx)) + (sin * (y - cy)) + cx;
    var ny = (cos * (y - cy)) - (sin * (x - cx)) + cy;
    return { x: nx, y: ny };
}

function map(aobjids, entities) {



    if (game.load(2) != 2) {
        var landobjids = aobjids.giveid(true);
        var oldland = new land(landobjids, game)
        oldland.maxmushroomamount = 0

        entities[landobjids] = oldland;

        var objarcticids = aobjids.giveid(true);
        var oldland = new arctic(objarcticids, game)
        entities[objarcticids] = oldland;
        for (var i = 0; i < 2; i++) { //3x
            var objids = aobjids.giveid(true);

            var a = new ocean(objids, i ? (game.load(0) / (game.load(0) / 1000)) : (game.load(0)) - (game.load(0) / (game.load(0) / 1000)), game, entities, aobjids, oceanextra)

            entities[objids] = a;

            var objidsd = aobjids.giveid(true);
            var d = new beach(objidsd,
                i ? ((game.load(0) / (game.load(0) / 1000)) * 2) + 150 : (game.load(0)) - (game.load(0) / (game.load(0) / 1000) * 2) - 150,
                ((game.load(1) / 2) + (game.load(1) / (game.load(1) / 1000)) - 125),
                300,
                (game.load(1) * 0.75) + 250)
            entities[objidsd] = d;

            var objidsdea = aobjids.giveid(true);
            var ma = new beach(objidsdea, i ? 1000 + 150 : (game.load(0)) - (game.load(0) / (game.load(0) / 1000)) - 150,
                1900,
                2300,
                300)
            entities[objidsdea] = ma;
        }

        for (var i = 0; i < 300; i++) { //3x
            var objids = aobjids.giveid(true);
            var x = randomNumber(0, game.load(0))
            var y = randomNumber(0, game.load(1))
            var a = new hill(objids, x, y)
            entities[objids] = a;
        }
        /*for (var i = 0; i < 50; i++) { //3x
            var objids = aobjids.giveid(true);
            var x = randomNumber(entities[objarcticids].x - entities[objarcticids].width / 2,
                entities[objarcticids].x + entities[objarcticids].width / 2)
            var y = randomNumber(entities[objarcticids].y - entities[objarcticids].height / 2,
                (entities[objarcticids].y - 300) + entities[objarcticids].height / 2)

            var a = new waterspots(objids, x, y)
            entities[objids] = a;
        }
        for (var i = 0; i < 50; i++) { //3x
            var objids = aobjids.giveid(true);
            var x = randomNumber((entities[landobjids].x + 300) - entities[landobjids].width / 2,
                (entities[landobjids].x - 300) + entities[landobjids].width / 2)
            var y = randomNumber(entities[landobjids].y - entities[landobjids].height / 2,
                entities[landobjids].y + entities[landobjids].height / 2)

            var a = new waterspots(objids, x, y)
            entities[objids] = a;
        }
        for (var i = 0; i < 10; i++) { //3x
            var objids = aobjids.giveid(true);
            var x = randomNumber(entities[objarcticids].x - entities[objarcticids].width / 2,
                entities[objarcticids].x + entities[objarcticids].width / 2)
            var y = randomNumber(entities[objarcticids].y - entities[objarcticids].height / 2,
                (entities[objarcticids].y - 300) + entities[objarcticids].height / 2)
            var a = new bush(objids, x, y)
            entities[objids] = a;
        }
        for (var i = 0; i < 30; i++) { //3x
            var objids = aobjids.giveid(true);
            var x = randomNumber((entities[landobjids].x + 300) - entities[landobjids].width / 2,
                (entities[landobjids].x - 300) + entities[landobjids].width / 2)
            var y = randomNumber(entities[landobjids].y - entities[landobjids].height / 2,
                entities[landobjids].y + entities[landobjids].height / 2)
            var a = new bush(objids, x, y)
            entities[objids] = a;
        }
        for (var i = 0; i < 100; i++) { //3x
            var objids = aobjids.giveid(true);
            var x = randomNumber(entities[objarcticids].x - entities[objarcticids].width / 2,
                entities[objarcticids].x + entities[objarcticids].width / 2)
            var y = randomNumber(entities[objarcticids].y - entities[objarcticids].height / 2,
                (entities[objarcticids].y - 300) + entities[objarcticids].height / 2)
            var a = new berryspot(objids, x, y)
            entities[objids] = a;
        }
        for (var i = 0; i < 300; i++) { //3x
            var objids = aobjids.giveid(true);
            var x = randomNumber((entities[landobjids].x + 300) - entities[landobjids].width / 2,
                (entities[landobjids].x - 300) + entities[landobjids].width / 2)
            var y = randomNumber(entities[landobjids].y - entities[landobjids].height / 2,
                entities[landobjids].y + entities[landobjids].height / 2)
            var a = new berryspot(objids, x, y)
            entities[objids] = a;
        }
*/
        var objids = aobjids.giveid(true);
        var oldland = new volcano(objids, centerx, centery)
        entities[objids] = oldland;
        var objids = aobjids.giveid(true);
        var oldland = new volcanobiome(objids, centerx, centery)
        entities[objids] = oldland;

        for (var i = 0; i < 15; i++) {
            var objids = aobjids.giveid(true);
            var nextpos = rotate(centerx, centery, centerx + randomNumber(325, 375), centery, randomNumber(0, 360))
            entities[objids] = new lavalake(objids, nextpos.x, nextpos.y)

        }




        var x = game.load(0) / 2
        var objids = aobjids.giveid(true);
        var river1y = 6500
        var a = new river(objids, x, river1y, (game.load(0) / 2) + 600, 300, 0)



        entities[objids] = a;
        var eobjids = aobjids.giveid(true);

        var river2y = 3500
        var b = new river(eobjids, x, river2y, (game.load(0) / 2) + 600, 300, 1)
        entities[eobjids] = b;
        for (var i = 0; i < 15; i++) { //3x
            var objids = aobjids.giveid(true);

            var x = randomNumber((entities[landobjids].x + 500) - entities[landobjids].width / 2,
                (entities[landobjids].x - 500) + entities[landobjids].width / 2)
            /*     var y = randomNumber((entities[landobjids].y - entities[landobjids].height / 2) + 500,
                    (entities[landobjids].y + entities[landobjids].height / 2) - 500)
    */
            var y = randomNumber(centery - 1000, centery + 1000)
            let newpos = Math.floor(Math.random() * 5);

            if (newpos == 1) {
                y = randomNumber(river2y - 1250, river2y - 500)
            } else if (newpos == 2) {
                y = randomNumber(river1y + 500, river1y + 1250)

            }
            //entities[landobjids] = oldland;
            var a = new mud(objids, x, y)
            entities[objids] = a;
        }
        for (var i = 0; i < 5; i++) { //3x
            var objids = aobjids.giveid(true);

            var x = randomNumber((entities[landobjids].x + 500) - entities[landobjids].width / 2,
                (entities[landobjids].x - 500) + entities[landobjids].width / 2)
            /*     var y = randomNumber((entities[landobjids].y - entities[landobjids].height / 2) + 500,
                    (entities[landobjids].y + entities[landobjids].height / 2) - 500)
    */
            var y = randomNumber(centery - 1000, centery + 1000)
            let newpos = Math.floor(Math.random() * 4);

            if (newpos == 1) {
                y = randomNumber(river2y - 1250, river2y - 500)
            } else if (newpos == 2) {
                y = randomNumber(river1y + 500, river1y + 1250)

            }
            //entities[landobjids] = oldland;
            var a = new lake(objids, x, y)
            entities[objids] = a;
        }
        for (var i = 0; i < 3; i++) { //3x
            var objids = aobjids.giveid(true);
            var a = i + 1

            var x = a * 2000

            var y = randomNumber(0, 1200)
            var a = new lake(objids, x, y)

            entities[objids] = a;
        }
    } else {
        var objids = aobjids.giveid(true);
        var oldland = new land(objids, game)
        oldland.width = game.load(0)
        oldland.height = game.load(1)
        oldland.x = game.load(0) / 2
        oldland.y = game.load(1) / 2
        entities[objids] = oldland;


        for (var i = 0; i < 15; i++) { //3x
            var objids = aobjids.giveid(true);
            var x = randomNumber(0, game.load(0))
            var y = randomNumber(1, game.load(1))
            var a = new waterspots(objids, x, y)
            entities[objids] = a;
        }
    }
}
console.log("Map Loaded")
map.prototype = {}
module.exports = map