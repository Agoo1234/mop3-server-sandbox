
const utils1 = require("../../modules/IMPmodules/util")

const util = new utils1()
function abilities(aobjids, player, entities, writer, which, aws_new) {
	if (entities[player]) {


		if (!entities[player].flags.includes(33) && entities[player].abilitys.button_w_mini.abil_usable && !entities[player].abilitys.button_w_mini.abil_recharging && !entities[player].invincible || entities[player].flags.includes(99)) {

			switch (entities[player].abilitys.button_w_mini.abil_Type) {

				/*case 100://dive



					var dive = setInterval(() => {

						if (entities[player]) {
							if (entities[player].abilitys.button_w_mini.abil_currentclick == 1) {

								if (entities[player].secondaryType == 77 && entities[player].usingability) return;
								if (((entities[player].bar.normalbar == 0 || entities[player].bar.normalbar == 3) && entities[player].biome == 1 || entities[player].bar.normalbar == 2 && entities[player].biome == 3)
									&& !entities[player].isdiving && !entities[player].isflying && !entities[player].isintree &&
									entities[player].abilitys.button_w_mini.abil_currentclick == 1 &&
									!entities[player].abilitys.button_w_mini.abil_active &&
									!entities[player].abilitys.button_w_mini.abil_recharging && entities[player].candive) {
									entities[player].isdiving = true
									entities[player].abilitys.button_w_mini.abil_active = true
								}
								if ((((entities[player].bar.normalbar == 0 && entities[player].biome != 1 || entities[player].bar.normalbar == 2 && entities[player].biome != 3))
									|| (entities[player].bar.airbarpercentage == 0.01) || (entities[player].isintree || entities[player].isflying)) && entities[player].isdiving) {
									entities[player].abilitys.button_w_mini.abil_active = false
									entities[player].abilitys.button_w_mini.abil_recharging = true
									entities[player].abilitys.button_w_mini.abil_timestamp = Date.now() + entities[player].abilitys.button_w_mini.abil_time * 1000;
									entities[player].isdiving = false

									if (entities[player].ws) {
										entities[player].ws.send(writer.abilitytimer(entities[player].abilitys, which))
									}

								}
							} else {
								if (entities[player].isdiving) {
									entities[player].abilitys.button_w_mini.abil_active = false
									entities[player].abilitys.button_w_mini.abil_recharging = true
									entities[player].abilitys.button_w_mini.abil_timestamp = Date.now() + entities[player].abilitys.button_w_mini.abil_time * 1000;
									entities[player].isdiving = false

									if (entities[player].ws) {
										entities[player].ws.send(writer.abilitytimer(entities[player].abilitys, which))
									}
								}
								clearInterval(dive)
							}
						} else {
							clearInterval(dive)
						}

					}, 10);

					break;*/



			}
		}
	}
}
abilities.prototype = {}
module.exports = abilities