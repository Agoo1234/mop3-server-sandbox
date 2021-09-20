
const fireuse = require('../../entity/abilitys/fire/fireballuse')
const sinkholeuse = require('../../entity/abilitys/sinkholeuse')
const firetornadouse = require('../../entity/abilitys/firetornado/firetornadouse')

const spear = require('../../entity/objects/abilitys/spear')

const trexbite = require('../../entity/abilitys/trexbiteuse')
const krakenspec = require('../../entity/abilitys/krakenspecuse')
const elephanttrunk = require('../../entity/abilitys/elephanttrunkuse')
const iceabiluse = require('../../entity/abilitys/crystalfireuse')
const crabsmash = require('../../entity/abilitys/crabuse')
const yetitransform = require('../../entity/abilitys/yetitransformuse')

const thunderabil = require('../../entity/abilitys/thunderabil')

const seaspecuse = require('../../entity/abilitys/seaspecuse')
const stingscorpionabiluse = require('../../entity/abilitys/stingscorpionabiluse')
const spiderweb = require('../../entity/abilitys/spiderwebspin')

const pterodactylability = require('../../entity/abilitys/pterodactylability')
const bluewhaletailslap = require('../../entity/abilitys/bluewhaletailslap')



const utils1 = require("../../modules/IMPmodules/util")

const util = new utils1()


