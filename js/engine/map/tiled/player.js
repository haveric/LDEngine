class PlayerTiled {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.direction = "up";
    }

    moveUp(map) {
        this.direction = "up";
        if (this.y > 0) {
            const tile = map.getTile(this.x, this.y - 1);
            if (tile == null) {

            } else if (tile.canWalk){
                this.y--;
            }
        } else {
            soundManager.play('blip');
        }
    }

    moveDown(map) {
        this.direction = "down";
        if (this.y < map.cols-1) {
            const tile = map.getTile(this.x, this.y+1);
            if (tile == null) {

            } else if (tile.canWalk){
                this.y++;
            }
        } else {
            soundManager.play('blip');
        }
    }

    moveLeft(map) {
        this.direction = "left";
        if (this.x >= 1) {
            const tile = map.getTile(this.x-1, this.y);
            if (tile == null) {

            } else if (tile.canWalk){
                this.x--;
            }
        } else {
            soundManager.play('blip');
        }
    }

    moveRight(map) {
        this.direction = "right";
        if (this.x < map.rows-1) {
            const tile = map.getTile(this.x+1, this.y);
            if (tile == null) {

            } else if (tile.canWalk){
                this.x++;
            }
        } else {
            soundManager.play('blip');
        }
    }

    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }

    draw(context, secondsPassed) {
        const sprite = "player";

        spriteMapper.getImage(sprite).drawImage(context, 384, 320);
    }
}

