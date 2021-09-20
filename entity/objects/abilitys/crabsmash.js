const abilityObj = require("./abilityObj")
function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}


class CrabSmashAbil extends abilityObj {
    constructor(radius, id, by, x, y, angle, spec) {
        super(id, x, y, radius)
        this.class = 'Object Ability'
        this.id = id;

        this.radius = radius * 1.3
        this.angleupd = true;


        this.specType = spec
        this.type = 14; //object type (animal. hill bush)
        this.secondaryType = 51;
        this.biome = 0;
        this.spawned = true
        this.spawnedby = by
        this.spawnedby2 = by
        this.angle = angle




        setTimeout(() => {
            this.isdead = true
        }, 600);

    };
};



module.exports = CrabSmashAbil;
