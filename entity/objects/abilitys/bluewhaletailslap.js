const abilityObj = require("./abilityObj")
function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}


class BlueWhaleAbil extends abilityObj {
    constructor(id, by, x, y, angle, radius) {
        super(id, x, y, radius)
        this.class = 'Object Ability Non Movable'
        this.secondaryType = 32;
        this.type = 14; //object type (animal. hill bush)
        this.angleupd = true
        this.biteid = 0
        this.spawnedby2 = by
        this.angle = angle
        setTimeout(() => {
            this.isdead = true
        }, 700);
    };
};




module.exports = BlueWhaleAbil;