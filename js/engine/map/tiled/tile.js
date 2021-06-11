class Tile {
    constructor(name, sprite) {
        this.name = name;
        this.sprite = sprite;
        this.canWalk = false;
    }

    draw(context, secondsPassed, x, y, map, i, j) {
        spriteMapper.getImage(this.sprite).drawImage(context, x*32, y*32);
    }

    getCanWalk() {
        return this.canWalk;
    }
}

class Path extends Tile {
    constructor() {
        super("path", "path");
        this.canWalk = true;
    }
}