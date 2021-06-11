class GameState {
    constructor() {
        this.currentGameType = "none";
        this.hasEnded = false;
    }

    init(gameType) {
        this.currentGameType = gameType;
        this.hasEnded = false;
    }

    endGame(callback) {
        if (!this.hasEnded) {
            this.hasEnded = true;

            if (callback) {
                callback();
            }
        }
    }
}
