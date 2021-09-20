
function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}
const vector = require('victor');


function sleig(id, pos, name) {
    this.class = 'Object'
    this.isdead = false;

    this.zoomheight = 400
    this.zoomwidth = 800

    this.id = id;
    this.has1v1req = false

    this.radius = 100
    this.coins = 0
    this.xp = 0;
    this.angleupd = true

    this.score = this.xp
    this.isbiome = false;
    this.pos = pos;
    this.name = name;
    this.nameLen = 0
    this.species = 0;
    this.speed = 5;
    this.type = 64; //object type (animal. hill bush)

    this.isloaded = false
    this.control = true
    this.angle = 0;
    this.specType = 0

    this.playerbar = 0; //bar type:   0-ENERGY    1-AIR  2-LAVA  3-ICE
    this.barpercentage = 100
    this.maxhp = 100
    this.hp = 100;
    this.regenhp = 0.005
    this.hurt = 0;

    this.movable = true
    this.isalive = false;

    this.killerid = 0
    this.cam = this.pos
    this.holdboost = false;
    this.isboosting = false;

    this.canmove = true
    this.canmoveangle = true


    this.isinvisible = false
    this.isbot = true
    this.tail = 0
    this.tailfar

    this.howmuchangle = 0
    this.oldangle = 0
    this.trueangle = 0
    this.maxangle = 0
    this.newangle = 0
    this.spawned = false
    this.mousex = 0
    this.mousey = 0
    this.maxangle = 45
    this.isinquadtree = false
    this.spawnedtime = Date.now();
    this.veloX = 0
    this.veloY = 0
};

sleig.prototype.customdatawriteoncreate = function (buf, off) {
}
sleig.prototype.customdatawriteonupdate = function (buf, off) {
}
sleig.prototype = {





    updateMove: function (testX, testY) {

        let rangecalculator = Math.sqrt(testX * testX + testY * testY);
        if (this.canmove) {
            if (!this.isboosting) {

                rangecalculator /= 25
                if (rangecalculator > this.speed) rangecalculator = this.speed;
                if (rangecalculator < this.speed / 5) rangecalculator = 0;




                let target = new vector(this.mousex, this.mousey);
                let clone = new vector(this.x, this.y);


                clone.subtract(target);

                clone.normalize();

                clone.multiply(new vector(rangecalculator * 1.5, rangecalculator * 1.5))





                this.pos.subtract(clone);


            } else {

                let target = new vector(this.mousex, this.mousey);
                let clone = new vector(this.x, this.y);


                clone.subtract(target);

                clone.normalize();

                clone.multiply(new vector(this.speed * 30, this.speed * 30))





                this.pos.subtract(clone);
                this.isboosting = false

            }
        }



    },



    updateAngle: function (target) {
        var dy = this.pos.y - target.y;
        var dx = this.pos.x - target.x;
        var mousedistance = Math.sqrt(dx * dx + dy * dy)
        var speedturn = 0.2

        //var   theta = Math.atan2(diry, dirx);


        if (mousedistance > 5) {
            var theta = Math.atan2(dy, dx);// range (-PI, PI]

            theta *= 180 / Math.PI; // rads to degs, range (-180, 180]
            if (theta < 0) {
                theta += 360;

            }
            this.newangle = this.oldangle - theta


            if (this.newangle > 180) {
                this.newangle -= 360

            }
            if (this.newangle < -180) {
                this.newangle += 360


            }

            if (this.newangle > this.maxangle) {
                this.newangle = this.maxangle
            }
            if (this.newangle < -this.maxangle) {
                this.newangle = -this.maxangle
            }



            this.trueangle = this.angle - this.newangle

            if (this.trueangle <= 0) {
                this.trueangle += 360
            }
            if (this.trueangle >= 360) {
                this.trueangle -= 360
            }
            this.oldangle = this.trueangle
            this.angle = this.trueangle



            //this.angle = trueangle
            //console.log(nowangle)
            // this.angle = theta
            // this.angle = theta
        }
    },



};

module.exports = sleig;