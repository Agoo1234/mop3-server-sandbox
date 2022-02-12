
function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}


function waterberry(id, by, x, y) {
    this.class = 'Food'
    this.isdead = false;

    this.id = id;

    this.radius = randomNumber(10, 15)
    this.isbiome = false;

    this.type = 21; //object type (animal. hill bush)
    this.collideable = false
    this.xp = 0
    this.water = 3
    this.energy = 0
    this.spawned = true
    this.isloaded = false
    this.spawnedby = by
    this.spawnedby2 = by
    this.biome = 0
    this.movable = true
    this.speed = 10
    this.killerid = 0
    this.isinvisible = false
    this.x = x
    this.y = y
    this.isinquadtree = false
    this.lowestrespawnsec = 30
    this.bigestrespawnsec = 60
    this.veloX = 0
    this.veloY = 0
    this.deathtime = 80
    this.spawnedtime = Date.now();
};


waterberry.prototype = {







};

waterberry.prototype.customdatawriteoncreate = function (buf, off) {
}
waterberry.prototype.customdatawriteonupdate = function (buf, off) {
}
module.exports = waterberry;