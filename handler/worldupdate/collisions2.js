const utils1 = require("../../modules/IMPmodules/util")
const util = new utils1()
function collisions2(entities, i, j) {
    entity_1 = entities[i]
    entity_2 = entities[j]
    if (entity_1 && entity_2) {
        if (entity_1.type != 2 && entity_1.isloaded && entity_1.class != "Biome") {
            if (entity_2.type == 40) {
                if (!entity_1.isbiome) {
                    if (entity_1.isloaded) {
                        if (entity_1.y + entity_1.radius > entity_2.y - entity_2.height / 2 &&
                            entity_2.x - entity_2.width / 2 < entity_1.x + entity_1.radius &&
                            entity_1.y - entity_1.radius < entity_2.y + entity_2.height / 2 &&
                            entity_2.x + entity_2.width / 2 > entity_1.x - entity_1.radius) {
                            if (entity_1.biome != 1) {
                                if (entity_1.type != 3) {
                                    entity_1.biome = 1
                                }
                            }

                            if (entity_1.movable) {
                                if (entity_2.specType == 0) {
                                    if (!entity_1.isflying) {
                                        if (entity_1.whichbiome != 5 && entity_1.whichbiome != 6) {
                                            entity_1.x -= 1.5
                                        }
                                    }

                                } else {

                                    if (!entity_1.isflying) {
                                        if (entity_1.whichbiome != 5 && entity_1.whichbiome != 6) {
                                            entity_1.x += 1.5
                                        }
                                    }
                                }
                            }

                        }
                    }
                }
            }
            if (entity_1.biome != 1) {


                if (entity_2.type == 12) {
                    if (entity_1.y > entity_2.y - entity_2.height / 2 &&
                        entity_2.x - entity_2.width / 2 < entity_1.x &&
                        entity_1.y < entity_2.y + entity_2.height / 2 &&
                        entity_2.x + entity_2.width / 2 > entity_1.x) {
                        entity_1.biome = 1

                    }
                }
                if (entity_1.type != 3) {
                    if (entity_2.type == 4 || entity_2.type == 10 || entity_2.type == 34) {
                        if (entity_1.type != 10) {
                            let distance = util.getDistance2D(entity_1.x, entity_1.y, entity_2.x, entity_2.y)
                            if (distance <= entity_2.radius) {

                                entity_1.biome = 1
                            }
                        }
                    }
                }


            }
            if (entity_1.biome != 0) {
                if (entity_2.type == 1) {
                    if (entity_1.y > entity_2.y - entity_2.height / 2 &&
                        entity_2.x - entity_2.width / 2 < entity_1.x &&
                        entity_1.y < entity_2.y + entity_2.height / 2 &&
                        entity_2.x + entity_2.width / 2 > entity_1.x) {
                        entity_1.biome = 0
                    }
                }
            }

            if (entity_1.biome != 2) {
                if (entity_2.type == 16) {
                    if (entity_1.y > entity_2.y - entity_2.height / 2 &&
                        entity_2.x - entity_2.width / 2 < entity_1.x &&
                        entity_1.y < entity_2.y + entity_2.height / 2 &&
                        entity_2.x + entity_2.width / 2 > entity_1.x) {
                        entity_1.biome = 2

                    }
                }

            }

        }
    }
}

collisions2.prototype = {}
module.exports = collisions2