class TextureMapper {
    constructor() {
        this.textures = [];
    }

    addTexture(name, src) {
        const self = this;
        const image = new Image();

        image.onload = function () {
            self.textures.push(new Texture(name, image));
        };
        image.src = src;
    }

    getTexture(textureName) {
        const length = this.textures.length;
        for (let i = 0; i < length; i++) {
            if (this.textures[i].name === textureName) {
                return this.textures[i].image;
            }
        }
        return null;
    }
}


class Texture {
    constructor(name, image) {
        this.name = name;
        this.image = image;
    }
}


class SpriteMapper {
    constructor() {
        this.sprites = [];
        this.spritesPreloaded = false;
    }

    addImage(imageName, textureName, x, y, w, h) {
        this.sprites.push(new Sprite(imageName, textureName, x, y, w, h));
    }

    getImage(imgName) {
        const length = this.sprites.length;
        for (let i = 0; i < length; i++) {
            if (this.sprites[i].imageName === imgName) {
                return this.sprites[i];
            }
        }
        return null;
    }

    preloadSprites() {
        if (!this.spritesPreloaded) {
            const numSprites = this.sprites.length;
            let numLoaded = 0;

            this.sprites.forEach(function(sprite) {
                if (sprite.loadTexture()) {
                    numLoaded ++;
                }
            });

            if (numLoaded === numSprites) {
                this.spritesPreloaded = true;
            }
        }

        return this.spritesPreloaded;
    }
}


class Sprite {
    constructor(imageName, textureName, x, y, w, h) {
        this.imageName = imageName;
        this.textureName = textureName;
        this.texture = textureMapper.getTexture(textureName);
        this.x = x;
        this.y = y;
        this.w = w || 32;
        this.h = h || 32;
    }

    loadTexture() {
        if (this.texture == null) {
            this.texture = textureMapper.getTexture(this.textureName);
        }

        return this.texture != null;
    }

    drawImage(context, i, j, degrees) {
        if (degrees != null && degrees > 0) {
            context.save();
            context.translate(i+this.w/2, j+this.h/2);
            context.rotate(degrees * Math.PI / 180);

            context.drawImage(this.texture, this.x, this.y, this.w, this.h, -this.w/2, -this.h/2, this.w, this.h);

            context.restore();
        } else {
            context.drawImage(this.texture, this.x, this.y, this.w, this.h, i, j, this.w, this.h);
        }
    }
}

const textureMapper = new TextureMapper();
textureMapper.addTexture('sprites', 'img/placeholder.gif');
textureMapper.addTexture('player', 'img/player.gif');

const spriteMapper = new SpriteMapper();
spriteMapper.addImage('path', 'sprites', 0, 0);
spriteMapper.addImage('player', 'player', 0, 0);