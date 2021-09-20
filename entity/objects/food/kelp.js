
function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}


function kelp(id, x, y) {
    this.class = 'Food'

    this.isdead = false;

    this.id = id;

    this.radius = randomNumber(40, 60)
    this.isbiome = false;

    this.type = 37; //object type (animal. hill bush)
    this.collideable = true
    this.xp = randomNumber(100000, 200000)
    this.water = 0
    this.energy = 5
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
    this.spawnedtime = Date.now();
    this.deathtime = 80
};


kelp.prototype = {







};

kelp.prototype.customdatawriteoncreate = function (buf, off) {
}
kelp.prototype.customdatawriteonupdate = function (buf, off) {
}

module.exports = kelp;