const Rectangle = require("./rectangle")

function QuadTree(parent, range, maxNodes, maxLevel) {
    this.parent = parent;
    this.level = parent ? parent.level + 1 : 1;

    this.range = range;

    this.nodes = [];
    this.branches = [];

    this.maxNodes = maxNodes;
    this.maxLevel = maxLevel;
}

module.exports = QuadTree;

QuadTree.prototype.add = function (item, split) {
    if (!item) return false;
    if (split == null || split == undefined) split = true;

    if (item instanceof Array) {
        // handle arrays
        for (var i = 0; i < item.length; i++) this.add(item[i], split);
    } else {
        var itemplayer = item;
        let timescheck = 2
        if (itemplayer.class == "Food" || itemplayer.type == 3 || itemplayer.class == "Object Food Gen") {
            timescheck = 1
        }
        var range = new Rectangle(itemplayer.x, itemplayer.y, itemplayer.radius * timescheck, itemplayer.radius * timescheck);
        if (!item.isbiome) {
            if (item.pos) {
                range = new Rectangle(itemplayer.pos.x, itemplayer.pos.y, itemplayer.radius * timescheck, itemplayer.radius * timescheck);
            } else {
                range = new Rectangle(itemplayer.x, itemplayer.y, itemplayer.radius * timescheck, itemplayer.radius * timescheck);
            }
        } else {
            range = new Rectangle(itemplayer.x, itemplayer.y, itemplayer.width, itemplayer.height);
        }

        if (!this.range.intersects(range)) return false;
        if (item.__quad) return false;

        if (this.branches.length > 0) {
            if (this.branches[0].add(item)) return true;
            if (this.branches[1].add(item)) return true;
            if (this.branches[2].add(item)) return true;
            if (this.branches[3].add(item)) return true;

            console.log("[Error] Could not add node into quadtree! Node position: " + item.pos);
            return false;
        } else {
            this.nodes.push(item);
            item.__quad = this;
            if (split) this.split();
            return true;
        }
    }
};

QuadTree.prototype.remove = function (item, merge) {
    if (!item) return;
    if (merge == null || merge == undefined) merge = true;

    if (item instanceof Array) {
        // handle arrays
        for (var i = 0; i < item.length; i++) this.remove(item[i], merge);
    } else {
        if (!item.__quad) return;

        var index = item.__quad.nodes.indexOf(item);
        if (index != -1) item.__quad.nodes.splice(index, 1);

        if (merge) item.__quad.merge();
        item.__quad = null;
    }
};

QuadTree.prototype.update = function (item) {
    this.remove(item, false);
    this.add(item, false);
};

QuadTree.prototype.split = function () {
    if (this.branches.length > 0) return;

    if (this.nodes.length < this.maxNodes || this.level >= this.maxLevel - 1) return;

    var split = this.range.split();

    var _1 = new QuadTree(this, split[1], this.maxNodes, this.maxLevel),
        _2 = new QuadTree(this, split[2], this.maxNodes, this.maxLevel),
        _3 = new QuadTree(this, split[3], this.maxNodes, this.maxLevel),
        _4 = new QuadTree(this, split[4], this.maxNodes, this.maxLevel);

    for (var i = 0; i < this.nodes.length; i++) {
        var node = this.nodes[i];
        let timescheck = 2
        if (node.class == "Food" || node.type == 3) {
            timescheck = 1
        }
        var range = new Rectangle(node.x, node.y, node.radius * timescheck, node.radius * timescheck);
        if (!node.isbiome) {
            if (node.pos) {
                range = new Rectangle(node.pos.x, node.pos.y, node.radius * timescheck, node.radius * timescheck);
            } else {
                range = new Rectangle(node.x, node.y, node.radius * timescheck, node.radius * timescheck);
            }
        } else {
            range = new Rectangle(node.x, node.y, node.width, node.height);
        }

        if (split[1].intersects(range)) { _1.nodes.push(node); node.__quad = _1; continue; }
        if (split[2].intersects(range)) { _2.nodes.push(node); node.__quad = _2; continue; }
        if (split[3].intersects(range)) { _3.nodes.push(node); node.__quad = _3; continue; }
        if (split[4].intersects(range)) { _4.nodes.push(node); node.__quad = _4; continue; }
    }
    this.clear();
    this.branches = [_1, _2, _3, _4];
};

QuadTree.prototype.merge = function () {
    if (this.branches.length == 0) return;
    var items = this.getNodes();
    if (items.length >= this.maxNodes) return;

    this.clear();
    this.add(items, false);
};

QuadTree.prototype.getNodes = function () {
    if (this.branches.length > 0) {
        var a = [];
        a = a.concat(this.branches[0].getNodes());
        a = a.concat(this.branches[1].getNodes());
        a = a.concat(this.branches[2].getNodes());
        a = a.concat(this.branches[3].getNodes());
        return a;
    } else return this.nodes.slice(0);
};

QuadTree.prototype.getBranches = function () {
    if (this.branches.length > 0) {
        var a = 1;
        a += this.branches[1].getBranches();
        a += this.branches[1].getBranches();
        a += this.branches[1].getBranches();
        a += this.branches[1].getBranches();
        return a;
    } else return 1;
};

QuadTree.prototype.clear = function () {
    this.nodes = [];
    if (this.branches.length > 0) {
        for (var i = 0; i < this.branches.length; i++) this.branches[i].clear();
    }
    this.branches = [];
};

QuadTree.prototype.query = function (ownobj, range) {

    var items = [];

    if (this.branches.length > 0) {
        items = items.concat(this.branches[0].query(ownobj, range));
        items = items.concat(this.branches[1].query(ownobj, range));
        items = items.concat(this.branches[2].query(ownobj, range));
        items = items.concat(this.branches[3].query(ownobj, range));
    } else {
        for (var i = 0; i < this.nodes.length; i++) {

            var node = this.nodes[i];
            if (ownobj.id == node.id) continue;
            if ((node.type == 18 && ownobj.type == node.type)
                ||
                (node.type == 3 && ownobj.type == node.type)
                ||
                ((node.type == 18 || node.type == 14) && (ownobj.class == "Biome" || ownobj.type == 3))//don't care abilites.
            ) continue;
            if (!node) continue;
            if (!node.isloaded) continue;
            let timescheck = 2
            if (node.class == "Food" || node.type == 3) {
                timescheck = 1
            }
            var newerrange = new Rectangle(node.x, node.y, node.radius * timescheck, node.radius * timescheck);
            if (!node.isbiome) {
                if (node.pos) {
                    newerrange = new Rectangle(node.pos.x, node.pos.y, node.radius * timescheck, node.radius * timescheck);
                } else {
                    newerrange = new Rectangle(node.x, node.y, node.radius * timescheck, node.radius * timescheck);
                }
            } else {
                newerrange = new Rectangle(node.x, node.y, node.width, node.height);
            }
            if (range.intersects(newerrange)) {
                items.push(node);
            }
        }

    }

    return items;

};
