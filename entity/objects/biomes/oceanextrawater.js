
function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}


function oceanextra(id, centerx, centery, by) {
    this.class = 'Biome'
    this.isdead = false;

    this.id = id;

    this.radius = 500
    this.isbiome = false;

    this.type = 34; //object type (animal. hill bush)


    this.sendhp = false
    this.spawned = false
    this.isloaded = true
    this.spawnedby2 = by
    this.movable = false
    this.killerid = 0
    this.isinvisible = false
    this.x = centerx
    this.y = centery
    this.isinquadtree = false
    this.spawnedtime = Date.now();
    this.veloX = 0
    this.veloY = 0
};


oceanextra.prototype = {
};
oceanextra.prototype.customdatawriteoncreate = function (buf, off) {
}
oceanextra.prototype.customdatawriteonupdate = function (buf, off) {
}


module.exports = oceanextra;