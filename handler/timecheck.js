const spear = require('../entity/objects/abilitys/spear')
const firewood = require('../entity/objects/objects/firewood')
const game1 = require('../game');
const game = new game1()

const Writer = require('../modules/IMPmodules/writer');
const writer = new Writer()

const utils1 = require('../modules/IMPmodules/util');
const fire = require('../entity/objects/abilitys/fire');
const util = new utils1()
function timecheck(entities, player, aobjids, aws_new) {

    try {
        let self = entities[player]
        if (self.isdead) return;
        if (self.spawned) {
            if (self.spawnedtime + 200 <= Date.now()) {
                self.spawned = false
            }
        }
        switch (self.type) {
            case 2:
                switch (self.secondaryType) {
                    case 80://bigfoot
                        if (self.abilitys.button_w.abil_timestamptouch + 2000 <= Date.now() && self.abilitys.button_w.abil_firesectime * 1000 <= Date.now() && self.abilitys.button_w.abil_currentclick == 1 && self.abilitys.button_w.abil_active) {
                            if (self.spearInHand) self.spearInHand = false;
                            self.abilitys.button_w.abil_lastsecfireuse = Date.now()
                            self.isabletoboost = true
                            self.candive = true
                            self.abilitys.button_w.abil_active = false

                            self.abilitys.button_w.abil_recharging = true
                            self.abilitys.button_w.abil_timestamp = Date.now() + self.abilitys.button_w.abil_time * 1000;
                            if (self.ws) {
                                self.ws.send(writer.abilitytimer(self.abilitys, 1))
                            }
                            self.chat("FIRE BOOGA! ", aws_new, writer)
                            let newid = aobjids.giveid(true)
                            let newangle = util.getcorrectangle(self.angle - 90)

                            let newpos = util.rotate(self.x, self.y, self.x - self.radius / 2, self.y + self.radius / 1.5, self.angle)
                            let newspear = new spear(newid, self.id, newpos.x, newpos.y, newangle, self.radius, 2, 0, "FireWood")
                            entities[newid] = newspear
                            setTimeout(() => {
                                if (self.usingability) self.usingability = false
                                setTimeout(() => {
                                    self.spearInHand = true
                                }, self.abilitys.button_w.abil_time * 1000);
                            }, 350)


                        }
                        break
                }
                break

            case 14:
                switch (self.secondaryType) {
                    case 81://bigfoot
                        if (self.specType != 2) {
                            if (self.speartype == "Spear") {
                                if (self.victimID == 0) {
                                    if (self.spawnedtime + 2400 <= Date.now()) {
                                        self.isdead = true
                                    }
                                } else {

                                } if (self.spawnedtime + 4000 <= Date.now()) {
                                    self.isdead = true
                                }
                                break
                            } else if (self.speartype == "FireWood") {
                                if (self.spawnedtime + 300 <= Date.now()) {
                                    self.isdead = true
                                    let newid = aobjids.giveid(true)
                                    entities[newid] = new firewood(newid, self.x, self.y, self.spawnedby2)
                                }
                            } else {
                                console.log('ERROR , NOT KNOWN BIGFOOT SPEAR TYPE ' + self.speartype)
                            }
                        } else {
                            if (self.spawnedtime + 250 <= Date.now() && self.specType2 == 0) {
                                self.specType2 = 1
                            }
                            if (self.spawnedtime + 350 <= Date.now()) {
                                self.isdead = true
                                let newid = aobjids.giveid(true)
                                let angnew = 0
                                self.angle = util.getcorrectangle(self.angle + angnew)
                                let newangle = util.getcorrectangle(self.angle - (185))
                                let secnewangle = util.getcorrectangle(self.angle - (95))
                                let newpos = util.rotate(self.x, self.y, self.x - self.radius / 1.5, self.y, self.angle)
                                let velonew = util.rotate(0, 0, 0 + 15, 0, secnewangle)
                                let newspear = new spear(newid, self.spawnedby2, newpos.x, newpos.y, newangle, self.radius / 4, 0, 0, self.speartype)
                                newspear.veloX = velonew.x
                                newspear.veloY = velonew.y
                                entities[newid] = newspear
                            }
                        }
                }
                break
            case 70:

                if (self.acase == "bigfootfire") {

                    if (self.spawnedtime + 1000 < Date.now() || !entities[self.spawnedby]) {

                        self.isdead = true

                    }
                } else {
                    if (self.spawnedtime + 3000 < Date.now()) {
                        self.isdead = true
                    }
                }
                break
            case 18:
                if (self.spawnedtime + 2500 < Date.now()) {
                    self.isdead = true

                    let newid = aobjids.giveid(true)
                    entities[newid] = new fire(newid, self.spawnedby2, self.x, self.y, self.specType, self.id, self.radius * 1.5, "FireBall")


                }
                break
            case 87:
                if (self.isloaded & self.spawnedtime + 200 <= Date.now()) {
                    if (self.lastfire + 50 <= Date.now()) {
                        self.lastfire = Date.now()

                        let newid = aobjids.giveid(true)
                        entities[newid] = new fire(newid, self.spawnedby2,
                            self.x
                            + util.randomNumber(-self.radius / 1.2, self.radius / 1.2)
                            , self.y
                            + util.randomNumber(-self.radius / 2, self.radius / 2.5)
                            , 0, self.id, util.randomNumber(15, 20), "bigfootfire")

                    }
                }
                if (self.spawnedtime + 500 < Date.now()) {
                    self.movable = false
                }
                if (self.spawnedtime + 60000 < Date.now()) {
                    self.isdead = true
                }
                break
        }
        if (self.class == 'Food') {
            if (self.spawnedtime + self.deathtime * 1000 <= Date.now()) {
                self.isdead = true
            }
        }
    } catch (error) {
        console.log(error);
    }
}
timecheck.prototype = {}
module.exports = timecheck