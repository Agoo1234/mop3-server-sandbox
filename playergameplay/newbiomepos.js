
function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}

function etspawnbiome(entities, a) {

    var land = []
    var ocean = []
    var arctic = []
    var volcano = []
    for (var i in entities) {
        if (entities[i].type == 1) {
            land.push(entities[i].id)
        }
        if (entities[i].type == 12) {
            ocean.push(entities[i].id)
        }
        if (entities[i].type == 16) {
            arctic.push(entities[i].id)
        }
        if (entities[i].type == 47) {
            volcano.push(entities[i].id)
        }
    }

    if (a.spawnbiome == 0) {
        if (a.biome == 0) return;
        randomtype = Math.floor(Math.random() * land.length);

        a.pos.x = randomNumber(entities[land[randomtype]].x - entities[land[randomtype]].width / 2, entities[land[randomtype]].x + entities[land[randomtype]].width / 2)
        a.pos.y = randomNumber(entities[land[randomtype]].y - entities[land[randomtype]].height / 2, entities[land[randomtype]].y + entities[land[randomtype]].height / 2)
    }

    if (a.spawnbiome == 1) {//ocean
        if (a.biome == 1) return;
        randomtype = Math.floor(Math.random() * ocean.length);

        a.pos.x = randomNumber(entities[ocean[randomtype]].x - entities[ocean[randomtype]].width / 2, entities[ocean[randomtype]].x + entities[ocean[randomtype]].width / 2)
        a.pos.y = randomNumber(entities[ocean[randomtype]].y - entities[ocean[randomtype]].height / 2, entities[ocean[randomtype]].y + entities[ocean[randomtype]].height / 2)

    }
    if (a.spawnbiome == 2) {//arctic
        if (a.biome == 2) return;
        randomtype = Math.floor(Math.random() * arctic.length);

        a.pos.x = randomNumber(entities[arctic[randomtype]].x - entities[arctic[randomtype]].width / 2, entities[arctic[randomtype]].x + entities[arctic[randomtype]].width / 2)
        a.pos.y = randomNumber(entities[arctic[randomtype]].y - entities[arctic[randomtype]].height / 2, entities[arctic[randomtype]].y + entities[arctic[randomtype]].height / 2)


    }
    if (a.spawnbiome == 3) {//lava
        if (a.biome == 3 || a.biome == 4) return;
        randomtype = Math.floor(Math.random() * volcano.length);
        a.pos.x = randomNumber(entities[volcano[randomtype]].x - entities[volcano[randomtype]].radius / 2, entities[volcano[randomtype]].x + entities[volcano[randomtype]].radius / 2)
        a.pos.y = randomNumber(entities[volcano[randomtype]].y - entities[volcano[randomtype]].radius / 2, entities[volcano[randomtype]].y + entities[volcano[randomtype]].radius / 2)
    }
}
etspawnbiome.prototype = {}
module.exports = etspawnbiome