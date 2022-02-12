
function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}


function gsscorpgrab(x, y, rad) {

    this.x = x
    this.y = y
    this.radius = rad
    this.movable = false
    this.biteid = 0;//grabed no one yet!
    this.triedtograbsomeone = false
    this.veloX = 0
    this.veloY = 0
};


gsscorpgrab.prototype = {

};


module.exports = gsscorpgrab;