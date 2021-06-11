(function () {
    let player,
        controls = new Controls(),
        gameState = new GameState(),
        canvasState = new CanvasState();

    let map;

    let secondsPassed,
        oldTimeStamp,
        fps;

    const init = function(type) {
        canvasState.init();
        gameState.init(type);

        const mapSize = 20;

        map = new MapTiled(mapSize, mapSize);
        map.generate();
        const midPoint = Math.floor(mapSize/2);

        player = new PlayerTiled(midPoint, midPoint);


        gameLoop();
    }

    const gameLoop = function(timeStamp) {
        window.requestAnimationFrame(gameLoop);

        // Calculate the number of seconds passed since the last frame
        secondsPassed = (timeStamp - oldTimeStamp) / 1000;
        oldTimeStamp = timeStamp;

        // Move forward in time with a maximum amount
        secondsPassed = Math.min(secondsPassed, 0.1);


        // Calculate fps
        fps = Math.round(1 / secondsPassed);

        update(secondsPassed);
        render(secondsPassed);
    }

    const update = function(secondsPassed) {
        handleInput();
        handleMovement(secondsPassed);
    }

    const handleInput = function() {
        controls.checkForGamepads();

        if (controls.testPressed("up")) {
            player.moveUp(map);
        } else if (controls.testPressed("down")) {
            player.moveDown(map);
        }

        if (controls.testPressed("left")) {
            player.moveLeft(map);
        } else if (controls.testPressed("right")) {
            player.moveRight(map);
        }
    }

    const handleMovement = function(secondsPassed) {

    }

    const render = function(secondsPassed) {
        if (spriteMapper.preloadSprites()) {
            canvasState.clear();

            map.draw(canvasState.context, secondsPassed, player.getX(), player.getY());

            player.draw(canvasState.context, secondsPassed);

            // Draw number to the screen
            canvasState.font = '25px Arial';
            canvasState.setFillStyle('white');
            canvasState.context.fillText("FPS: " + fps, 10, 20);
        }
    }

    init("demo");
}());