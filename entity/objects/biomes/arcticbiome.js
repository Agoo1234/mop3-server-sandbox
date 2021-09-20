
function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}


function arcticbiome(id, game) {
    this.class = 'Biome'

    this.isdead = false;

    this.id = id;

    this.radius = 1
    this.angleupd = false
    this.isbiome = true;

    this.nameLen = 0
    this.species = 0;
    this.spawned = false

    this.type = 16; //object type (animal. hill bush)
    this.biome = 0;
    this.width = game.load(0);
    this.height = game.load(1) / 4;
    this.sendhp = false
    this.isloaded = false


    this.foodamount = 0
    this.maxfoodamount = 40
    this.speed = 2.5
    this.killerid = 0
    this.isinvisible = false
    this.movable = false
    this.x = game.load(0) / 2;
    this.y = game.load(1) / (game.load(1) / 1000);
    this.specType = 0
    this.hurt = false
    this.isinquadtree = false
    this.spawnedtime = Date.now();
    this.veloX = 0
    this.veloY = 0
};


arcticbiome.prototype = {
};
arcticbiome.prototype.customdatawriteoncreate = function (buf, off) {
}
arcticbiome.prototype.customdatawriteonupdate = function (buf, off) {
}

module.exports = arcticbiome;