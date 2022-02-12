
function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}


function land(id, game) {
    this.class = 'Biome'

    this.isdead = false;

    this.id = id;

    this.radius = 1
    this.angleupd = false
    this.isbiome = true;

    this.nameLen = 0
    this.species = 0;
    this.spawned = false

    this.type = 1; //object type (animal. hill bush)
    this.width = game.load(0) - (game.load(0) / ((game.load(0) / 1000))) * 4

    this.height = game.load(1) * 0.75
    this.sendhp = false
    this.isloaded = false

    this.maxmushroomamount = 200
    this.mushroomamount = 0
    this.speed = 2.5
    this.killerid = 0
    this.isinvisible = false
    this.movable = false
    this.x = game.load(0) / 2;
    this.y = game.load(1) / 2 + (game.load(1) / (game.load(1) / 1000));
    this.specType = 0
    this.hurt = false
    this.isinquadtree = false
    this.spawnedtime = Date.now();
    this.veloX = 0
    this.veloY = 0
};


land.prototype = {


    lowermushroom: function () {
        this.mushroomamount--
    },
    addedmushroom: function () {
        this.mushroomamount++
    },

    //land functions here

};
land.prototype.customdatawriteoncreate = function (buf, off) {
}
land.prototype.customdatawriteonupdate = function (buf, off) {
}

module.exports = land;