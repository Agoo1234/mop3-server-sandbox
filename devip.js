function devip(ws) {

	if (ws._socket.remoteAddress == '::1' || ws._socket.remoteAddress == '::ffff:127.0.0.1') {
		{
			ws.isdeveloper = true
			//PLAYER IS DEVLOPER

		}
	}




}

devip.prototype = {
};
module.exports = devip;