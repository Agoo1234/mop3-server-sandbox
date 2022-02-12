
function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}


function throwroar(id, by, x, y) {
    this.class = 'Object Ability Non Movable'
    this.isdead = false;

    this.id = id;

    this.radius = 0
    this.angleupd = true;
    this.isbiome = false;
    this.specType2 = 0
    this.is1v1 = false
    this.specType = 0;
    this.secondaryType = 18
    this.type = 14; //object type (animal. hill bush)
    this.biome = 0;
    this.isloaded = false;
    this.sendhp = false
    this.spawned = true
    this.spawnedby = by
    this.spawnedby2 = by
    this.angle = angle

    this.movable = false

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


throwroar.prototype = {
    stun: function (player) {
        player.timerstunned = 3
    }
};

throwroar.prototype.customdatawriteoncreate = function (buf, off) {
}
throwroar.prototype.customdatawriteonupdate = function (buf, off) {
}
module.exports = throwroar;