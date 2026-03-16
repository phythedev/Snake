class Snake {
    constructor() {
        let startX = floor(CONFIG.cellCount / 2) * CONFIG.cellSize;
        let startY = floor(CONFIG.cellCount / 2) * CONFIG.cellSize;
        this.body = [createVector(startX, startY)];
        this.dir = createVector(CONFIG.cellSize, 0);
        this.growth = 0;
    }

    move() {
        const head = p5.Vector.add(this.body[0], this.dir);
        
        // Check for wall collision
        if (head.x < 0 || head.x >= CONFIG.canvasSize || 
            head.y < 0 || head.y >= CONFIG.canvasSize) {
            return false;
        }

        // Check for self collision
        for (let seg of this.body) {
            if (seg.equals(head)) {
                return false;
            }
        }

        this.body.unshift(head);
        
        // Handle food collision
        if (head.x === food.x && head.y === food.y) {
            if (food.type === "apple") {
                score += CONFIG.foodTypes.apple.points;
                this.growth = 0;
            } else {
                score += CONFIG.foodTypes.goldenApple.points;
                this.growth = 2;
            }
            updateScore();
            food = Food.create(this);
        } else if (this.growth > 0) {
            this.growth--;
        } else {
            this.body.pop();
        }

        return true;
    }

    show() {
        if (this.body.length === 1) {
            noStroke();
            let sColor = document.body.classList.contains("dark-mode") ? "#ccc" : "#444";
            fill(sColor);
            ellipse(this.body[0].x + CONFIG.cellSize/2, 
                   this.body[0].y + CONFIG.cellSize/2, 
                   CONFIG.snakeSize, 
                   CONFIG.snakeSize);
        } else {
            let sColor = document.body.classList.contains("dark-mode") ? "#ccc" : "#444";
            stroke(sColor);
            strokeWeight(CONFIG.snakeSize - 2);
            strokeCap(ROUND);
            strokeJoin(ROUND);
            noFill();
            beginShape();
            for (let seg of this.body) {
                vertex(seg.x + CONFIG.cellSize/2, seg.y + CONFIG.cellSize/2);
            }
            endShape();
        }
    }

    changeDirection(newDir) {
        // Prevent 180-degree turns
        if (this.dir.x !== -newDir.x || this.dir.y !== -newDir.y) {
            this.dir = newDir;
        }
    }
} 