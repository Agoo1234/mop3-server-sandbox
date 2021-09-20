
function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}


function spiderweb(id, x, y) {
    this.class = 'Object Ability'
    this.isdead = false;

    this.id = id;

    this.radius = 10
    this.isbiome = false;

    this.specType = 0;
    this.type = 57; //object type (animal. hill bush)
    this.biome = 0
    this.sendhp = false
    this.spawned = false
    this.isloaded = true
    this.specType = 100
    this.movable = false
    this.killerid = 0
    this.isinvisible = false
    this.x = x
    this.y = y
    this.isinquadtree = false
    setTimeout(() => {
        this.isdead = true
    }, 300000);
    this.spawnedtime = Date.now();
    this.veloX = 0
    this.veloY = 0
};
spiderweb.prototype.customdatawriteoncreate = function (buf, off) {
}
spiderweb.prototype.customdatawriteonupdate = function (buf, off) {
}

spiderweb.prototype = {




};


module.exports = spiderweb;