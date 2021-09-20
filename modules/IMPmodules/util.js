
const Writer = require("./writer.js");
const writer = new Writer();

const Eventgamehandler = require('./eventgamehandler')
const eventgamehandler = new Eventgamehandler()
function utils(gameserver) {
    this.server = gameserver
}
utils.prototype = {
    getWriter: function () {

        return writer;
    },
    getEventHandler: function () {

        return eventgamehandler;
    },
    getCURRWebSockets: function () {

        return this.server.websockets();
    },
    randomString: function (len, an) {
        an = an && an.toLowerCase();
        var str = "",
            i = 0,
            min = an == "a" ? 10 : 0,
            max = an == "n" ? 10 : 62;
        for (; i++ < len;) {
            var r = Math.random() * (max - min) + min << 0;
            str += String.fromCharCode(r += r > 9 ? r < 36 ? 55 : 61 : 48);
        }
        return str;
    },
    decode_utf8: function (s) {
        return decodeURIComponent(escape(s));
    },
    encode_utf8: function (s) {
        return unescape(encodeURIComponent(s));
    },
    getDistance2D: function (x1, y1, x2, y2) {
        return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y1 - y2, 2));
    },
    randomNumber: function (min, max) {
        return Math.random() * (max - min) + min;
    },
    correctpercentage: function (curr, max) {
        c = curr / max;
        d = c * 100;


        return d
    },
    isnumbcorrectbetween: function (min, max, number) {
        let corr = false

        if ((number < max)
            &&
            (number >= min)) {
            corr = true


        }
        return corr
    },
    randomIntNumber: function (min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    toRadians: function (angle) {
        return angle * (Math.PI / 180);
    },
    toDegrees: function (angle) {
        return angle * (180 / Math.PI);
    },
    getcorrectangle: function (angle) {
        if (angle <= 0) {
            angle += 360
        }
        if (angle >= 360) {
            angle -= 360
        }
        return angle
    },
    angle_1to360: function (angle) {
        var angle = (Math.trunc(angle) % 360) + (angle - Math.trunc(angle)); //converts angle to range -360 + 360
        if (angle > 0.0)
            return angle;
        else
            return angle + 360.0;
    },
    anglebetween2point: function (originX, originY, targetX, targetY) {
        var dx = originX - targetX;
        var dy = originY - targetY;

        // var theta = Math.atan2(dy, dx);  // [0, Ⲡ] then [-Ⲡ, 0]; clockwise; 0° = west
        // theta *= 180 / Math.PI;          // [0, 180] then [-180, 0]; clockwise; 0° = west
        // if (theta < 0) theta += 360;     // [0, 360]; clockwise; 0° = west

        // var theta = Math.atan2(-dy, dx); // [0, Ⲡ] then [-Ⲡ, 0]; anticlockwise; 0° = west
        // theta *= 180 / Math.PI;          // [0, 180] then [-180, 0]; anticlockwise; 0° = west
        // if (theta < 0) theta += 360;     // [0, 360]; anticlockwise; 0° = west

        // var theta = Math.atan2(dy, -dx); // [0, Ⲡ] then [-Ⲡ, 0]; anticlockwise; 0° = east
        // theta *= 180 / Math.PI;          // [0, 180] then [-180, 0]; anticlockwise; 0° = east
        // if (theta < 0) theta += 360;     // [0, 360]; anticlockwise; 0° = east

        var theta = Math.atan2(-dy, -dx); // [0, Ⲡ] then [-Ⲡ, 0]; clockwise; 0° = east
        theta *= 180 / Math.PI;           // [0, 180] then [-180, 0]; clockwise; 0° = east
        if (theta < 0) theta += 360;      // [0, 360]; clockwise; 0° = east

        return theta;
    },

    distbetweenangles: function (fromAngle, toAngle) {
        var rawDiff = toAngle - fromAngle;
        var d = this.angle_1to360(this.toDegrees(rawDiff));
        if (d > 180.0) //going backwards is shorter
            d = d - 360; //gives negative angle
        return this.toRadians(d);
    },
    rotate: function (cx, cy, x, y, angle, anticlock_wise = false) {
        if (angle == 0) {
            return { x: parseFloat(x), y: parseFloat(y) };
        } if (anticlock_wise) {
            var radians = (Math.PI / 180) * angle;
        } else {
            var radians = (Math.PI / -180) * angle;
        }
        var cos = Math.cos(radians);
        var sin = Math.sin(radians);
        var nx = (cos * (x - cx)) + (sin * (y - cy)) + cx;
        var ny = (cos * (y - cy)) - (sin * (x - cx)) + cy;
        return { x: nx, y: ny };
    },
}
module.exports = utils