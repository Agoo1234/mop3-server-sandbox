
function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}


function volcano(id, centerx, centery) {
    this.class = 'Biome'

    this.isdead = false;

    this.id = id;

    this.radius = 150
    this.isbiome = false;

    this.specType = 0;
    this.type = 42; //object type (animal. hill bush)

    this.sendhp = false
    this.spawned = false
    this.isloaded = false

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


volcano.prototype = {

};
volcano.prototype.customdatawriteoncreate = function (buf, off) {
}
volcano.prototype.customdatawriteonupdate = function (buf, off) {
}

module.exports = volcano;