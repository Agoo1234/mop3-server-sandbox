const GameObject = require("../gameObject")
function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}


class AbilityObj extends GameObject {
    constructor(id, x, y, radius) {
        super(id, x, y, radius)
        this.class = 'Object'
        this.specType2 = 0
        this.is1v1 = false
        this.secondaryType = 0;
        this.type = 14; //object type (animal. hill bush)
    };
};



module.exports = AbilityObj;