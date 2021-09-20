
function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}


function elephanttrunk(id, by, x, y, angle, radius) {
    this.class = 'Object Ability Non Movable'
    this.isdead = false;

    this.id = id;
    this.hassomeone = false
    this.radius = radius
    this.angleupd = true;
    this.isbiome = false;
    this.specType2 = 0
    this.is1v1 = false
    this.specType = 0;
    this.secondaryType = 31;
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

    setTimeout(() => {
        this.isdead = true
    }, 800);
    this.spawnedtime = Date.now();
    this.veloX = 0
    this.veloY = 0
};


elephanttrunk.prototype = {
    stun: function (player) {
        player.timerstunned = 3
    }
};
elephanttrunk.prototype.customdatawriteoncreate = function (buf, off) {

}
elephanttrunk.prototype.customdatawriteonupdate = function (buf, off) {

}

module.exports = elephanttrunk;