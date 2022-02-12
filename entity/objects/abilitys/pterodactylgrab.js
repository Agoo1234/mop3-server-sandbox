
function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}


function pterodactylcatch(x, y, rad) {

    this.x = x
    this.y = y
    this.radius = rad

};


pterodactylcatch.prototype = {

};


module.exports = pterodactylcatch;