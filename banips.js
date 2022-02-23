function banips(ws) {


	if (ws._socket.remoteAddress == '::ffff:' + 'xxxxx') { { ws.close(); console.log("banned player "+ws._socket.remoteAddress)} }//PUT REASON HERE.


}

banips.prototype = {
};
module.exports = banips;