function customworldupdobjects() {

}
module.exports = customworldupdobjects
customworldupdobjects.prototype = {
    encode_utf8: function (s) {
        return unescape(encodeURIComponent(s));
    },



    decode_utf8: function (s) {
        return decodeURIComponent(escape(s));
    },

    oncreate: function (ent, buf) {

        if (ent.type == 18 || ent.type == 85 || ent.type == 83 || ent.type == 40 || ent.type == 56 || ent.type == 52 || ent.type == 53 || ent.type == 54 || ent.type == 72 || ent.type == 9 || ent.type == 57) {
            buf.writeUInt8(ent.specType); //spectype 1

        }
        if (ent.type == 14) {
            buf.writeUInt8(ent.specType); //spectype 1


            buf.writeUInt8(ent.specType2); //spectype 2

            if (ent.secondaryType == 68) {
                buf.writeUInt32(ent.p1.id);

                buf.writeUInt32(ent.p2.id);

                buf.writeString(ent.p1.name)
                buf.writeString(ent.p2.name)

                buf.writeUInt8(0);//spectype 1


                buf.writeUInt8(0);//spectype 2


                buf.writeUInt8(ent.state);//spectype 2


                buf.writeUInt16(ent.radius * 100);


            }

        }
        if (ent.type == 2) {

            buf.writeString(ent.name)

            buf.writeUInt8(ent.species); //species - rarity

            buf.writeUInt8(ent.colorname); //entity secondary type


            switch (ent.secondaryType) {
                case 79:
                case 46:
                    c = ent.bar.barpercentage / ent.bar.maxbarpercentage;
                    d = c * 100;



                    if (d < 0) {
                        d = 0
                    }

                    buf.writeUInt8(d);

                    if (ent.secondaryType == 79) {
                        buf.writeUInt8(ent.canUseTailslap);

                        buf.writeInt16(ent.tailState * 100);

                    }
                    break
                case 32:

                    buf.writeUInt8(ent.transforming);


                    break
                case 76:

                    buf.writeUInt8(ent.transparancy);

                    break
                case 78:

                    buf.writeUInt8(ent.poison);


                    break
                case 77:

                    buf.writeUInt8(ent.isgliding);


                    break
                case 72:

                    buf.writeUInt8(ent.crystals.length);

                    for (var E = 0; E < ent.crystals.length; E++) {
                        buf.writeInt16(ent.crystals[E].x * 100);

                        buf.writeInt16(ent.crystals[E].y * 100);

                        buf.writeUInt16(ent.crystals[E].rad * 100);

                        buf.writeUInt16(ent.crystals[E].angle * 100);


                    }

                    break;
            }
        }

    },
    onupdate: function (obj, buf) {

        switch (obj.type) {
            case 57:
                buf.writeUInt8(obj.specType);//spectype 1
                break;
            case 14:
                buf.writeUInt8(obj.specType);//spectype 1


                buf.writeUInt8(obj.specType2);//spectype 2


                buf.writeUInt8(obj.is1v1);//spectype 2

                if (obj.is1v1) {
                    buf.writeUInt16(obj.timer); //spectype 2

                }
                switch (obj.secondaryType) {
                    case 68:
                        if (obj.timer > 654) {
                            obj.timer = 0
                        }
                        buf.writeUInt8(obj.state);//spectype 1

                        buf.writeUInt16(obj.num); //spectype 1


                        buf.writeUInt16(obj.insradius * 100); //spectype 1

                        buf.writeUInt16(obj.p1bites); //spectype 1

                        buf.writeUInt16(obj.p2bites); //spectype 1


                        switch (obj.state) {
                            case 0:
                                buf.writeUInt16(obj.timer * 100); //spectype 1

                                break
                            case 1:
                                buf.writeUInt16(obj.timer * 100); //spectype 1

                                break
                            case 2:

                                buf.writeUInt8(obj.winner);//spectype 1

                                buf.writeUInt32(20000); //spectype 1

                                var winmsg = "Great Job "
                                buf.writeString(winmsg)
                        }
                        break
                    case 81:

                        buf.writeUInt32(obj.victimID); //spectype 1
                        buf.writeUInt8(obj.flying);//spectype 1

                        break
                }




                break;
            case 2:
                buf.writeUInt8(obj.specType);//spectype 1
                buf.writeUInt8(obj.specType2);//spectype 2
                if (obj.angle <= 0) {
                    obj.angle += 360;
                }
                if (obj.angle >= 360) {
                    obj.angle -= 360;
                }

                buf.writeUInt8(obj.angle / 2);//look angle  - original /6



                buf.writeUInt8(obj.flags.length);//flags, bleeding , biome-...... on fire...


                for (var Je = 0; Je < obj.flags.length; Je++) {
                    buf.writeUInt8(obj.flags[Je]);//flags, bleeding , biome-...... on fire...
                }

                buf.writeUInt8(obj.wins);//flags, bleeding , biome-...... on fire...
                switch (obj.secondaryType) {
                    case 79:
                    case 46:

                        c = obj.bar.barpercentage / obj.bar.maxbarpercentage;
                        d = c * 100;



                        if (d < 0) {
                            d = 0
                        }

                        buf.writeUInt8(d);

                        if (obj.secondaryType == 79) {
                            buf.writeUInt8(obj.canUseTailslap);

                            buf.writeInt16(obj.tailState * 100);
                        }

                        break;
                    case 32:

                        buf.writeUInt8(obj.transforming);


                        break;
                    case 76:

                        buf.writeUInt8(obj.transparancy);


                        break;
                    case 78:

                        buf.writeUInt8(obj.poison);


                        break;
                    case 77:

                        buf.writeUInt8(obj.isgliding);


                        break;
                    case 80:

                        buf.writeUInt8(obj.spearInHand);
                        buf.writeUInt8(obj.canCreateFire);
                        break
                    case 72:

                        buf.writeUInt8(obj.crystals.length);

                        for (var E = 0; E < obj.crystals.length; E++) {
                            buf.writeInt16(obj.crystals[E].x * 100);

                            buf.writeInt16(obj.crystals[E].y * 100);

                            buf.writeUInt16(obj.crystals[E].rad * 100);

                            buf.writeUInt16(obj.crystals[E].angle * 100);


                        }

                        break
                }
        }





    },
}