
function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}


class GameObject {
    constructor(id, x, y, radius) {
        this.class = 'Object'
        this.isdead = false;

        this.id = id;

        this.radius = radius
        this.angleupd = false;
        this.isbiome = false;

        this.specType = 0;

        this.type = 0; //object type (animal. GameObject bush)
        this.biome = 0;

        this.sendhp = false
        this.spawned = false
        this.isloaded = true


        this.movable = false
        this.killerid = 0
        this.isinvisible = false
        this.isinquadtree = false
        this.x = x
        this.y = y
        this.veloX = 0
        this.veloY = 0
        this.spawnedtime = Date.now();
    };
};


GameObject.prototype = {







};

GameObject.prototype.customdatawriteoncreate = function (buf, off) {
}
GameObject.prototype.customdatawriteonupdate = function (buf, off) {
}

module.exports = GameObject;