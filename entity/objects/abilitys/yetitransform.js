function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}


function yetitransform(rad, id, by, x, y) {
    this.class = 'Object Ability'
    this.isdead = false;

    this.id = id;

    this.radius = rad * 4
    this.angleupd = false;
    this.isbiome = false;
    this.specType = 0
    this.specType2 = 0
    this.type = 14; //object type (animal. hill bush)
    this.secondaryType = 11;
    this.biome = 0;
    this.isloaded = false
    this.sendhp = false
    this.spawned = true
    this.spawnedby = by
    this.spawnedby2 = by


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
    }, 900);
    this.veloX = 0
    this.veloY = 0
};


yetitransform.prototype = {

};
yetitransform.prototype.customdatawriteoncreate = function (buf, off) {
}
yetitransform.prototype.customdatawriteonupdate = function (buf, off) {
}


module.exports = yetitransform;