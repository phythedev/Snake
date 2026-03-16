// Game state
let gameState = "stopped";
let snake;
let score = 0;
let lastScore = 0;
let highScore = 0;

function setup() {
    const canvas = createCanvas(CONFIG.canvasSize, CONFIG.canvasSize);
    canvas.parent("game-container");
    pixelDensity(1);
    noSmooth();
    frameRate(isMobile ? CONFIG.frameRate.mobile : CONFIG.frameRate.desktop);
    canvas.style('margin', '0');
    canvas.style('position', 'absolute');
    canvas.style('left', '50%');
    canvas.style('top', '50%');
    canvas.style('transform', 'translate(-50%, -50%)');
    
    initGame();
    
    if (isMobile) {
        const canvasEl = document.querySelector("#game-container canvas");
        canvasEl.addEventListener('touchstart', handleTouchStart, { passive: false });
        canvasEl.addEventListener('touchmove', handleTouchMove, { passive: false });
        canvasEl.addEventListener('touchend', handleTouchEnd, { passive: false });
        
        // Prevent scrolling on mobile
        document.body.addEventListener('touchmove', e => {
            if (gameState === "running") {
                e.preventDefault();
            }
        }, { passive: false });
    }
}

function draw() {
    // Set background based on theme
    if (document.body.classList.contains("light-mode")) {
        background(245);
    } else {
        background(24, 26, 27);
    }
    
    // Draw grid
    drawGrid();
    
    // Update and draw game elements
    if (gameState === "running") {
        if (!snake.move()) {
            gameOver();
        }
    }
    
    snake.show();
    if (food) food.show();
    
    // Update score display
    document.getElementById("score").innerText = score;
    
    // Draw game over screen
    if (gameState === "gameover") {
        drawGameOver();
    }
}

function drawGrid() {
    push();
    noStroke();
    let col1, col2;
    if (document.body.classList.contains("light-mode")) {
        col1 = 'rgba(200,200,200,0.4)';
        col2 = 'rgba(220,220,220,0.4)';
    } else {
        col1 = 'rgba(80,80,80,0.4)';
        col2 = 'rgba(60,60,60,0.4)';
    }
    
    for (let i = 0; i < CONFIG.cellCount; i++) {
        for (let j = 0; j < CONFIG.cellCount; j++) {
            fill((i+j) % 2 === 0 ? col1 : col2);
            rect(i * CONFIG.cellSize, j * CONFIG.cellSize, 
                 CONFIG.cellSize, CONFIG.cellSize);
        }
    }
    pop();
}

function drawGameOver() {
    push();
    if (document.body.classList.contains("dark-mode")) {
        fill(255,255,255,150);
        var textFill = 0;
    } else {
        fill(0,0,0,150);
        var textFill = 255;
    }
    rect(0, 0, width, height);
    textAlign(CENTER, CENTER);
    textSize(48);
    fill(textFill);
    text("GAME OVER", width/2, height/2);
    pop();
}

function initGame() {
    snake = new Snake();
    food = Food.create(snake);
    score = 0;
    updateScore();
    gameState = "stopped";
    document.getElementById("start-btn").innerText = "Start";
    document.getElementById("pause-btn").innerText = "Pause";
}

function gameOver() {
    gameState = "gameover";
    lastScore = score;
    document.getElementById("last-score").innerText = lastScore;
    if (score > highScore) {
        highScore = score;
        document.getElementById("highest-score").innerText = highScore;
    }
    document.getElementById("start-btn").innerText = "Start";
}

function updateScore() {
    document.getElementById("score").innerText = score;
}

function keyPressed() {
    if (gameState !== "running") return;
    
    let newDir;
    if ((keyCode === UP_ARROW || key === 'w' || key === 'W') && snake.dir.y === 0) {
        newDir = createVector(0, -CONFIG.cellSize);
    } else if ((keyCode === DOWN_ARROW || key === 's' || key === 'S') && snake.dir.y === 0) {
        newDir = createVector(0, CONFIG.cellSize);
    } else if ((keyCode === LEFT_ARROW || key === 'a' || key === 'A') && snake.dir.x === 0) {
        newDir = createVector(-CONFIG.cellSize, 0);
    } else if ((keyCode === RIGHT_ARROW || key === 'd' || key === 'D') && snake.dir.x === 0) {
        newDir = createVector(CONFIG.cellSize, 0);
    }
    
    if (newDir) {
        snake.changeDirection(newDir);
    }
} 