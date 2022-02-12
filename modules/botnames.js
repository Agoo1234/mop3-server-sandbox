function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
var names = [
    "awesomeag pro",
    "ahmetcan cool",
    "server amazing",
    "proxy gamer B)",
    "mop3 best"
]
function name() {

}
name.prototype = {

    newnames: function () {
        var d = getRandomInt(0, names.length)
        var newname = names[d]
        return newname;


    },
}
module.exports = name