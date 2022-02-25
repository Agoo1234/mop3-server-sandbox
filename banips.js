function banips(ws) {


	if (ws._socket.remoteAddress == '::ffff:' + '78.173.6.17') { { ws.close(); console.log("banned player "+ws._socket.remoteAddress)} }// botted


}

banips.prototype = {
};
module.exports = banips;