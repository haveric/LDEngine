class CanvasState {
    constructor(newWidth, newHeight) {
        this.width = newWidth || 800;
        this.height = newHeight || 576;

        this.canvas = document.getElementById("gameCanvas");
        this.context = this.canvas.getContext('2d');

        this.oldFillStyle = "none";

        this.init();
    }

    init() {
        this.canvas.setAttribute("width", this.width);
        this.canvas.setAttribute("height", this.height);
    }

    setFillStyle(newFillStyle) {
        if (newFillStyle !== this.oldFillStyle) {
            this.context.fillStyle = newFillStyle;
            this.oldFillStyle = newFillStyle;
        }
    }

    clear() {
        this.setFillStyle("#000000");
        this.context.fillRect(0, 0, this.width, this.height);
    }
}

