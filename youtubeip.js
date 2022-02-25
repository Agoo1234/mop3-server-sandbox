function youtubeip(ws) {

	if (ws._socket.remoteAddress == '::1' || ws._socket.remoteAddress == '::ffff:127.0.0.1' || ws._socket.remoteAddress == '::ffff:98.47.209.188') {
		{
			ws.isyoutuber = true
			//PLAYER IS YouTuber

		}
	}




}

youtubeip.prototype = {
};
module.exports = youtubeip;