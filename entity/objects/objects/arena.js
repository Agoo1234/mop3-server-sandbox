
function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}


function arena(id, x, y, p1, p2) {
    this.class = 'Object Ability Non Movable'
    this.isdead = false;

    this.id = id;
    this.num = 5
    this.radius = 300
    this.insradius = 280
    this.angleupd = false;
    this.isbiome = false;
    this.specType2 = 0
    this.is1v1 = false
    this.specType = 0;
    this.secondaryType = 68
    this.type = 14; //object type (animal. hill bush)
    this.biome = 0;
    this.isloaded = false;
    this.sendhp = false
    this.spawned = false
    this.p1bites = 0
    this.p2bites = 0
    this.state = 0
    this.movable = false
    this.speed = 10
    this.killerid = 0
    this.isinvisible = false
    this.timer = 1
    //PLAYER CHECK
    this.p1id = p1.id
    this.p2id = p2.id
    //PLAYER CHECK
    //FIRST SEND.
    this.p1 = p1
    this.p2 = p2
    //FIRST SEND.
    this.winner = 0
    this.x = x
    this.y = y

    this.hurt = false
    this.isinquadtree = false
    this.spawnedtime = Date.now();
    var a = setInterval(() => {
        if (!this.isdead) {
            if (this.state == 0) {
                if (this.timer == 0) {
                    this.state = 1
                }
            }
            if (this.state == 0) {
                this.timer--
            } else if (this.state == 1) {
                this.timer++
            }
        } else {
            clearInterval(a)
        }
    }, 1000);
    this.veloX = 0
    this.veloY = 0

};


arena.prototype = {

};

arena.prototype.customdatawriteoncreate = function (buf, off) {
}
arena.prototype.customdatawriteonupdate = function (buf, off) {
}

module.exports = arena;