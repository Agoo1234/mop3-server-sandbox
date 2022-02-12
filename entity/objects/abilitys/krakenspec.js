
function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}


function krakenspec(id, by, x, y) {
    this.class = 'Object Ability Immovable'
    this.isdead = false;


    this.id = id;

    this.radius = 0
    this.angleupd = false;
    this.isbiome = false;
    this.specType = 1
    this.specType2 = 0
    this.type = 14; //object type (animal. hill bush)
    this.secondaryType = 5;
    this.biome = 0;
    this.isloaded = false
    this.sendhp = false
    this.spawned = false
    this.spawnedby2 = by
    this.damage = 25;
    this.movable = false
    this.speed = 3 * 5
    this.killerid = 0
    this.isinvisible = false

    this.x = x
    this.y = y
    this.isinquadtree = false
    this.hurt = false
    this.spawnedtime = Date.now();
    setTimeout(() => {
        this.isdead = true

    }, 4000);
    setTimeout(() => {
        this.damage = 0
    }, 500);
    this.veloX = 0
    this.veloY = 0
};


krakenspec.prototype = {

};
krakenspec.prototype.customdatawriteoncreate = function (buf, off) {
}
krakenspec.prototype.customdatawriteonupdate = function (buf, off) {
}

module.exports = krakenspec;