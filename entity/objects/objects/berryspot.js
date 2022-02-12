
function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}


function berryspot(id, x, y) {
    this.class = 'Object Food Gen'
    this.isdead = false;

    this.id = id;

    this.radius = 40
    this.isbiome = false;

    this.specType = 0;
    this.type = 27; //object type (animal. hill bush)
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
    setTimeout(() => {
        this.movable = false
    }, 3000);
    this.spawnedtime = Date.now();

};
berryspot.prototype.customdatawriteoncreate = function (buf, off) {
}
berryspot.prototype.customdatawriteonupdate = function (buf, off) {
}

berryspot.prototype = {



    lowerfood: function () {
        this.foodamount--
    },
    addedfood: function () {
        this.foodamount++
    },



};


module.exports = berryspot;