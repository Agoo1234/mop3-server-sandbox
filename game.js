var gameW = 9000
var gameH = 8000

const gamemode = 0


const maxplayers = 50
const maxbots = 100
const timeupgrade = 15 // in seconds
const maxips = 2
const botsabilityuse = false
const collideeveryone = false
const respawnbots = true
if (gamemode == 2) {
    gameW = 6000
    gameH = 6000

}
function game() {

}
game.prototype = {
    load: function (type) {
        var obj = 0
        switch (type) {
            case 0://GAME WIDTH
                obj = gameW
                break
            case 1://GAME HEIGHT
                obj = gameH
                break
            case 2://GAME MODE
                obj = gamemode
                break
            case 3://MAX PLAYERS
                obj = maxplayers
                break
            case 4://MAX BOTS
                obj = maxbots
                break
            case 5://UPGRADE TIME
                obj = timeupgrade
                break
            case 6://MAX IPS
                obj = maxips
                break
            case 7:
                obj = botsabilityuse
                break
            case 8:
                obj = collideeveryone
                break
            case 9:
                obj = respawnbots
                break
        }
        return obj;

    }
}
module.exports = game