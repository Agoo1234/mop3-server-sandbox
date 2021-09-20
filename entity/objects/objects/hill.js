
function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}


function hill(id, x, y) {
    this.class = 'Object'
    this.isdead = false;

    this.id = id;

    this.radius = randomNumber(80, 120)
    this.angleupd = false;
    this.isbiome = false;

    this.specType = 0;

    this.type = 3; //object type (animal. hill bush)
    this.biome = 0;

    this.sendhp = false
    this.spawned = false
    this.isloaded = true


    this.movable = false
    this.speed = 15
    this.killerid = 0
    this.isinvisible = false
    this.isinquadtree = false
    this.x = x
    this.y = y
    this.veloX = 0
    this.veloY = 0
    this.spawnedtime = Date.now();
};


hill.prototype = {







};

hill.prototype.customdatawriteoncreate = function (buf, off) {
}
hill.prototype.customdatawriteonupdate = function (buf, off) {
}

module.exports = hill;