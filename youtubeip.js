function youtubeip(ws) {

	if (ws._socket.remoteAddress == '::1') {
		{
			ws.isyoutuber = true
			//PLAYER IS YouTuber

		}
	}




}

youtubeip.prototype = {
};
module.exports = youtubeip;