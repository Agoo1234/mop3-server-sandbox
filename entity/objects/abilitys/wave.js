function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}


function waveuse(rad, id, by, x, y, angle, spec) {
    this.class = 'Object Ability'
    this.isdead = false;

    this.id = id;

    this.radius = rad
    this.angleupd = true;
    this.isbiome = false;


    this.specType = spec
    this.specType2 = 0
    this.type = 14; //object type (animal. hill bush)
    this.secondaryType = 28;
    this.biome = 0;
    this.isloaded = false
    this.sendhp = false
    this.spawned = true
    this.spawnedby = by
    this.spawnedby2 = by
    this.angle = angle

    this.movable = false
    this.speed = 9
    this.killerid = 0
    this.isinvisible = false

    this.x = x
    this.y = y
    this.isinquadtree = false
    this.hurt = false
    this.spawnedtime = Date.now();

    setTimeout(() => {
        this.isdead = true
    }, 2000);
    this.veloX = 0
    this.veloY = 0
};


waveuse.prototype = {

};
waveuse.prototype.customdatawriteoncreate = function (buf, off) {
}
waveuse.prototype.customdatawriteonupdate = function (buf, off) {
}

module.exports = waveuse;