
function getDistance2D(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y1 - y2, 2));
}
const vector = require('victor');
const utils1 = require("../../../modules/IMPmodules/util")
const util = new utils1()
function player(id, pos, name) {
    this.class = 'Player'
    this.isdead = false;
    this.id = id;
    this.lastani = 0
    this.zoomwidth = 0
    this.zoomheight = 0
    this.moreradius = 0 //for fly or whatever
    this.radius = 0


    this.baserad = 20
    this.addrad = 0.1
    this.lessrad = 0.1

    this.xp = 0;

    this.angleupd = false
    this.spawned = false
    this.isplayer = true
    this.score = this.xp
    this.isbiome = false;
    this.pos = pos;
    this.lastdistance = 0
    this.name = name;
    this.species = 0;


    this.type = 2; //object type (animal. hill bush)
    this.secondaryType = 0; //mouse - animal species
    this.biome = 0;
    this.isupgrading = false
    this.animals = []
    this.choiceid = 0

    this.whichbiome = 0

    this.toolow = false

    this.specType = 0
    this.specType2 = 0
    this.waterhit = false

    this.sendhp = false

    this.isdiving = false;
    this.isgrabbed = false
    this.isflying = false


    this.maxhp = 100;
    this.hp = 100;

    this.regenhp = 0.015;
    this.lasthp = 100;


    this.hurt = 0;
    this.flags = [0];   // 0 = land // 1 = water //2 = arctic //25 = lava
    this.colorname = 1

    this.playcamera = 0;

    this.gothit = true;

    this.candive = true;
    this.divingtime = 10
    this.foods = []
    this.tailbite = []
    this.predators = []
    this.preys = []
    this.hillsnearby = [];
    this.treerad = 0
    this.killerid = 0
    this.damage = 20
    this.cam = this.pos;
    this.tier = 14
    this.rank = 0;
    this.holdboost = false;
    this.isabletoboost = true;
    this.isboosting = false;
    this.whenboost = true;
    this.nowater = false;
    this.isdeveloper = false
    this.godmode = false

    this.canmove = true
    this.canmoveangle = true



    this.mouth = 0

    this.infability = false
    this.tails = []
    this.camx = 0
    this.camy = 0
    this.usingability = false
    this.wins = 0

    this.movable = true
    this.movedependonangle = false
    this.control = true
    this.angle = 0;

    this.arenaid = 0
    this.isloaded = false
    this.invincible = true
    this.nextxp = 10000000

    this.isbot = true
    this.isinvisible = false
    this.isinhole = false
    this.isinboostingang = false
    this.isinquadtree = false
    this.isintree = false

    this.kills = 0
    this.lasthitsec = 0
    this.lasthitby = 0

    this.timerfrozen = 0
    this.timerburned = 0
    this.timerstunned = 0
    this.timershivered = 0
    this.timerbleeding = 0

    this.lastdamagebleeding = 0
    this.lastdamageburned = 0
    this.lastdamageshiver = 0


    this.mousex = 0
    this.mousey = 0
    this.spawnbiome = 0
    this.goingsky = false
    this.fallvelocity = 1
    this.flyvelocity = 1
    this.z = 0
    setTimeout(() => {
        this.invincible = false
    }, 3000);
    this.angles = {
        anglespeed: 10,
        nextangle: 90,
        oldangle: 90,
        newangle: 90,
        trueangle: 90,
    }
    this.speeds = {
        landspeed: 2.5,
        oceanspeed: 2.5,
        arcticspeed: 2.5,
        lavaspeed: 2.5,
        flyspeed: 2.5,
        hittedspeed: 1.5,
    }

    this.bar = {
        playerbar: 0, //bar type:   0-WATER    1-AIR  2-LAVA  3-ICE
        normalbar: 0,
        maxbarpercentage: 100,
        barpercentage: 0,
        maxbarnormalpercentage: 100,
        normalbarpercentage: 100,
        maxairbarpercentage: 100,// loose all of bar in 10 sec with 100. 
        airbarpercentage: 0,
    }
    this.speed = this.speeds.landspeed
    this.abilitys = {
        abil_dive_isMain: false,

        button_w: {
            //dive is main ability!
            abil_currentclick: 0,
            abil_Type: 0,
            abil_usable: false,
            abil_recharging: false,
            abil_possible: false,
            abil_active: false,
            abil_time: 0,
            abil_timestamp: 0,
            abil_noflags: [],
            abil_bardivideusable: 1,
        },
        button_w_mini: {
            //dive is main ability!
            abil_currentclick: 0,
            abil_Type: 0,
            abil_usable: false,
            abil_recharging: false,
            abil_possible: false,
            abil_active: false,
            abil_time: 0,
            abil_timestamp: 0,
            abil_noflags: [],
            abil_bardivideusable: 1,
        },
    }
    this.veloX = 0
    this.veloY = 0
    this.oldupxp = 0
    this.spawnedtime = Date.now();
};
player.prototype.customdatawriteoncreateforanimal = function (buf, off) {
}
player.prototype.customdatawriteonupdateforanimal = function (buf, off) {
}
player.prototype.customdatawriteoncreate = function (buf, off) {

    this.customdatawriteoncreateforanimal();
}
player.prototype.customdatawriteonupdate = function (buf, off) {

    this.customdatawriteonupdateforanimal();
}
player.prototype = {

    abiluse: function (abilities, aobjids, writer, entities, type, aws_new) {

        new abilities(aobjids, this.id, entities, writer, type, aws_new)


    },
    chat: function (chat, allws, writer) {

        for (let b in allws) {
            if (allws[b].toupdate.includes(this)) {

                allws[b].send(writer.chat(this.id, chat))
            }
        }

    },

    updateMove: function (testX, testY) {

        let rangecalculator = Math.sqrt(testX * testX + testY * testY);
        if (this.canmove) {
            if (!this.movedependonangle) {

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
                rangecalculator /= 25
                if (rangecalculator > this.speed) rangecalculator = this.speed;
                if (rangecalculator < this.speed / 5) rangecalculator = 0;
                let angle = this.angle - 180
                if (angle > 180) {
                    angle -= 360

                }
                if (angle < -180) {
                    angle += 360


                }

            }
        }



    },



    updateAngle: function (target) {

        var dy = this.y - target.y;
        var dx = this.x - target.x;


        let dist = getDistance2D(this.x, this.y, this.mousex, this.mousey)
        //var   theta = Math.atan2(diry, dirx);

        var theta = Math.atan2(dy, dx);// range (-PI, PI]

        theta *= 180 / Math.PI; // rads to degs, range (-180, 180]
        if (theta < 0) {
            theta += 360;
        }
        this.angles.nextangle = theta
        this.angles.newangle = this.angles.oldangle - this.angles.nextangle

        var speed = this.angles.nextangle - this.angle

        speed = this.angles.nextangle - this.angle
        while (speed < -180) speed += 360;
        while (speed > 180) speed -= 360;

        if (speed < 0) {
            speed = -speed
        }

        let maxanglespeed = this.angles.anglenewspeed

        if (speed <= 20) {
            maxanglespeed = this.angles.anglenewspeed / 2.5
        } else
            if (speed > 20 && speed <= 60) {
                maxanglespeed = this.angles.anglenewspeed / 1.4
            }


        if (this.angles.newangle > 180) {
            this.angles.newangle -= 360

        }
        if (this.angles.newangle < -180) {
            this.angles.newangle += 360
        }

        if (this.angles.newangle > maxanglespeed) {
            this.angles.newangle = maxanglespeed
        }
        if (this.angles.newangle < -maxanglespeed) {
            this.angles.newangle = -maxanglespeed
        }



        this.angles.trueangle = this.angle - this.angles.newangle

        if (this.angles.trueangle <= 0) {
            this.angles.trueangle += 360
        }
        if (this.angles.trueangle >= 360) {
            this.angles.trueangle -= 360
        }
        this.angles.oldangle = this.angles.trueangle
        this.angle = this.angles.trueangle



        //this.angle = trueangle
        //console.log(nowangle)
        // this.angle = theta
        // this.angle = theta

    },



};



module.exports = player;