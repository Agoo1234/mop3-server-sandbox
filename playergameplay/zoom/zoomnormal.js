function zoomnormal(entities, da, ws) {
    let width = ws.isalive ? ws.player.zoomwidth : ws.zoomwidth
    let height = ws.isalive ? ws.player.zoomheight : ws.zoomheight
    //IF PLAYER IS NOT IN ARENA
    if (entities[da].isbiome == false) {
        var rect1 = { x: ws.camx, y: ws.camy, width: width + (entities[da].radius), height: height + (entities[da].radius) }
        var rect2 = { x: entities[da].x, y: entities[da].y, width: width + (entities[da].radius), height: height + (entities[da].radius) }
    } else {
        var rect1 = { x: ws.camx, y: ws.camy, width: width + entities[da].width, height: height + entities[da].height }
        var rect2 = { x: entities[da].x, y: entities[da].y, width: width + entities[da].width, height: height + entities[da].height }
    }
    dx = entities[da].x - ws.camx
    dy = entities[da].y - ws.camy

    dist = Math.sqrt(dx * dx + dy * dy);
    //console.log(dist)


    if (rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.height + rect1.y > rect2.y) {


        if (!ws.toupdate.includes(entities[da])) {

            ws.tocreate.push(entities[da])

            ws.toupdate.push(entities[da])


        }


    } else {

        if (ws.toupdate.includes(entities[da])) {


            var delO = entities[da]; //delete possible dying object from game



            var tmp = ws.toupdate.indexOf(delO); //remove from game arrays
            if (-1 != tmp) {
                ws.toupdate.splice(tmp, 1);
            }

            ws.todelete.push(delO)

        }
    }
}
zoomnormal.prototype = {}
module.exports = zoomnormal
