

const util1 = require("./IMPmodules/util")
const util = new util1()
function collisiondynamic(entities, entity1, entity2, reverse, dist, normalspeed) {
    let confirm = true

    while (confirm) {
        if (dist == 0) {
            confirm = false
            return
        }
        let overlap = (((entity1.radius + entity2.radius) - dist) / 2);

        if (reverse == "objtest") {
            if (normalspeed < 0) {
                normalspeed = -normalspeed
            }

            let anglespeed2 = util.anglebetween2point(entity1.x, entity1.y, entity2.x, entity2.y)
            let anglespeed1 = util.anglebetween2point(entity2.x, entity2.y, entity1.x, entity1.y)

            let firstpos1 = util.rotate(0, 0, 0 + normalspeed, 0, anglespeed1)
            let firstpos2 = util.rotate(0, 0, 0 + normalspeed, 0, anglespeed2)



            if (entity2.movable) {


                entity2.x += firstpos2.x
                entity2.y += firstpos2.y
                if (entity2.pos) {
                    entity2.pos.x += firstpos2.x
                    entity2.pos.y += firstpos2.y

                }
            }
            if (entity1.movable) {


                entity1.x += firstpos1.x
                entity1.y += firstpos1.y
                if (entity1.pos) {
                    entity1.pos.x += firstpos1.x
                    entity1.pos.y += firstpos1.y

                }
            }


        } else if (reverse == "tailslap") {

            if (normalspeed < 0) {
                normalspeed = -normalspeed
            }
            if (dist === 1) {

                if (entity2.movable) {
                    let tailslapent2 = util.rotate(entity1.x, entity1.y, entity1.x - entity1.radius * 1, entity1.y, entity1.angle)
                    let anglespeed2 = util.anglebetween2point(tailslapent2.x, tailslapent2.y, entity2.x, entity2.y)
                    let firstpos2 = util.rotate(0, 0, 0 + normalspeed, 0, anglespeed2)


                    entity2.x += firstpos2.x
                    entity2.y += firstpos2.y
                    if (entity2.pos) {
                        entity2.pos.x += firstpos2.x
                        entity2.pos.y += firstpos2.y

                    }
                }
            } else if (dist === 2) {

                if (entity1.movable) {
                    let tailslapent1 = util.rotate(entity2.x, entity2.y, entity2.x - entity2.radius * 1, entity2.y, entity2.angle)

                    let anglespeed1 = util.anglebetween2point(tailslapent1.x, tailslapent1.y, entity1.x, entity1.y)
                    let firstpos1 = util.rotate(0, 0, 0 + normalspeed, 0, anglespeed1)

                    entity1.x += firstpos1.x
                    entity1.y += firstpos1.y
                    if (entity1.pos) {
                        entity1.pos.x += firstpos1.x
                        entity1.pos.y += firstpos1.y

                    }
                }
            }



        } else {
            if (reverse) {
                let power = dist / 10

                let reversspeed = 10
                if (power > reversspeed) {
                    power = reversspeed
                }

                let newposx2 = (entity1.x - entity2.x) / -dist * power
                let newposy2 = (entity1.y - entity2.y) / -dist * power
                let newposx1 = (entity2.x - entity1.x) / -dist * power
                let newposy1 = (entity2.y - entity1.y) / -dist * power
                if (entity2.movable) {

                    entity2.x -= newposx2
                    entity2.y -= newposy2
                    if (entity2.pos) {
                        entity2.pos.x -= newposx2
                        entity2.pos.y -= newposy2

                    }
                }
                if (entity1.movable) {

                    entity1.x -= newposx1
                    entity1.y -= newposy1
                    if (entity1.pos) {
                        entity1.pos.x -= newposx1
                        entity1.pos.y -= newposy1

                    }
                }

            } else {
                let newposx2 = (entity2.x - entity1.x) / dist * (overlap + (entity2.pos ? entity2.speed + entity2.veloX / 2 : 0) / 2);
                let newposy2 = (entity2.y - entity1.y) / dist * (overlap + (entity2.pos ? entity2.speed + entity2.veloY / 2 : 0) / 2);
                let newposx1 = (entity1.x - entity2.x) / dist * (overlap + (entity1.pos ? entity1.speed + entity1.veloX / 2 : 0) / 2);
                let newposy1 = (entity1.y - entity2.y) / dist * (overlap + (entity1.pos ? entity1.speed + entity1.veloY / 2 : 0) / 2);
                if (entity2.movable) {


                    entity2.x += newposx2
                    entity2.y += newposy2

                    if (entity2.pos) {
                        entity2.pos.x += newposx2
                        entity2.pos.y += newposy2

                    }
                }
                if (entity1.movable) {


                    entity1.x += newposx1
                    entity1.y += newposy1
                    if (entity1.pos) {

                        entity1.pos.x += newposx1
                        entity1.pos.y += newposy1

                    }
                }

            }
        }
        confirm = false
    }

}
collisiondynamic.prototype = {}
module.exports = collisiondynamic