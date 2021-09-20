
function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}


function fire(id, by, x, y, spec, creator) {

    this.class = 'Object Ability'
    this.isdead = false;

    this.id = id;

    this.radius = 0
    this.angleupd = true;
    this.isbiome = false;

    this.specType = spec;

    this.type = 18; //object type (animal. hill bush)
    this.biome = 0;
    this.isloaded = false
    this.sendhp = false
    this.spawned = true
    this.spawnedby = creator

    this.spawnedby2 = by
    this.angle = 0

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
};


fire.prototype = {

};

fire.prototype.customdatawriteoncreate = function (buf, off) {

}
fire.prototype.customdatawriteonupdate = function (buf, off) {

}
module.exports = fire;