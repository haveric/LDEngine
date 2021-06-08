(function () {
    let player,
        controls = new Controls(),
        gameState = new GameState(),
        canvasState = new CanvasState(),
        numRenders = 0,
        FPS = 60;

    let map;

    const init = function(type) {
        canvasState.init();
        gameState.init(type);

        const mapSize = 20;

        map = new MapTiled(mapSize, mapSize);
        map.generate();
        const midPoint = Math.floor(mapSize/2);

        player = new PlayerTiled(midPoint, midPoint);


        MainLoop.setUpdate(handleUpdate).setDraw(render).setEnd().start();
    }

    const handleUpdate = function(delta) {
        handleInput();
        handleMovement(delta);
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

    const handleMovement = function(delta) {
        // TODO: Move stuff

    }

    const render = function() {
        if (spriteMapper.preloadSprites()) {

            // TODO: Draw Stuff
            canvasState.clear();

            map.draw(canvasState.context, numRenders, player.getX(), player.getY());

            player.draw(canvasState.context, numRenders);

            numRenders++;
            if (numRenders === FPS) {
                numRenders = 0;
            }
        }
    }

    init("demo");
}());