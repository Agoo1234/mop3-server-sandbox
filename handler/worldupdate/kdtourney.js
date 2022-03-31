const arena = require("../../entity/objects/objects/arena")
const entityclear = require("../../modules/entityclear")

ishappening = false;
people = []
availible = []

function kdtourney(aobjids, ws_new, entities, who) {
    people = who
    who = people
    if (who.type == 2) {
        for (let i = 0; i < who.length; i+= 2) {
            let ent = entities[who[i]]
            let ent2 = entities[who[i+1]]
            ent.xp = 100000000;
            ent.secondaryType = 79;
            ent2.xp = 100000000;
            ent2.secondaryType = 79;
            var arenaid = aobjids.giveid(true);
            entities[arenaid] = new arena(arenaid, ent.x, ent.y, ent, ent2)
            ent.arena = arenaid;
            ent2.arena = arenaid;
            ent.flags.push(33)
            ent2.flags.push(33);
        }
    }
}

kdtourney.prototype = {
    happening: function() {
        return ishappening;
    },
    getList: function() {
        return people;
    },
    setList: function(newpeople) {
        people = newpeople;
    },
    getAvail: function() {
        return availible;
    },
    setAvail: function(newavail) {
        availible = newavail;
    },
    addAvail: function(newavail) {
        availible.push(newavail);
    },
    resetTourney: function() {
        ishappening = false;
        people = []
        availible = []
    }
}

module.exports = kdtourney