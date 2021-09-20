function checkloadedplayer(entities, i, ws_new) {
    if (entities[i].spawnedtime + 1000 <= Date.now()) {
        if (entities[i].type == 2 && entities[i].isinhole) {
            entities[i].isloaded = true
            return
        }
        var amcounts = 0
        for (let arm in ws_new) {
            amcounts++
            break
        }
        var amountof = false
        if (amcounts > 0) {

            try {

                for (let d in ws_new) {
                    if (ws_new[d].toupdate.includes(entities[i])) {
                        amountof = true
                        break
                    };
                };

                if (!amountof) {
                    entities[i].isloaded = false
                } else {
                    entities[i].isloaded = true
                }
            } catch (error) {
                console.log(error)
            }
        }
    } else {
        entities[i].isloaded = true
    }
}
checkloadedplayer.prototype = {}
module.exports = checkloadedplayer