// Keyboard
const Key = {
    BACKSPACE: "8",
    TAB: "9",
    ENTER: "13",
    SHIFT: "16", // BOTH
    CONTROL: "17", // BOTH
    ALT: "18", // BOTH
    PAUSE_BREAK: "19",
    CAPS_LOCK: "20",
    ESCAPE: "27",
    SPACE: "32",
    PAGE_UP: "33",
    PAGE_DOWN: "34",
    END: "35",
    HOME: "36",
    LEFT: "37",
    UP: "38",
    RIGHT: "39",
    DOWN: "40",
    INSERT: "45",
    DELETE: "46",
    ZERO: "48",
    ONE: "49",
    TWO: "50",
    THREE: "51",
    FOUR: "52",
    FIVE: "53",
    SIX: "54",
    SEVEN: "55",
    EIGHT: "56",
    NINE: "57",
    SEMICOLON: "59",
    EQUALS: "61",
    A: "65",
    B: "66",
    C: "67",
    D: "68",
    E: "69",
    F: "70",
    G: "71",
    H: "72",
    I: "73",
    J: "74",
    K: "75",
    L: "76",
    M: "77",
    N: "78",
    O: "79",
    P: "80",
    Q: "81",
    R: "82",
    S: "83",
    T: "84",
    U: "85",
    V: "86",
    W: "87",
    X: "88",
    Y: "89",
    Z: "90",
    LEFT_WINDOW: "91",
    RIGHT_WINDOW: "92",
    SELECT: "93",
    NUMPAD0: "96",
    NUMPAD1: "97",
    NUMPAD2: "98",
    NUMPAD3: "99",
    NUMPAD4: "100",
    NUMPAD5: "101",
    NUMPAD6: "102",
    NUMPAD7: "103",
    NUMPAD8: "104",
    NUMPAD9: "105",
    NUMPAD_MULTIPLY: "106",
    NUMPAD_ADD: "107",
    NUMPAD_SUBTRACT: "109",
    NUMPAD_PERIOD: "110",
    NUMPAD_DIVIDE: "111",
    F1: "112",
    F2: "113",
    F3: "114",
    F4: "115",
    F5: "116",
    F6: "117",
    F7: "118",
    F8: "119",
    F9: "120",
    F10: "121",
    F11: "122",
    F12: "123",
    NUM_LOCK: "144",
    SCROLL_LOCK: "145",
    MINUS: "173",
    COMMA: "188",
    PERIOD: "190",
    FORWARD_SLASH: "191",
    GRAVE: "192",
    BRACKETS_LEFT: "219",
    BACK_SLASH: "220",
    BRACKETS_RIGHT: "221",
    QUOTE: "222"
}

// Controllers (Tested with XBOX 360)
const Btn = {
    A: "gamepad0",
    B: "gamepad1",
    X: "gamepad2",
    Y: "gamepad3",
    LB: "gamepad4",
    RB: "gamepad5",
    LT: "gamepad6",
    RT: "gamepad7",
    BACK: "gamepad8",
    START: "gamepad9",
    LEFT_STICK_CLICK: "gamepad10",
    RIGHT_STICK_CLICK: "gamepad11",
    UP: "gamepad12",
    DOWN: "gamepad13",
    LEFT: "gamepad14",
    RIGHT: "gamepad15",
    LEFT_STICK_LEFT: "axis0-left",
    LEFT_STICK_RIGHT: "axis0-right",
    LEFT_STICK_UP: "axis1-left",
    LEFT_STICK_DOWN: "axis1-right",
    RIGHT_STICK_LEFT: "axis2-left",
    RIGHT_STICK_RIGHT: "axis2-right",
    RIGHT_STICK_UP: "axis3-left",
    RIGHT_STICK_DOWN: "axis3-right"
}


