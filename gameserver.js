
function gameserver(port) {
	const utils1 = require("./modules/IMPmodules/util")

	const util = new utils1()
	const vector = require('victor');

	const ipban = require("./banips.js")
	const devsip = require("./devip.js")

	const writer1 = require("./modules/IMPmodules/writer.js");
	const writer = new writer1();
	const fun1 = require("./entity/funs.js");
	const fun = new fun1();
	const game1 = require('./game')
	const game = new game1();

	const name1 = require("./modules/botnames")
	const name = new name1()

	const tierload1 = require("./playergameplay/choices/tierschoice")
	const tierload = new tierload1()

	const death = require("./handler/deathhandle")

	const reader = require("./modules/reader.js");

	const WebSocket = require('ws');

	const player = require("./entity/objects/objects/player.js");
	const hidinghole = require("./entity/objects/objects/waterspot");

	const bigabilities = require("./playergameplay/abilitiesuse/abilitiesusebigbutton");
	const miniabilities = require("./playergameplay/abilitiesuse/abilitiesuseminibutton");
	const sclick = require("./playergameplay/abilitiesuse/sclick");

	const map = require("./modules/map.js")

	const zoomentities = require("./playergameplay/zoomentities.js");

	const worldUpdate = require("./handler/worldupdate/normalworldupd");
	const devcommands = require("./modules/chat.js")
	const newobjids = require("./objids.js")


	const apexchoices = require('./playergameplay/choices/choices.js');
	const animalswitcher = require("./playergameplay/animalswitch.js");
	const tierswitcher = require("./playergameplay/tierswitch.js");

	const arena = require("./entity/objects/objects/arena")


	const fs = require('fs')
	const quadtree = require("./modules/quadtree");
	const createbot = require("./entity/bot.js");
	const Rectangle = require("./modules/rectangle")
	const border = new Rectangle(game.load(0) / 2, game.load(1) / 2, game.load(0), game.load(1))

	const QuadTree = new quadtree(null, border, 12, 12)


	var iper = ''
	let new1stimecount = Date.now()
	let updtime = Date.now()
	let boradupd = Date.now()



	//	console.log(ping)


	const aobjids = new newobjids()



	const wss = new WebSocket.Server({
		port: port
	});











	const TESTING = true
	const serverVer = 99;

	const MAXBOTS = game.load(4)
	var serverstarted = false
	setTimeout(() => {
		for (var i in self.entities) {
			entity_1 = self.entities[i]
			if (entity_1.type == 6) {
				entity_1.isdead = true
			}
			if (!entity_1.isdead) {
				for (var j in self.entities) {

					entity_2 = self.entities[j]
					if (!entity_2.isdead) {
						let distanceplay = util.getDistance2D(entity_1.x, entity_1.y, entity_2.x, entity_2.y)


						if (entity_1 && entity_2) {

							if (entity_2.id != entity_1.id) {
								if (entity_1.type == entity_2.type && entity_2.type == 7) {
									if (distanceplay <= entity_2.radius) {
										entity_2.isdead = true
									}
								}
								if (entity_1.type == 10 || entity_1.type == 7) {
									if (entity_2.type == 47 || entity_2.type == 10) {
										if (distanceplay <= entity_2.radius + entity_1.radius + 100) {
											entity_1.isdead = true
										}
									}
								}
								if (entity_1.type == 4 || entity_1.type == 27) {
									if (entity_2.type == 47 || entity_2.type == 10) {
										if (distanceplay <= entity_2.radius + entity_1.radius + 150) {
											entity_1.isdead = true
										}
									}
								}

								if (entity_1.type == 4) {

									if (entity_2.type == 4) {


										if (distanceplay <= entity_2.radius + entity_1.radius + 300) {
											entity_1.isdead = true
										}

									}
								}
								if (entity_1.type == 44 && entity_2.type == 44) {
									if (distanceplay <= (entity_1.radius + entity_2.radius) / 2) {
										entity_2.isdead = true
									}
								}
								if (entity_1.type == 27) {

									if (entity_2.type == 4) {
										if (distanceplay <= entity_1.radius + entity_2.radius + 150) {

											entity_1.isdead = true
										}
									}

								}
								if (entity_1.type == 6) {
									if (entity_2.type == 4 || entity_2.type == 27 || entity_2.type == 10) {
										if (distanceplay <= entity_1.radius + entity_2.radius + 50) {

											entity_1.isdead = true
										}
									}
								}
								if (entity_1.type == 27) {

									if (entity_2.type == 27) {
										if (distanceplay <= entity_1.radius + entity_2.radius + 300) {

											entity_2.isdead = true
										}
									}

								}
							}
						}
					}

				}
			}
		}
		serverstarted = true
	}, TESTING ? 1000 : 5000);

	var ips = []

	let playersNum = 0;

	this.entities = {};

	this.ws_new = {}

	let self = this
	new map(aobjids, self.entities)
	setTimeout(() => {


		for (let i = 0; i < MAXBOTS; i++) {
			var maanimals = tierload.tier14(false)
			new createbot(game.load(9), writer, aobjids, self.entities, maanimals, name.newnames(), 1500, false, util.randomNumber(0, 0), util.randomNumber(0, 0))
		}
	}, TESTING ? 1000 : 5000);
	try {
		wss.on('error', function (error) {
			console.log(error)
		})
		wss.on('connection', function connection(ws) {
			console.log("new player :" + ws._socket.remoteAddress)
			var sum = 0
			for (let i in ips) {

				if (ips[i] == ws._socket.remoteAddress) {
					sum++
				}
				if (sum >= game.load(6)) {
					ws.close();
					console.log("closed game.load 6");
					break;
				}

			}

			ws.binaryType = 'arraybuffer';

			ws.exists = false
			
			ws.correctstring = util.randomString(20)
			ws.newstring = ""
			ws.send(writer.codecheck(ws.correctstring))
			ws.trys = 0
			let mnm = setInterval(() => {
				try {


					if (ws.trys >= 20) {

						clearInterval(mnm)
						ws.close();
						console.log("closed trys>20");
						return
					}

					if (ws.correctstring + " " != ws.newstring) { ws.trys; ws.send(writer.codecheck(ws.correctstring)); return };
					ws.isdeveloper = false
					new devsip(ws)

					if (!serverstarted || !ws.isdeveloper && playersNum >= game.load(3)) {
						if (playersNum > game.load(3)) {
							ws.send(writer.joinresponse(0))
						} else if (!serverstarted) {
							ws.send(writer.joinresponse(4))
						}
						setTimeout(() => {
							ws.terminate()
						}, 1000);

						return
					}

					ws.exists = true
					ws.correctstring = undefined
					ws.newstring = undefined
					ws.send(writer.joinresponse(1))

					new ipban(ws);

					if (!ws.isdeveloper) ips.push(ws._socket.remoteAddress)

					console.log("Player connected : ", ws._socket.remoteAddress, "isdev: ", ws.isdeveloper);
					

					let randomentities = []


					for (var i in self.entities) {

						if (self.entities[i].type == 2) {
							randomentities.push(self.entities[i].id)
						}
					}
					var randomtest = Math.floor(Math.random() * randomentities.length);
					ws.spectatingon = randomentities[randomtest]
					ws.askedchoice = false

					ws.declareddisconnection = false

					ws.isalive = false
					ws.canSend = false;

					ws.timerafk = 0

					ws.id = Math.floor(Math.random() * 10000000000000) + 1;
					ws.nameLen = 1
					ws.name = ' '

					ws.xp = 500000

					ws.camx = util.randomNumber(0, game.load(0))
					ws.camy = util.randomNumber(0, game.load(1))
					ws.zoomheight = 500
					ws.zoomwidth = 700

					var river = ([])
					var volcano = ([])
					var lakes = ([])
					var mud = ([])
					var ice = ([])
					var hills = ([])
					var lakeislands = ([])
					var foodspot = ([])
					var waterspot = ([])
					for (let i in self.entities) {

						if (self.entities[i].type == 40) {
							river.push(self.entities[i])
						}
						if (self.entities[i].type == 47) {
							volcano.push(self.entities[i])
						}
						if (self.entities[i].type == 10) {
							lakes.push(self.entities[i])
						}
						if (self.entities[i].type == 7) {
							mud.push(self.entities[i])
						}
						if (self.entities[i].type == 17) {
							ice.push(self.entities[i])
						}
						if (self.entities[i].type == 3) {
							hills.push(self.entities[i])
						}
						if (self.entities[i].type == 11) {
							lakeislands.push(self.entities[i])
						}
						if (self.entities[i].type == 27 || self.entities[i].type == 28) {
							foodspot.push(self.entities[i])
						}
						if (self.entities[i].type == 4) {
							waterspot.push(self.entities[i])
						}
					}
					try {

						ws.send(writer.sendJoin(2000, ws.camx, ws.camy, river, volcano, lakes, mud, ice, hills, lakeislands, foodspot, waterspot)); //connection has been opened	
					} catch (error) {
						console.log(error)
						ws.terminate()
					}
					ws.tocreate = []
					ws.toupdate = []
					ws.todelete = []


					ws.animals = tierload.tier13(false)

					self.ws_new[ws.id] = ws
					var p = setInterval(() => {

						if (ws != undefined) {
							self.ws_new[ws.id] = ws
						} else {
							clearInterval(p)
						}
					}, 20);
					ws.trys = undefined
					clearInterval(mnm)
				} catch (error) {
					console.log(error)

					clearInterval(mnm)
				}
			}, 1000);


			ws.on('error', function (error) {
				ws.close();
				console.log(error)
				console.log("closed error");
			})


			ws.on('message', function incoming(message) {
				try {
					if (ws.player) {
						ws.timerafk = 0
					}
					let data = new DataView(message);
					//     console.log(new Buffer(message));
					let MsgReader = new reader(data);
					let msgType = MsgReader.readUInt8();


					switch (msgType) {

						case 2:
							if (!ws.exists) return;


							ws.send(writer.joinResponse());
							if (ws.askedchoice) return;

							//spawn + name
							//	 MsgReader.offsetPlus(2);
							var nameLen = MsgReader.readUInt16();



							var name = util.decode_utf8(MsgReader.readName((nameLen)));

							var length = 16;
							name = name.substring(0, length);


							let canvasW = MsgReader.readUInt16();
							let canvasH = MsgReader.readUInt16();

							let isSpectator = MsgReader.readUInt8();





							ws.nameLen = nameLen
							ws.name = name

							if (ws.name == " ") {
								ws.name = "mop3.xyz "
							}

							//console.log(ws.name + ":" + canvasW + ":" + canvasH + ", IP = " + ws._socket.remoteAddress);
							console.log(ws.name+ " Joined. canvas width:height = " + canvasW + "px : " + canvasH + "px and websocket connection id = " + ws.id + " and IP = " + ws._socket.remoteAddress);

							ws.askedchoice = true
							/*let id = OFbject.keys(players).length + Math.random()*10;
							if(players[id]){
								id = Object.keys(players).length + Math.random()*10;
							};*/








							ws.send(writer.choice(1, 0, ws.animals))





							break;
						case 28:
							if (!ws.exists) return;
							if (ws.isalive) {
								new sclick(aobjids, ws.player.id, self.entities)
							}
							break
						case 24:
							if (!ws.exists) return;
							let which = MsgReader.readUInt8();

							if (ws.isalive) {
								if (ws.player.isupgrading) {
									ws.player.isinvisible = true
									new apexchoices(ws.player, which, ws.player.animals, 0, self.entities, false)


								}
								/*		if (TESTING == true) {
											ws.player.pos.x = game.load(0) / 2
											ws.player.pos.y = game.load(1) / 2
										}*/
							} else {
								let id = aobjids.giveid(true);
								truename = ws.name
								let pos = new vector(0, 0); // spawn pos
								var a = new player(ws, id, pos, truename);
								if (ws.isdeveloper) {
									if (a.name == "AwesomeAg " || a.name == "Ag ") {
										a.name = "AwesomeAg - DEVELOPER 🔨 "
										a.colorname = 4
									}
								}
								//console.log(mouseX + ":" + mouseY + ":" + mwd);
								//	console.log(players[ws.player.id].angle)
								new apexchoices(a, which, ws.animals, 0, self.entities, true)
								a.lastani = a.secondaryType
								ws.player = a
								ws.player.xp = ws.xp

								self.entities[ws.player.id] = ws.player;
								self.entities[id] = ws.player;

								ws.player.isalive = true
								ws.isalive = true

								ws.send(writer.isAlive());
								ws.send(writer.joinResponse());

								new animalswitcher(ws.player)
								new tierswitcher(ws.player, writer, ws.player.id)

								ws.canSend = true;
								ws.isalive = true



							}



							break;
						case 26:

							if (!ws.exists) return;
							if (!ws.player) return;
							ws.player.isupgrading = false
							if (TESTING || ws.isdeveloper) {
								ws.player.xp = ws.player.nextxp


							}
							break
						case 27:

							if (!ws.exists) return;
							if (!ws.player) return;

							if (TESTING || ws.isdeveloper) {
								ws.player.isupgrading = false
								switch (ws.player.tier) {

									case 16:
										ws.player.isupgrading = true
										ws.player.animals = tierload.tier15(false);
										ws.player.xp = 10000000
										ws.send(writer.choice(0, 0, ws.player.animals))
										ws.player.choiceid = util.randomIntNumber(0, 999999999999)

										break
									case 15:
										ws.player.isupgrading = true
										ws.player.animals = tierload.tier14(false);

										ws.player.xp = 1000000
										ws.send(writer.choice(0, 0, ws.player.animals))
										ws.player.choiceid = util.randomIntNumber(0, 999999999999)

										break
									case 14:
										ws.player.isupgrading = true
										ws.player.animals = tierload.tier13(false);
										ws.player.xp = 500000
										ws.send(writer.choice(0, 0, ws.player.animals))
										ws.player.choiceid = util.randomIntNumber(0, 999999999999)


										break
								}

							}
							break
						case 5:

							//		  logger("log",ws.player.pos.x + ":" + ws.player.pos.y)
							if (!ws.exists) return;
							if (!ws.isalive) return
							//movement
							let mouseX = MsgReader.readInt16();
							let mouseY = MsgReader.readInt16();

							let mwd = MsgReader.readInt16();
							if (ws.player.control) {

								ws.player.mousex = mouseX
								ws.player.mousey = mouseY
							}
							break;

						case 19:
							if (!ws.exists) return;
							if (!ws.isalive) return
							let msgLen = MsgReader.readUInt16();
							let msgData = util.decode_utf8(MsgReader.readName((msgLen)));


							console.log('USER CHAT: ' + ws.player.name + 'ID: ' + ws.player.id + ': ' + msgData + ': length: ' + msgData.length)


							if (msgData == 'ta ') {
								let m = aobjids.giveid(false)
								new createbot(false, writer, aobjids, self.entities, [14, 0, 5], 'p ', 10, false, 0, 0, ws.player.id)
								ws.player.hp = ws.player.maxhp

								var newid = aobjids.giveid(true)
								self.entities[newid] = new arena(newid, ws.player.x, ws.player.y, ws.player, self.entities[m])
								ws.player.arenaid = newid
								self.entities[m].arenaid = newid
								ws.player.flags.push(33)
								self.entities[m].flags.push(33)




							}

							
							if (ws.isdeveloper == true) {

								if (msgData.startsWith('1v1:')) {
									var initial = msgData.split(":")
									var otherplayer;
									// get player by name:
									entities = self.entities
									for (let da in entities) {
										if (entities[da].type == 2) {
											if (entities[da].name == initial[1]) {
												otherplayer = entities[da]
											}
										}
									}
									ws.player.hp = ws.player.maxhp
									otherplayer.hp = otherplayer.maxhp
									var newid = aobjids.giveid(true)
									self.entities[newid] = new arena(newid, ws.player.x, ws.player.y, ws.player, otherplayer)
									ws.player.arenaid = newid
									otherplayer.arenaid = newid
									ws.player.flags.push(33)
									otherplayer.flags.push(33)
								}

								if (msgData == "sleig ") {
									fun.sleig(self.entities, writer, ws.player, 10, aobjids)

								}
								if (msgData == "i ") {

									var id = aobjids.giveid(true)
									var a = new hidinghole(id, ws.player.mouth.x, ws.player.mouth.y)

									self.entities[id] = a

								}
								new devcommands(ws, msgData, writer, util.randomNumber, self.entities, self.ws_new)

							}
							ws.player.chat(msgData, self.ws_new, writer)

							//Send to all

							break;

						case 53:
							if (!ws.exists) return;
							if (!ws.player) return;
							break;


						case 20:
							if (!ws.exists) return;
							if (!ws.player) return;

							var click = MsgReader.readUInt8();
							ws.player.abilitys.button_w_mini.abil_currentclick = click
							ws.player.abilitys.button_w.abil_currentclick = click

							ws.player.abiluse(bigabilities, aobjids, writer, self.entities, 1, self.ws_new)

							ws.player.abiluse(miniabilities, aobjids, writer, self.entities, 0, self.ws_new)

							break;

						case 21:

							if (!ws.exists) return;
							if (!ws.player) return;
							if (ws.player.isflying) return
							let boost = MsgReader.readUInt8();



							if (boost == 1) {

								ws.player.holdboost = true

							};
							if (boost == 0) {
								ws.player.holdboost = false
							}


							break;
						case 12:
							var nameLen = MsgReader.readUInt16();

							var ad = util.decode_utf8(MsgReader.readName((nameLen)));

							ws.newstring = ad
							break;
					};

				} catch (error) {
					console.log(error)
				}
			})

			function testclose() {

				ws.canSend = false;
				ws.askedchoice = false
				ws.isdeveloper = false



				if (!ws.isalive) return;

				ws.player.isdead = true

				ws.player.godmode = false

			}

			ws.on('close', function close() {

				ws.terminate();

				if (ws.declareddisconnection == false) {
					if (ips.includes(ws._socket.remoteAddress)) {
						var delO = ws._socket.remoteAddress; //delete possible dying object from game

						var tmp = ips.indexOf(delO); //remove from game arrays
						if (-1 != tmp) {
							ips.splice(tmp, 1);
						}
					}

					console.log("Player disconnected");
					ws.declareddisconnection = true


				}
				setTimeout(() => {
					ws.toupdate = []
					ws.tocreate = []
					ws.todelete = []
					ws.animals = []
					var oldid = ws.id

					setTimeout(() => {
						//ws = null
						setTimeout(() => {
							delete self.ws_new[oldid]//DESTROY HIM
						}, 1000);
					}, 1000);

				}, 5000);
				//testclose()
				//removes player
			});
			ws.updategame = function () {

				if (ws != null) {
					if (ws.player != null) {



						//console.log(mouseX + ":" + mouseY + ":" + mwd);
						//	console.log(players[ws.player.id].angle)
						//	console.log(ws.player.pos.x + ":"+ ws.player.pos.y)
						self.entities[ws.player.id] = ws.player;




						if (ws.player.isdead) {


							ws.animals = tierload.tier13(false)
							//animal,biome,species,truebiome
							ws.xp = ws.player.xp / 4
							ws.player = null
							spawnxp = ws.xp
							if (spawnxp > 3000000000) {
								spawnxp = 3000000000
							}
							if (ws.xp < 500000) {
								ws.xp = 500000
							}
							ws.send(writer.death(1, spawnxp))
							ws.send(writer.choice(5, 0, []))



							ws.isalive = false;
							ws.askedchoice = false

							ws.canSend = false;


						}
						if (!ws.canSend) return;
						if (self.entities[ws.player.id] == undefined) return;


						if (ws.player.x && ws.player.y > 10) {
							ws.camx = ws.player.x
							ws.camy = ws.player.y

						}
						ws.player.score = ws.player.xp
						if (ws.player.score > 3000000000) {
							ws.player.score = 3000000000
						}
						if (ws.player.score < 0) {
							ws.player.score = 0
						}

					}
				}
			}


			ws.sendMove = function () {
				if (!ws.player) return;


				//console.log(mouseX + ":" + mouseY + ":" + mwd);
				//	console.log(players[ws.player.id].angle)
				//	console.log(ws.player.pos.x + ":"+ ws.player.pos.y)

				ws.send(writer.abilityuse(ws.player.abilitys))



				new zoomentities(self.entities, ws)

				let trueupd = []
				let truedel = []
				let truecreate = []

				for (let upd in ws.toupdate) {
					if (ws.toupdate[upd].type != 0) {

						if (ws.player.flags.includes(33)) {
							if (ws.toupdate[upd].type == 2) {
								if (ws.toupdate[upd].arenaid == ws.player.arenaid) {
									trueupd.push(ws.toupdate[upd])

								} else {
									if (ws.toupdate[upd]) {
										truedel.push(ws.toupdate[upd])
									}
								}
							} else {
								trueupd.push(ws.toupdate[upd])
							}
						} else {
							trueupd.push(ws.toupdate[upd])
						}

					}

				}
				for (let crea in ws.tocreate) {


					if (ws.player.flags.includes(33)) {
						if (ws.tocreate[crea].type == 2) {
							if (ws.tocreate[crea].arenaid == ws.player.arenaid) {
								truecreate.push(ws.tocreate[crea])
							}
						} else {
							truecreate.push(ws.tocreate[crea])
						}

					} else {
						truecreate.push(ws.tocreate[crea])
					}
				}
				for (let del in ws.todelete) {

					truedel.push(ws.todelete[del])

				}
				ws.send(writer.worldUpdate(ws.camx * 4, ws.camy * 4, ws.player.playcamera * 1000, ws.player.score, ws.player.nextxp, ws.player.bar, truecreate, trueupd, truedel));  //x, y, zoom, xp, barType


				ws.todelete = []
				ws.tocreate = []


			};





			ws.send(writer.firstConnect(playersNum, serverVer));


		})
	} catch (error) {
		console.log(error)
	}
	console.log("Server on!")
	function pa() {
		if (boradupd <= Date.now()) {
			boradupd = Date.now() + 5000


			let board = [];




			for (let i in self.entities) {
				if (self.entities[i].type == 2 && !self.entities[i].isdead) {

					if (self.entities[i].isplayer) {
						if (!self.entities[i].isbot) {
							let score = ((game.load(2) == 2 || game.load(2) == 1) ? self.entities[i].kills : self.entities[i].xp)

							var o = {
								id: self.entities[i].id,
								score: score,
								name: self.entities[i].name,
								rank: self.entities[i].rank
								//RANK IS ALREADY RECREATED.
							};
							board.push(o);

						}
					}
				}
			}
			board.sort(function (a, b) {
				return parseFloat(b.score) - parseFloat(a.score);
			});
			howmuchalive = 0
			howmuchonline = 0
			playersNum = 0
			for (let mar in self.ws_new) {

				if (self.ws_new[mar].isalive) {
					playersNum++
					howmuchalive++
				} else {
					howmuchonline++
				}
			}

			for (let a in self.ws_new) {



				self.ws_new[a].send(writer.serverinfo(howmuchalive, howmuchonline))
				try {
					if (self.ws_new[a].isalive) {

						for (let i in board) {

							if (board[i].id == self.ws_new[a].player.id) {
								self.ws_new[a].player.rank = parseInt(i) + 1
							}
						}
						self.ws_new[a].send(writer.leaderboard(self.ws_new[a].player.rank, board));

					}
				} catch (error) {
					console.log(error)
				}

			}
			board = [];

		}
		if (new1stimecount <= Date.now()) {
			new1stimecount = Date.now() + 1000
			for (let par in self.ws_new) {
				//console.log(ws.toupdate)

				self.ws_new[par].timerafk++
				if (self.ws_new[par].timerafk >= 300) {
					self.ws_new[par].close();
				}
			}
		}
		if (updtime <= Date.now()) {
			updtime = Date.now() + 50


			new worldUpdate(aobjids, writer, QuadTree, self.entities, self.ws_new, serverstarted)



		}

		setTimeout(() => {
			pa()
		}, 0);
	}
	pa()
}
gameserver.prototype = {

}
module.exports = gameserver