
function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}


function tailslap(id, by, x, y, angle, spec, radius) {
    this.class = 'Object Ability Non Movable'
    this.isdead = false;

    this.id = id;

    this.radius = radius
    this.angleupd = true;
    this.isbiome = false;
    this.specType2 = 0
    this.is1v1 = false
    this.specType = spec;
    this.secondaryType = 74
    this.type = 14; //object type (animal. hill bush)
    this.biome = 0;
    this.isloaded = false;
    this.sendhp = false
    this.spawned = true
    this.spawnedby = by
    this.spawnedby2 = by
    this.angle = angle

    this.movable = false
    this.speed = 200
    this.killerid = 0
    this.isinvisible = false

    this.x = x
    this.y = y
    this.isinquadtree = false
    this.hurt = false
    this.spawnedtime = Date.now();

    setTimeout(() => {
        this.isdead = true
    }, 600);
    this.veloX = 0
    this.veloY = 0
};


tailslap.prototype = {

};

tailslap.prototype.customdatawriteoncreate = function (buf, off) {
}
tailslap.prototype.customdatawriteonupdate = function (buf, off) {
}
module.exports = tailslap;