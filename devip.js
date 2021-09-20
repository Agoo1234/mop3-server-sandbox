function devip(ws) {

	if (ws._socket.remoteAddress == '::ffff:127.0.0.1' || ws._socket.remoteAddress == '::ffff:73.202.61.178' || ws._socket.remoteAddress == '::ffff:192.168.86.28' || ws._socket.remoteAddress == '::ffff:192.168.86.26' || ws._socket.remoteAddress == '::ffff:192.168.86.24' || ws._socket.remoteAddress == '::ffff:192.168.86.21' || ws._socket.remoteAddress == '::ffff:192.168.86.28') {
		{
			ws.isdeveloper = true
			//PLAYER IS DEVLOPER

		}
	}




}

devip.prototype = {
};
module.exports = devip;