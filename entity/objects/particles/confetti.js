
function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}


function confetti(id, x, y) {

    this.isdead = false;

    this.id = id;

    this.radius = 10
    this.angleupd = true;
    this.isbiome = false;
    this.specType2 = 0
    this.specType = 0;
    this.secondaryType = 1
    this.type = 86; //object type (animal. hill bush)
    this.biome = 0;
    this.isloaded = false;
    this.sendhp = false
    this.spawned = false
    this.angle = randomNumber(0, 360)
    this.movable = false
    this.speed = 10
    this.killerid = 0
    this.isinvisible = false
    //PLAYER CHECK
    this.x = x
    this.y = y

    this.hurt = false
    let randomtest = Math.floor(Math.random() * 2);
    this.isinquadtree = false
    var a = setInterval(() => {
        if (!this.isdead) {
            this.radius += 12
            this.angle += randomtest ? -9 : 9
        } else {
            clearInterval(a)
        }
    }, 20);
    setTimeout(() => {
        clearInterval(a)
        this.isdead = true

    }, 500);
};


confetti.prototype = {

};


module.exports = confetti;