const Controls = function() {
    const self = this;

    self.defaultDelay = 100;
    self.keysDown = [];
    self.keysDelayed = [];
    self.defaults = new Map();

    self.controls = new Map();
    self.defaults.set("left", [Key.LEFT, Key.A, Btn.LEFT, Btn.LEFT_STICK_LEFT]);
    self.defaults.set("right", [Key.RIGHT, Key.D, Btn.RIGHT, Btn.LEFT_STICK_RIGHT]);
    self.defaults.set("up", [Key.UP, Key.W, Btn.UP, Btn.LEFT_STICK_UP]);
    self.defaults.set("down", [Key.DOWN, Key.S, Btn.DOWN, Btn.LEFT_STICK_DOWN]);
    self.defaults.set("action", [Key.SPACE, Key.ENTER, Btn.A]);

    self.defaults.set("reset", [Key.R, Btn.START]);

    self.resetToDefault();

    self.keyDownListener = addEventListener("keydown", function (e) {
        //console.log("Keydown: " + e.keyCode + ", Location: " + e.location);
        self.keysDown[e.keyCode] = true;
    }, false);

    self.keyUpListener = addEventListener("keyup", function (e) {
        //console.log("Keyup: " + e.keyCode + ", Location: " + e.location);
        delete self.keysDown[e.keyCode];
        delete self.keysDelayed[e.keyCode];
    }, false);
}

Controls.prototype.resetToDefault = function() {
    const self = this;

    self.defaults.forEach(function(value, key) {
        self.controls.set(key, value);
    });
}

Controls.prototype.setCustomKeys = function(name, keys) {
    this.controls.set(name, keys);
}

Controls.prototype.isPressed = function(key) {
    const self = this;
    let pressed = false;

    self.controls.get(key).forEach(function(keyToTest) {
        if (keyToTest in self.keysDown) {
            pressed = true;
        }
    });

    return pressed;
}

Controls.prototype.isDelayed = function(key) {
    const self = this;
    let delayed = false;

    this.controls.get(key).forEach(function(keyToTest) {
        if (keyToTest in self.keysDelayed) {
            delayed = true;
        }
    });

    return delayed;
}

Controls.prototype.deleteKey = function(key, delay) {
    const self = this;
    self.controls.get(key).forEach(function(keyToTest) {
        delete self.keysDown[keyToTest];
        if (delay) {
            self.keysDelayed[keyToTest] = true;
        }
    });

    if (delay) {
        setTimeout(function() {
            self.controls.get(key).forEach(function(keyToTest) {
                delete self.keysDelayed[keyToTest];
            });
        }, delay);
    }
}

/**
 *  Returns true if press succeeds
 *          false if press does not succeed
 */
Controls.prototype.testPressed = function(key, delay) {
    delay = delay || this.defaultDelay;

    const self = this;
    let succeeded = false;

    if (self.isPressed(key) && !self.isDelayed(key)) {
        self.deleteKey(key, delay);
        succeeded = true;
    }

    return succeeded;
}

Controls.prototype.hasControllerSupport = function() {
    return "getGamepads" in navigator;
}

Controls.prototype.checkForGamepads = function() {
    const self = this;
    if (this.hasControllerSupport()) {
        const numGamepads = navigator.getGamepads().length;
        for (let i = 0; i < numGamepads; i++) {
            const gamepad = navigator.getGamepads()[i];
            if (gamepad) {
                gamepad.axes.forEach(function(axis, axisIndex) {
                    if (axis <= -0.5) {
                        //console.log("axis" + axisIndex + "-left");
                        self.keysDown["axis" + axisIndex + "-left"] = true;
                    } else if (axis >= 0.5) {
                        //console.log("axis" + axisIndex + "-right");
                        self.keysDown["axis" + axisIndex + "-right"] = true;
                    } else {
                        delete self.keysDown["axis" + axisIndex + "-left"];
                        delete self.keysDown["axis" + axisIndex + "-right"];
                        delete self.keysDelayed["axis" + axisIndex + "-left"];
                        delete self.keysDelayed["axis" + axisIndex + "-right"];
                    }
                });

                gamepad.buttons.forEach(function(button, buttonIndex) {
                    if (button.pressed) {
                        //console.log("gamepad" + buttonIndex);
                        self.keysDown["gamepad"+ buttonIndex] = true;
                    } else {
                        delete self.keysDown["gamepad" + buttonIndex];
                        delete self.keysDelayed["gamepad" + buttonIndex];
                    }
                });
            }
        }
    }
}

window.addEventListener("gamepadconnected", function(e) {
    const gamepad = navigator.getGamepads()[e.gamepad.index];
    console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.", gamepad.index, gamepad.id, gamepad.buttons.length, gamepad.axes.length);
    console.log(gamepad.buttons);
});

window.addEventListener("gamepaddisconnected", function(e) {
    /*
    var gamepad = navigator.getGamepads()[e.gamepad.index];
    console.log("Gamepad disconnected at index %d: %s. %d buttons, %d axes.", gamepad.index, gamepad.id, gamepad.buttons.length, gamepad.axes.length);
    */
});