class Food {
    constructor(x, y, type) {
        this.x = x;
        this.y = y;
        this.type = type;
    }

    static create(snake) {
        let fx, fy, valid;
        do {
            let cx = floor(random(CONFIG.cellCount));
            let cy = floor(random(CONFIG.cellCount));
            fx = cx * CONFIG.cellSize;
            fy = cy * CONFIG.cellSize;
            valid = true;
            if (snake) {
                for (let seg of snake.body) {
                    if (seg.x === fx && seg.y === fy) {
                        valid = false;
                        break;
                    }
                }
            }
        } while (!valid);

        let rand = random();
        let type = (rand < CONFIG.foodTypes.apple.probability) ? "apple" : "goldenApple";
        return new Food(fx, fy, type);
    }

    show() {
        fill(this.type === "apple" ? CONFIG.foodTypes.apple.color : CONFIG.foodTypes.goldenApple.color);
        noStroke();
        ellipse(this.x + CONFIG.cellSize/2, 
                this.y + CONFIG.cellSize/2, 
                CONFIG.snakeSize, 
                CONFIG.snakeSize);
    }
}

// Global food variable
let food; 