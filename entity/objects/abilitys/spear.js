
function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}


function spear(id, by, x, y, angle, rad, spec, spec2, speartype) {
    this.class = 'Object Ability'
    this.isdead = false;
    this.speartype = speartype
    this.id = id;

    this.radius = rad
    this.angleupd = true;
    this.isbiome = false;
    this.specType = spec;
    this.specType2 = spec2;
    this.is1v1 = false
    this.secondaryType = 81;
    this.type = 14; //object type (animal. hill bush)
    this.biome = 0;
    this.isloaded = false;
    this.sendhp = false
    this.spawned = false


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

    this.veloX = 0
    this.veloY = 0

    this.victimID = 0;
    this.flying = true;
};


spear.prototype = {

};

spear.prototype.customdatawriteoncreate = function (buf, off) {
}
spear.prototype.customdatawriteonupdate = function (buf, off) {
}
module.exports = spear;