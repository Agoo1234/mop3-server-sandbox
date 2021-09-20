
function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}


function trexbite(id, by, x, y, angle) {
    this.class = 'Object Ability Non Movable'
    this.isdead = false;

    this.id = id;
    this.hassomeone = false
    this.radius = 0
    this.angleupd = true;
    this.isbiome = false;
    this.specType2 = 0
    this.is1v1 = false
    this.specType = 0;
    this.secondaryType = 37;
    this.type = 14; //object type (animal. hill bush)
    this.biome = 0;
    this.isloaded = false;
    this.sendhp = false
    this.spawned = false
    this.biteid = 0
    this.spawnedby2 = by
    this.angle = angle

    this.movable = false
    this.speed = 0
    this.killerid = 0
    this.isinvisible = false

    this.x = x
    this.y = y
    this.isinquadtree = false
    this.hurt = false
    this.spawnedtime = Date.now();

    setTimeout(() => {
        this.isinvisible = true
        if (this.biteid == 0) {
            this.isdead = true
        }
    }, 200);
    setTimeout(() => {
        if (!this.isdead) {
            this.isdead = true
        }
    }, 3500);
    this.veloX = 0
    this.veloY = 0
};


trexbite.prototype = {
    stun: function (player) {
        player.timerstunned = 3
    }
};


trexbite.prototype.customdatawriteoncreate = function (buf, off) {
}
trexbite.prototype.customdatawriteonupdate = function (buf, off) {
}
module.exports = trexbite;