


function snowball(id, x, y, by, effect) {
    this.class = 'Object'
    this.isdead = false;

    this.id = id;

    this.radius = 15
    this.isbiome = false;
    this.effect = effect

    this.type = 19; //object type (animal. hill bush)
    this.biome = 0
    this.sendhp = false
    this.spawned = true
    this.spawnedby = by
    this.spawnedby2 = by
    this.isloaded = false
    this.speed = 5

    this.movable = true
    this.killerid = 0
    this.isinvisible = false
    this.x = x
    this.y = y
    this.isinquadtree = false
    setTimeout(() => {
        this.spawnedby = 0
    }, 50);
    setTimeout(() => {
        this.isdead = true
    }, 3000);
    this.spawnedtime = Date.now();
    this.veloX = 0
    this.veloY = 0
};

snowball.prototype.customdatawriteoncreate = function (buf, off) {
}
snowball.prototype.customdatawriteonupdate = function (buf, off) {
}
snowball.prototype = {



    lowerfood: function () {
        this.foodamount--
    },
    addedfood: function () {
        this.foodamount++
    },



};


module.exports = snowball;