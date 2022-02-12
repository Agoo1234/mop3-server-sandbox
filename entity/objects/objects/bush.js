
function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}


function bush(id, x, y) {
    this.class = 'Object'
    this.isdead = false;

    this.id = id;

    this.radius = 40
    this.isbiome = false;

    this.specType = 0;
    this.type = 6; //object type (animal. hill bush)
    this.biome = 0
    this.sendhp = false
    this.spawned = false
    this.isloaded = true
    this.foodamount = 0
    this.movable = true
    this.speed = 50
    this.killerid = 0
    this.isinvisible = false
    this.x = x
    this.y = y
    this.isinquadtree = false
    this.veloX = 0
    this.veloY = 0

    this.spawnedtime = Date.now();

};
bush.prototype.customdatawriteoncreate = function (buf, off) {
}
bush.prototype.customdatawriteonupdate = function (buf, off) {
}

bush.prototype = {



    lowerfood: function () {
        this.foodamount--
    },
    addedfood: function () {
        this.foodamount++
    },



};


module.exports = bush;