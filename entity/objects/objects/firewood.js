
function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}


function firewood(id, x, y, by) {
    this.class = 'Object'
    this.isdead = false;

    this.id = id;

    this.radius = 40
    this.isbiome = false;
    this.lastfire = 0
    this.specType = 0;
    this.type = 87; //object type (animal. hill bush)
    this.biome = 0
    this.sendhp = false
    this.spawned = false
    this.isloaded = true
    this.foodamount = 0
    this.movable = true
    this.spawnedby2 = by
    this.killerid = 0
    this.isinvisible = false
    this.x = x
    this.y = y
    this.isinquadtree = false
    this.veloX = 0
    this.veloY = 0

    this.spawnedtime = Date.now();

};
firewood.prototype.customdatawriteoncreate = function (buf, off) {
}
firewood.prototype.customdatawriteonupdate = function (buf, off) {
}

firewood.prototype = {




};


module.exports = firewood;