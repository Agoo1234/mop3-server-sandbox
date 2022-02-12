
function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}


function volcanobiome(id, centerx, centery) {
    this.class = 'Biome'
    this.isdead = false;

    this.id = id;

    this.radius = 600
    this.isbiome = false;

    this.type = 47; //object type (animal. hill bush)


    this.sendhp = false
    this.spawned = false
    this.isloaded = true

    this.movable = false
    this.speed = 100
    this.killerid = 0
    this.isinvisible = false
    this.x = centerx
    this.y = centery
    this.isinquadtree = false
    this.spawnedtime = Date.now();
    this.veloX = 0
    this.veloY = 0
};


volcanobiome.prototype = {

};

volcanobiome.prototype.customdatawriteoncreate = function (buf, off) {
}
volcanobiome.prototype.customdatawriteonupdate = function (buf, off) {
}
module.exports = volcanobiome;