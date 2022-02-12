
const utils1 = require("../../modules/IMPmodules/util")
const fireuse = require('../../entity/abilitys/fire/fireballuse')
const util = new utils1()
function abilities(aobjids, player, entities, writer, aws_new) {
    if (entities[player]) {

        if (!entities[player].flags.includes(33) && (entities[player].abilitys.button_w_mini.abil_usable && !entities[player].abilitys.button_w_mini.abil_recharging && !entities[player].invincible
            || entities[player].abilitys.button_w.abil_usable && !entities[player].abilitys.button_w.abil_recharging && !entities[player].invincible) || entities[player].flags.includes(99)) {
            let which = -1
            switch (entities[player].abilitys.button_w_mini.abil_Type) {

                case 100://dive



                    if (entities[player]) {
                        if (entities[player].abilitys.button_w_mini.abil_currentclick == 1) {

                            if (entities[player].secondaryType == 77 && entities[player].usingability) return;
                            if (((entities[player].bar.normalbar == 0 || entities[player].bar.normalbar == 3) && entities[player].biome == 1 || entities[player].bar.normalbar == 2 && entities[player].biome == 3)
                                && !entities[player].isdiving && !entities[player].isflying && !entities[player].isintree &&
                                entities[player].abilitys.button_w_mini.abil_currentclick == 1 &&
                                !entities[player].abilitys.button_w_mini.abil_active &&
                                !entities[player].abilitys.button_w_mini.abil_recharging && entities[player].candive) {
                                which = 0
                                entities[player].isdiving = true
                                entities[player].abilitys.button_w_mini.abil_active = true
                            }

                        }
                    }


                    break;
            }
            switch (entities[player].abilitys.button_w.abil_Type) {
                case 19://fire

                    if (entities[player]) {
                        let self = entities[player]
                        if (self.abilitys.button_w.abil_currentclick == 1) {

                            if (!self.abilitys.button_w.abil_recharging && !self.isflying && !self.isdiving) {
                                which = 1
                                self.abilitys.button_w.abil_recharging = true
                                self.abilitys.button_w.abil_timestamp = Date.now() + self.abilitys.button_w.abil_time * 1000;
                                if (self.ws) {
                                    self.ws.send(writer.abilitytimer(self.abilitys, which))
                                }

                                let angle = 12.5

                                if (self.secondaryType == 46) {
                                    new fireuse(aobjids, 0, entities, self.id, self.specType2)

                                    new fireuse(aobjids, angle * 2, entities, self.id, self.specType2)

                                    new fireuse(aobjids, -angle * 2, entities, self.id, self.specType2)

                                } else {
                                    new fireuse(aobjids, 0, entities, self.id, self.specType2)
                                }
                            }


                        }
                    }
                    break;



            }
            return which
        }
    }
}
abilities.prototype = {}
module.exports = abilities