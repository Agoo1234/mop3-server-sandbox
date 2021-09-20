
function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}


function beach(id, x, y, w, h) {
    this.class = 'Biome'

    this.isdead = false;

    this.id = id;

    this.radius = 1
    this.angleupd = false
    this.isbiome = true;
    this.species = 0;
    this.spawned = false

    this.type = 33; //object type (animal. hill bush)
    this.biome = 0;
    this.width = w
    this.height = h
    this.sendhp = false
    this.isloaded = false


    this.foodamount = 0
    this.maxfoodamount = 0
    this.speed = 2.5
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


beach.prototype = {
};
beach.prototype.customdatawriteoncreate = function (buf, off) {
}
beach.prototype.customdatawriteonupdate = function (buf, off) {
}


module.exports = beach;