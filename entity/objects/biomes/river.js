
function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}


function river(id, x, y, w, h, spec) {
    this.class = 'Biome'

    this.isdead = false;

    this.id = id;

    this.radius = 1
    this.angleupd = false
    this.isbiome = true;
    this.specType = spec
    this.nameLen = 0
    this.species = 0;
    this.spawned = false

    this.type = 40; //object type (animal. hill bush)
    this.biome = 0;
    this.width = w
    this.height = h
    this.sendhp = false
    this.isloaded = false



    this.speed = 4.5
    this.killerid = 0
    this.isinvisible = false
    this.movable = false
    this.x = x
    this.y = y
    this.isinquadtree = false
    this.hurt = false
    this.spawnedtime = Date.now();
    this.veloX = 0
    this.veloY = 0
};


river.prototype = {
};
river.prototype.customdatawriteoncreate = function (buf, off) {
}
river.prototype.customdatawriteonupdate = function (buf, off) {
}

module.exports = river;