function abilities(aobjids, player, entities, writer, which, aws_new) {
	if (entities[player]) {
		let self = entities[player]

		if (!self.flags.includes(33) && self.abilitys.button_w.abil_usable && !self.abilitys.button_w.abil_recharging && !self.invincible || self.flags.includes(99)) {

			switch (self.abilitys.button_w.abil_Type) {
				case 81:
					if (self.abilitys.button_w.abil_currentclick == 1 && !self.abilitys.button_w.abil_active) {
						self.abilitys.button_w.abil_timestamptouch = Date.now()
						self.abilitys.button_w.abil_active = true
						self.usingability = true
						self.isabletoboost = false
						self.candive = false
					}
					if (self.abilitys.button_w.abil_currentclick == 0 && self.abilitys.button_w.abil_active) {



						if (self.spearInHand) self.spearInHand = false;
						self.isabletoboost = true
						self.candive = true
						self.abilitys.button_w.abil_active = false

						self.abilitys.button_w.abil_recharging = true
						self.abilitys.button_w.abil_timestamp = Date.now() + self.abilitys.button_w.abil_time * 1000;
						if (self.ws) {
							self.ws.send(writer.abilitytimer(self.abilitys, which))
						}
						self.chat("OOGA BOOGA! ", aws_new, writer)
						let newid = aobjids.giveid(true)
						let newangle = util.getcorrectangle(self.angle - 90)
						let newpos = util.rotate(self.x, self.y, self.x - self.radius / 2, self.y + self.radius / 2, self.angle)
						let newspear = new spear(newid, self.id, newpos.x, newpos.y, newangle, self.radius, 2, 0, "Spear")
						entities[newid] = newspear



						setTimeout(() => {
							if (self.usingability) self.usingability = false
							setTimeout(() => {
								self.spearInHand = true
							}, self.abilitys.button_w.abil_time * 1000);


						}, 350);



					}
					break
				case 253://fly high test

					if (self.abilitys.button_w.abil_currentclick == 0 && !self.abilitys.button_w.abil_active) {
						self.abilitys.button_w.abil_active = true
						self.goingsky = true
						self.usingability = true
						self.isflying = true
						self.zoomwidth *= 2
						self.zoomheight *= 2
						self.playcamera /= 2;


					} else if (self.abilitys.button_w.abil_currentclick == 0 && self.abilitys.button_w.abil_active && self.z == 50) {
						self.goingsky = false
						let flyhigh = setInterval(() => {
							if (entities[player]) {
								if (self.z == 0) {
									clearInterval(flyhigh)
									self.usingability = false
									self.isflying = false
									self.abilitys.button_w.abil_active = false
									self.zoomwidth /= 2;
									self.zoomheight /= 2;
									self.playcamera *= 2;

								}
							} else {
								clearInterval(flyhigh)
							}
						}, 0);
					}
					break;
				case 37://trex bite

					if (self.abilitys.button_w.abil_currentclick == 0 && !self.abilitys.button_w.abil_active && !self.isdiving) {
						self.usingability = true
						self.isabletoboost = false
						new trexbite(aobjids, entities, self.id, which, writer)
					} else if (self.abilitys.button_w.abil_active) {
						if (self.abilitys.button_w.abil_currentclick == 0) {
							self.usingability = false
						}
					}
					break;
				case 79:
					if (self.abilitys.button_w.abil_currentclick == 1 && !self.abilitys.button_w.abil_active) {
						new stingscorpionabiluse(entities, player, writer, which)
					}

					break;
				case 35://web spider
					if (self.abilitys.button_w.abil_currentclick == 1 && !self.abilitys.button_w.abil_active && !self.isdiving) {
						let pos = util.rotate(self.pos.x, self.pos.y, self.pos.x + self.radius * 1.4, self.pos.y, self.angle);

						new spiderweb(aobjids, entities, pos, player, writer, which)

					}
					break
				case 63://sea spec
					if (self.abilitys.button_w.abil_currentclick == 0) {
						new seaspecuse(aobjids, entities, player)
						self.abilitys.button_w.abil_recharging = true
						self.abilitys.button_w.abil_timestamp = Date.now() + self.abilitys.button_w.abil_time * 1000;
						if (self.ws) {
							self.ws.send(writer.abilitytimer(self.abilitys, which))
						}
					}
					break
				case 66://sink hole
					if (self.abilitys.button_w.abil_currentclick == 0) {
						new sinkholeuse(aobjids, entities, player)
						self.abilitys.button_w.abil_recharging = true
						self.abilitys.button_w.abil_timestamp = Date.now() + self.abilitys.button_w.abil_time * 1000;
						if (self.ws) {
							self.ws.send(writer.abilitytimer(self.abilitys, which))
						}
					}
					break;
				case 51://crab smash
					if (self.abilitys.button_w.abil_currentclick == 0) {
						if (self.abilitys.button_w.abil_timestamplet < Date.now() && self.abilitys.button_w.abil_timestamplet != 0) {
							new crabsmash(aobjids, entities, player, 0);
							new crabsmash(aobjids, entities, player, 1);
							self.abilitys.button_w.abil_timestamplet = 0;
							self.abilitys.button_w.abil_recharging = true
							let oldcrab = self.abilitys.button_w.abil_time
							self.abilitys.button_w.abil_time = self.abilitys.button_w.abil_time * 2
							self.abilitys.button_w.abil_timestamp = Date.now() + (self.abilitys.button_w.abil_time) * 1000;
							if (self.ws) {
								self.ws.send(writer.abilitytimer(self.abilitys, which))
							}
							self.abilitys.button_w.abil_time = oldcrab
						} else {


							new crabsmash(aobjids, entities, player, Math.floor(Math.random() * 2))
							self.abilitys.button_w.abil_timestamplet = 0;
							self.abilitys.button_w.abil_recharging = true
							self.abilitys.button_w.abil_timestamp = Date.now() + self.abilitys.button_w.abil_time * 1000;
							if (self.ws) {
								self.ws.send(writer.abilitytimer(self.abilitys, which))
							}
						}
					} else {
						self.abilitys.button_w.abil_timestamplet = Date.now() + 8000;
					}
					break;
				case 11://yeti freeze
					if (!self.usingability && !self.abilitys.button_w.abil_recharging) {
						if (self.abilitys.button_w.abil_currentclick == 1) {
							self.usingability = true
							self.transforming = true
							self.isabletoboost = false
							self.candive = false
							self.abilitys.button_w.abil_active = true
						}
					} else {
						if (self.abilitys.button_w.abil_currentclick == 0) {
							new yetitransform(aobjids, entities, player)
							self.abilitys.button_w.abil_active = false
							self.abilitys.button_w.abil_recharging = true
							self.specType = 1
							self.transforming = false
							//eventgamehandler.sendabilityrechage(entities[player], which)
							self.abilitys.button_w.abil_timestamp = Date.now() + self.abilitys.button_w.abil_time * 1000;
							if (self.ws) {
								self.ws.send(writer.abilitytimer(self.abilitys, which))
							}
							setTimeout(() => {
								if (entities[player]) {

									self.usingability = false
									self.isabletoboost = true
									self.candive = true
									self.specType = 0
								}
							}, 1500);

						}
					}
					break;
				case 77://dino charge
					if (!self.abilitys.button_w.abil_active) {
						if (!self.usingability) {
							if (self.abilitys.button_w.abil_currentclick == 1 && !self.isdiving) {
								self.usingability = true
								self.isabletoboost = false
								self.abilitys.button_w.abil_active = true
								let oldspeed = self.speeds.flyspeed
								let kickinair = Date.now() + 3000;
								let m = setInterval(() => {
									if (entities[player]) {
										if (Date.now() > kickinair || !self.usingability) {
											clearInterval(m);

											if (self.usingability) self.usingability = false;
											self.speeds.flyspeed = oldspeed
											self.isabletoboost = true;
											self.abilitys.button_w.abil_recharging = true
											self.abilitys.button_w.abil_timestamp = Date.now() + self.abilitys.button_w.abil_time * 1000;

											if (self.ws) {
												self.ws.send(writer.abilitytimer(self.abilitys, which))
											}
										} else {
											self.speeds.flyspeed += self.speeds.flyspeed / 100
										}
									} else {
										clearInterval(m)
									}
								}, 20);
							}
						} else if (self.abilitys.button_w.abil_currentclick == 1) {

							self.usingability = false
						}
					}
					break;
				case 81://spear

					break
				case 5://kraken spec
					if (self.abilitys.button_w.abil_currentclick == 0 && !self.abilitys.button_w.abil_active) {

						new krakenspec(aobjids, entities, player)
						self.usingability = true
						self.candive = false;
						self.isabletoboost = false
						self.abilitys.button_w.abil_active = true
						setTimeout(() => {
							if (entities[player]) {
								self.usingability = false;
								self.candive = true;
								self.abilitys.button_w.abil_recharging = true
								self.isabletoboost = true
								self.abilitys.button_w.abil_timestamp = Date.now() + self.abilitys.button_w.abil_time * 1000;
								if (self.ws) {
									self.ws.send(writer.abilitytimer(self.abilitys, which))
								}
							}
						}, 2000);

					}
					break;
				case 32:
					if (self.abilitys.button_w.abil_currentclick == 0 && !self.abilitys.button_w.abil_active) {

						new bluewhaletailslap(aobjids, entities, player)
						self.usingability = true

						self.isabletoboost = false

						self.abilitys.button_w.abil_recharging = true

						self.abilitys.button_w.abil_timestamp = Date.now() + self.abilitys.button_w.abil_time * 1000;
						if (self.ws) {
							self.ws.send(writer.abilitytimer(self.abilitys, which))
						}
						setTimeout(() => {
							if (entities[player]) {
								self.usingability = false;
								self.isabletoboost = true;
							}
						}, 300);



					}
					break;
				case 31:
					if (self.abilitys.button_w.abil_currentclick == 0 && !self.abilitys.button_w.abil_active) {

						new elephanttrunk(aobjids, entities, player)
						self.usingability = true

						self.isabletoboost = false

						self.abilitys.button_w.abil_recharging = true

						self.abilitys.button_w.abil_timestamp = Date.now() + self.abilitys.button_w.abil_time * 1000;
						if (self.ws) {
							self.ws.send(writer.abilitytimer(self.abilitys, which))
						}
						setTimeout(() => {
							if (entities[player]) {
								self.usingability = false;
								self.isabletoboost = true


							}
						}, 300);



					}
					break;
				case 80: //pterodactyl grab abil 
					new pterodactylability(entities, player, which)
					break;
				case 78://thunderbird attack

					new thunderabil(entities, player, aobjids, writer, which)



					break;
				case 76://icemonster abil
					if (self.abilitys.button_w.abil_currentclick == 0 && !self.isdiving) {
						if (self.type == 2 && self.secondaryType == 72) {
							let m = []
							for (let i = 0; i < self.crystals.length; i++) {
								if (self.crystals[i].lvl == self.crystals[i].maxlvl) {
									m.push(i)
								}
							}
							if (m.length != 0) {
								self.crystals[m[Math.floor(Math.random() * m.length)]].lvl = 0

								new iceabiluse(aobjids, 0, entities, player)
								self.abilitys.button_w.abil_recharging = true
								self.abilitys.button_w.abil_timestamp = Date.now() + self.abilitys.button_w.abil_time * 1000;
								if (self.ws) {
									self.ws.send(writer.abilitytimer(self.abilitys, which))
								}

							} else {

								if (self.ws) {
									self.ws.send(writer.playerevent(255, "Wait for crystals to grow before you can throw them!"))
								}
							}
						} else {
							new iceabiluse(aobjids, 0, entities, player)
						}
					}
					break;;

				case 61:// fire tornado
					if (self.abilitys.button_w.abil_currentclick == 1) {


						new firetornadouse(aobjids, 0, entities, player)


						self.abilitys.button_w.abil_recharging = true
						self.abilitys.button_w.abil_timestamp = Date.now() + self.abilitys.button_w.abil_time * 1000;
						if (self.ws) {
							self.ws.send(writer.abilitytimer(self.abilitys, which))
						}



					}
					break;

				case 30:

					if (self.abilitys.button_w.abil_currentclick == 1 && !self.abilitys.button_w.abil_active) {
						let fires = 0
						let lasttimefire = Date.now()
						self.abilitys.button_w.abil_active = true
						let streamfire = setInterval(() => {
							if (!entities[player]) {
								clearInterval(streamfire)

								return
							}
							if (self.abilitys.button_w.abil_currentclick == 0 || fires >= 20) {
								clearInterval(streamfire);
								self.abilitys.button_w.abil_recharging = true
								self.abilitys.button_w.abil_active = false
								self.abilitys.button_w.abil_timestamp = Date.now() + self.abilitys.button_w.abil_time * 1000;
								if (self.ws) {
									self.ws.send(writer.abilitytimer(self.abilitys, which))
								}

								return
							} else {
								let angle = 12.5
								if (lasttimefire <= Date.now()) {
									lasttimefire = Date.now() + 75
									new fireuse(aobjids, 0, entities, self.id, self.specType2)

									new fireuse(aobjids, angle * 2, entities, self.id, self.specType2)

									new fireuse(aobjids, -angle * 2, entities, self.id, self.specType2)

									fires++
								}
							}
						}, 1);

					}
					break
			}
		}
	}
}
abilities.prototype = {}
module.exports = abilities