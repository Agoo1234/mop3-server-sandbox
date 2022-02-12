
function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}


function redmushroom(id, by, x, y) {
    this.class = 'Food'

    this.isdead = false;

    this.id = id;

    this.radius = randomNumber(20, 25)
    this.isbiome = false;

    this.type = 24; //object type (animal. hill bush)

    this.xp = randomNumber(100, 200)
    this.water = 0
    this.energy = 3
    this.collideable = true
    this.spawned = false
    this.spawnedby2 = by
    this.isloaded = false
    this.biome = 0
    this.movable = true
    this.speed = 10
    this.killerid = 0
    this.isinvisible = false
    this.x = x
    this.y = y
    this.isinquadtree = false
    this.lowestrespawnsec = 20
    this.bigestrespawnsec = 40
    this.veloX = 0
    this.veloY = 0
    this.deathtime = 80
    this.spawnedtime = Date.now();
};


redmushroom.prototype = {







};
redmushroom.prototype.customdatawriteoncreate = function (buf, off) {
}
redmushroom.prototype.customdatawriteonupdate = function (buf, off) {
}

module.exports = redmushroom;