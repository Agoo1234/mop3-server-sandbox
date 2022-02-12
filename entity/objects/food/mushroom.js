
function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}


function mushroom(id, by, x, y) {
    this.class = 'Food'

    this.isdead = false;

    this.id = id;

    this.radius = randomNumber(15, 20)
    this.isbiome = false;

    this.type = 22; //object type (animal. hill bush)

    this.xp = randomNumber(10, 50)
    this.water = 0
    this.energy = 3
    this.spawned = false
    this.spawnedby2 = by
    this.isloaded = false
    this.biome = 0
    this.collideable = true
    this.movable = true
    this.speed = 10
    this.killerid = 0
    this.isinvisible = false
    this.x = x
    this.y = y
    this.isinquadtree = false
    this.lowestrespawnsec = 20
    this.bigestrespawnsec = 40
    this.deathtime = 80
    this.veloX = 0
    this.veloY = 0
    this.spawnedtime = Date.now();
};


mushroom.prototype = {







};
mushroom.prototype.customdatawriteoncreate = function (buf, off) {
}
mushroom.prototype.customdatawriteonupdate = function (buf, off) {
}

module.exports = mushroom;