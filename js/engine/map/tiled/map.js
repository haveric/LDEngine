const MapTiled = function(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    
    this.tiles = ArrayUtil.create2dArray(rows);
    this.endX;
    this.endY;
}

MapTiled.prototype.getTiles = function() {
    return this.tiles;
}

MapTiled.prototype.getTile = function(x,y) {
    return this.tiles[x][y];
}
MapTiled.prototype.generate = function() {
    for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.cols; j++) {
            this.tiles[i][j] = new Path();
        }
    }
}

MapTiled.prototype.draw = function(context, frame, x, y) {
    const initialLeft = x - 12;
    const initialTop = y - 10;
    let left = initialLeft;
    let right = x + 13;
    let top = initialTop;
    let bot = y + 10;

    if (left < 0) {
        left = 0;
    }

    if (right >= this.rows) {
        right = this.rows;
    }

    if (top < 0) {
        top = 0;
    }

    if (bot >= this.cols) {
        bot = this.cols;
    }

    for (let i = left; i < right; i++) {
        for (let j = top; j < bot; j++) {
            const tile = this.tiles[i][j];
            tile.draw(context, frame, i-initialLeft, j-initialTop, this, i, j);
        }
    }
}