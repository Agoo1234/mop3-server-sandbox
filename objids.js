let objids = 1
function objidsload() {
    this.a = 1
}
objidsload.prototype = {
    giveid: function (up) {
        if (objids > 4200000000) {
            objids = 1
        }
        var oldid = objids
        if (up) {
            objids++
        }
        return oldid;

    }
}
module.exports = objidsload