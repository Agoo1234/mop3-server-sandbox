function banips(ws) {


	if (ws._socket.remoteAddress == '::ffff:' + 'xxxxx') { { ws.close(); } }//PUT REASON HERE.


}

banips.prototype = {
};
module.exports = banips;