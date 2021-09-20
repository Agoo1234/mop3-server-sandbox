
function randomNumber(min, max) {
	return Math.random() * (max - min) + min;
}

function apexchoice(a, which, animals, idanimal, entities, spawned) {

	var land = []
	var ocean = []
	var arctic = []
	var volcano = []
	for (var i in entities) {
		if (entities[i].type == 1) {
			land.push(entities[i].id)
		}
		if (entities[i].type == 12) {
			ocean.push(entities[i].id)
		}
		if (entities[i].type == 16) {
			arctic.push(entities[i].id)
		}
		if (entities[i].type == 47) {
			volcano.push(entities[i].id)
		}
	}
	for (var i = 0; i < animals.length / 3; i++) { //3x

		if (which > (animals.length / 3) - 1) which = 0
		if (which == idanimal / 3) {
			a.secondaryType = animals[idanimal]
			idanimal++
			a.spawnbiome = animals[idanimal]
			let biome = animals[idanimal]
			idanimal++
			a.species = animals[idanimal]
			idanimal++

			if (spawned) {
				if (biome == 0) {

					randomtype = Math.floor(Math.random() * land.length);

					a.pos.x = randomNumber(entities[land[randomtype]].x - entities[land[randomtype]].width / 2, entities[land[randomtype]].x + entities[land[randomtype]].width / 2)
					a.pos.y = randomNumber(entities[land[randomtype]].y - entities[land[randomtype]].height / 2, entities[land[randomtype]].y + entities[land[randomtype]].height / 2)
				}

				if (biome == 1) {//ocean

					randomtype = Math.floor(Math.random() * ocean.length);

					a.pos.x = randomNumber(entities[ocean[randomtype]].x - entities[ocean[randomtype]].width / 2, entities[ocean[randomtype]].x + entities[ocean[randomtype]].width / 2)
					a.pos.y = randomNumber(entities[ocean[randomtype]].y - entities[ocean[randomtype]].height / 2, entities[ocean[randomtype]].y + entities[ocean[randomtype]].height / 2)

				}
				if (biome == 2) {//arctic
					randomtype = Math.floor(Math.random() * arctic.length);

					a.pos.x = randomNumber(entities[arctic[randomtype]].x - entities[arctic[randomtype]].width / 2, entities[arctic[randomtype]].x + entities[arctic[randomtype]].width / 2)
					a.pos.y = randomNumber(entities[arctic[randomtype]].y - entities[arctic[randomtype]].height / 2, entities[arctic[randomtype]].y + entities[arctic[randomtype]].height / 2)


				}
				if (biome == 3) {//lava

					randomtype = Math.floor(Math.random() * volcano.length);
					a.pos.x = randomNumber(entities[volcano[randomtype]].x - entities[volcano[randomtype]].radius / 2, entities[volcano[randomtype]].x + entities[volcano[randomtype]].radius / 2)
					a.pos.y = randomNumber(entities[volcano[randomtype]].y - entities[volcano[randomtype]].radius / 2, entities[volcano[randomtype]].y + entities[volcano[randomtype]].radius / 2)
				}
			}

		} else {
			idanimal++
			idanimal++
			idanimal++
		}


	}






}
apexchoice.prototype = {

}
module.exports = apexchoice