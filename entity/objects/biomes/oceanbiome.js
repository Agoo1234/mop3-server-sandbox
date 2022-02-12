
function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}


function ocean(id, x, game, entities, aobjids, oceanextra) {
    this.class = 'Biome'

    this.isdead = false;

    this.id = id;

    this.radius = 1
    this.angleupd = false
    this.isbiome = true;

    this.nameLen = 0
    this.species = 0;
    this.spawned = false

    this.type = 12; //object type (animal. hill bush)
    this.biome = 0;
    this.width = (game.load(0) / (game.load(0) / 1000)) * 2
    this.height = game.load(1) * 0.75;
    this.sendhp = false
    this.isloaded = false



    this.speed = 2.5
    this.killerid = 0
    this.isinvisible = false
    this.movable = false
    this.x = x
    this.y = (game.load(1) / 2) + (game.load(1) / (game.load(1) / 1000));
    this.specType = 0
    this.hurt = false
    this.isinquadtree = false
    this.spawnedtime = Date.now();
    this.veloX = 0
    this.veloY = 0
};


ocean.prototype = {
};
ocean.prototype.customdatawriteoncreate = function (buf, off) {
}
ocean.prototype.customdatawriteonupdate = function (buf, off) {
}

module.exports = ocean;