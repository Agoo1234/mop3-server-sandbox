
function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}


function fakecollision(x, y, rad) {

    this.radius = rad
    this.movable = false
    this.x = x
    this.y = y

};


fakecollision.prototype = {

};


module.exports = fakecollision;