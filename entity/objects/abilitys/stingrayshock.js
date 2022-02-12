
function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}


function stingrayshock(id, by, x, y, rad, damage, time) {
    this.class = 'Object Ability Immovable'
    this.isdead = false;


    this.id = id;
    this.stuntime = time
    this.radius = rad;
    this.angleupd = false;
    this.isbiome = false;
    this.specType = 0
    this.specType2 = 0
    this.type = 14; //object type (animal. hill bush)
    this.secondaryType = 3;
    this.biome = 0;
    this.isloaded = false
    this.sendhp = false
    this.spawned = false
    this.spawnedby2 = by
    this.damage = damage;
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

    }, 200);
    this.veloX = 0
    this.veloY = 0
};


stingrayshock.prototype = {

};

stingrayshock.prototype.customdatawriteoncreate = function (buf, off) {
}
stingrayshock.prototype.customdatawriteonupdate = function (buf, off) {
}
module.exports = stingrayshock;