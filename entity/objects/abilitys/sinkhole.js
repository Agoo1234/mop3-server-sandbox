
function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}


function sinkhole(id, by, x, y, rad) {
    this.class = 'Object Ability Non Movable'
    this.isdead = false;


    this.id = id;

    this.radius = rad
    this.angleupd = false;
    this.isbiome = false;
    this.specType = 0

    this.type = 72; //object type (animal. hill bush)
    this.biome = 0;
    this.isloaded = false
    this.sendhp = false
    this.spawned = false
    this.spawnedby2 = by
    this.colorname = 1
    this.movable = false
    this.speed = 2 * 5
    this.killerid = 0
    this.isinvisible = false

    this.x = x
    this.y = y

    this.hurt = false
    this.isinquadtree = false
    this.spawnedtime = Date.now();
    setTimeout(() => {
        this.isdead = true
    }, 5000);
    this.veloX = 0
    this.veloY = 0
};


sinkhole.prototype = {
    burn: function (player) {
        player.timerburned = 3
    }
};
sinkhole.prototype.customdatawriteoncreate = function (buf, off) {
}
sinkhole.prototype.customdatawriteonupdate = function (buf, off) {
}

module.exports = sinkhole;