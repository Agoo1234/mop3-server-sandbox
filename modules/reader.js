
function reader(data) {
    this.off = 0;
    this.data = data;
};

reader.prototype = {

    readUInt8: function () {
        let val = this.data.getUint8(this.off);
        this.off++;
        return val;
    },



    readUInt16: function () {
        let val = this.data.getUint16(this.off);
        this.off += 2;
        return val;
    },

    readInt16: function () {
        let val = this.data.getInt16(this.off);
        this.off += 2;
        return val;
    },

    offsetPlus: function (val) {
        this.off += val;
    },

    readName: function (len) {
        let name = "";
        for (let i = 0; i < len; ++i) {
            name += String.fromCharCode(this.data.getUint8(i + this.off));
        };
        this.off += len;
        return name + " ";
    },


    readChat: function (len) {
        let chat = "";
        for (let i = 0; i < len; ++i) {
            chat += String.fromCharCode(this.data.getUint16(i + this.off));
        };
        this.off += len;
        return chat + " ";
    },
};





module.exports = reader;