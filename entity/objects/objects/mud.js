
function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}


function lake(id, x, y) {
    this.class = 'Object'
    this.isdead = false;

    this.id = id;

    this.radius = 250
    this.isbiome = false;

    this.specType = 0;
    this.type = 7; //object type (animal. hill bush)
    this.biome = 0
    this.sendhp = false
    this.spawned = false
    this.isloaded = true
    this.foodamount = 0

    this.movable = false
    this.speed = 100
    this.killerid = 0
    this.isinvisible = false
    this.x = x
    this.y = y
    this.isinquadtree = false
    this.spawnedtime = Date.now();
    this.veloX = 0
    this.veloY = 0
};

lake.prototype.customdatawriteoncreate = function (buf, off) {
}
lake.prototype.customdatawriteonupdate = function (buf, off) {
}

lake.prototype = {



    lowerfood: function () {
        this.foodamount--
    },
    addedfood: function () {
        this.foodamount++
    },



};


module.exports = lake;