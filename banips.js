function banips(ws) {


	if (ws._socket.remoteAddress == '::ffff:' + '78.173.6.17') { { ws.close(); console.log("banned player "+ws._socket.remoteAddress)} }// botted
	if (ws._socket.remoteAddress == '::ffff:' + '24.153.119.96') { { ws.close(); console.log("banned player "+ws._socket.remoteAddress)} }// crashes server


}

banips.prototype = {
};
module.exports = banips;