
function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}


function watermelonslice(id, newid, x, y) {
    this.class = 'Food'

    this.isdead = false;

    this.id = id;

    this.radius = randomNumber(20, 30)

    this.isbiome = false;
    this.collideable = true
    this.specType = 0;
    this.type = 51; //object type (animal. hill bush)
    this.biome = 0;
    this.biome = 0
    this.xp = 300
    this.water = 2.25
    this.sendhp = false
    this.spawned = false

    this.spawnedby2 = newid

    this.isloaded = false
    this.energy = 5
    this.movable = true
    this.speed = 10
    this.killerid = 0
    this.isinvisible = false
    this.x = x
    this.y = y
    this.isinquadtree = false
    this.lowestrespawnsec = 25
    this.bigestrespawnsec = 50
    this.veloX = 0
    this.veloY = 0
    this.deathtime = 80
    this.spawnedtime = Date.now();
};


watermelonslice.prototype = {







};
watermelonslice.prototype.customdatawriteoncreate = function (buf, off) {
}
watermelonslice.prototype.customdatawriteonupdate = function (buf, off) {
}


module.exports = watermelonslice;