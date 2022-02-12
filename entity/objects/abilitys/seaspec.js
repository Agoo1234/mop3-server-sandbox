
function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}


function seaspec(entities, id, by, x, y) {
    this.class = 'Object Ability'
    this.isdead = false;


    this.id = id;

    this.radius = 0
    this.angleupd = false;
    this.isbiome = false;
    this.specType = 1
    this.specType2 = 0
    this.type = 14; //object type (animal. hill bush)
    this.secondaryType = 63
    this.biome = 0;
    this.isloaded = false
    this.sendhp = false
    this.spawned = false
    this.spawnedby2 = by

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
        if (entities[by] != undefined) {
            entities[by].usingability = false
        }
    }, 5000);
    this.veloX = 0
    this.veloY = 0
};


seaspec.prototype = {

};
seaspec.prototype.customdatawriteoncreate = function (buf, off) {
}
seaspec.prototype.customdatawriteonupdate = function (buf, off) {
}

module.exports = seaspec;