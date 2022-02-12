function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
var names = [
    "mope.io",
    "awesomeag pro",
    "ahmetcan cool",
    "server amazing",
    "proxy gamer B)"
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