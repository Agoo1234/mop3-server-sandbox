
function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}
const abilityObj = require("./abilityObj")
class CrystalFireAbil extends abilityObj {

    constructor(id, by, x, y, angle) {
        super(id, x, y, 17)
        this.class = 'Object Ability'



        this.angleupd = true;




        this.type = 14; //object type (animal. hill bush)
        this.secondaryType = 76;

        this.spawned = true
        this.spawnedby = by
        this.spawnedby2 = by
        this.angle = angle





        setTimeout(() => {
            if (!this.isdead) {
                this.isdead = true
            }
        }, 1200);

    };
};



module.exports = CrystalFireAbil;