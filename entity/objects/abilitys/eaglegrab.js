
function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}


function eaglecatch(x, y, rad) {

    this.x = x
    this.y = y
    this.radius = rad

};


eaglecatch.prototype = {

};


module.exports = eaglecatch;