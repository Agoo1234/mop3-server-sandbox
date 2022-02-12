
function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}


function firetornado(id, by, x, y) {
    this.class = 'Object Ability'
    this.isdead = false;

    this.id = id;

    this.radius = 0
    this.angleupd = false;
    this.isbiome = false;
    this.angle = 0
    this.specType = 0;

    this.type = 71; //object type (animal. hill bush)
    this.biome = 0;
    this.spawnedby = by
    this.spawnedby2 = by
    this.sendhp = false

    this.maxhp = 100;
    this.hp = this.maxhp;

    this.regenhp = 0;
    this.lasthp = this.maxhp;
    this.spawned = true
    this.isloaded = false
    this.lastuse = Date.now() + 2500;
    this.movable = true
    this.speed = 5
    this.killerid = 0
    this.isinvisible = false
    this.isinquadtree = false
    this.isready = false
    this.x = x

    this.y = y

    this.spawnedtime = Date.now();

    setTimeout(() => {
        this.isready = true
    }, 2000);
    setTimeout(() => {
        this.isdead = true
    }, 80000);
    this.veloX = 0
    this.veloY = 0
};


firetornado.prototype = {


};
firetornado.prototype.customdatawriteoncreate = function (buf, off) {
}
firetornado.prototype.customdatawriteonupdate = function (buf, off) {
}

module.exports = firetornado;