
function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}


function seaweed(id, x, y) {
    this.class = 'Food'

    this.isdead = false;

    this.id = id;

    this.radius = randomNumber(20, 30)
    this.isbiome = false;

    this.type = 35; //object type (animal. hill bush)
    this.collideable = true
    this.xp = randomNumber(30000, 65000)
    this.water = 0
    this.energy = 3
    this.spawned = false
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


seaweed.prototype = {







};

seaweed.prototype.customdatawriteoncreate = function (buf, off) {
}
seaweed.prototype.customdatawriteonupdate = function (buf, off) {
}

module.exports = seaweed;