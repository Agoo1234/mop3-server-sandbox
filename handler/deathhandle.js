const game1 = require('../game');
const game = new game1()

function deathhandle(entities, player2, player1) {
    try {
        if (entities[player2].hp < 0.01) {

            entities[player2].killerid = entities[player1].id
            entities[player1].lasthp = entities[player1].maxhp
            entities[player1].hp += entities[player1].maxhp / 6
            entities[player1].kills++
            entities[player1].xp += entities[player2].xp / 1.5
            entities[player1].barpercentage = 100

            entities[player2].hp = entities[player2].maxhp

            entities[player2].isdead = true
            if (entities[player2].ws) {
                entities[player2].ws.spectatingon = player1
            }

        }

    } catch (error) {
        console.log(error);
    }
}
deathhandle.prototype = {}
module.exports = deathhandle