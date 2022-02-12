
function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}


function lavalake(id, x, y) {
    this.class = 'Biome'
    this.isdead = false;

    this.id = id;

    this.radius = randomNumber(75, 155)
    this.isbiome = false;

    this.specType = 0;
    this.type = 44; //object type (animal. hill bush)

    this.sendhp = false
    this.spawned = false
    this.isloaded = true
    this.foodamount = 0

    this.movable = false
    this.speed = 1
    this.killerid = 0
    this.isinvisible = false
    this.x = x
    this.y = y

    this.isinquadtree = false
    setTimeout(() => {
        this.movable = false
    }, 3000);
    this.spawnedtime = Date.now();
    this.veloX = 0
    this.veloY = 0
};


lavalake.prototype = {



    lowerfood: function () {
        this.foodamount--
    },
    addedfood: function () {
        this.foodamount++
    },



};
lavalake.prototype.customdatawriteoncreate = function (buf, off) {
}
lavalake.prototype.customdatawriteonupdate = function (buf, off) {
}


module.exports = lavalake;