// Mobile detection
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || 
                 ('ontouchstart' in window) || 
                 (navigator.maxTouchPoints > 0) || 
                 (navigator.msMaxTouchPoints > 0);

// Touch handling
let touchStartX = null;
let touchStartY = null;
let lastTouchTime = 0;
const TOUCH_COOLDOWN = 100; // ms between touch events

function handleTouchStart(evt) {
    const now = Date.now();
    if (now - lastTouchTime < TOUCH_COOLDOWN) return;
    lastTouchTime = now;
    
    evt.preventDefault();
    const touch = evt.touches[0];
    touchStartX = touch.clientX;
    touchStartY = touch.clientY;
}

function handleTouchMove(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    
    if (touchStartX === null || touchStartY === null || gameState !== "running") return;
    
    const touch = evt.touches[0];
    const deltaX = touch.clientX - touchStartX;
    const deltaY = touch.clientY - touchStartY;
    
    // Increased minimum swipe distance for better control
    const minSwipe = Math.max(CONFIG.touch.minSwipe, 50);
    
    if (Math.abs(deltaX) > minSwipe || Math.abs(deltaY) > minSwipe) {
        let newDir;
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            if (deltaX > 0 && snake.dir.x === 0) {
                newDir = createVector(CONFIG.cellSize, 0);
            } else if (deltaX < 0 && snake.dir.x === 0) {
                newDir = createVector(-CONFIG.cellSize, 0);
            }
        } else {
            if (deltaY > 0 && snake.dir.y === 0) {
                newDir = createVector(0, CONFIG.cellSize);
            } else if (deltaY < 0 && snake.dir.y === 0) {
                newDir = createVector(0, -CONFIG.cellSize);
            }
        }
        
        if (newDir) {
            snake.changeDirection(newDir);
        }
        
        touchStartX = null;
        touchStartY = null;
    }
}

function handleTouchEnd(evt) {
    evt.preventDefault();
    touchStartX = null;
    touchStartY = null;
}

// Theme management
function initTheme() {
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    document.body.classList.add(prefersDarkScheme.matches ? 'dark-mode' : 'light-mode');
    document.getElementById("toggle-mode-btn").innerHTML = prefersDarkScheme.matches ? CONFIG.icons.moon : CONFIG.icons.sun;
    
    prefersDarkScheme.addListener(e => {
        document.body.classList.remove('dark-mode', 'light-mode');
        document.body.classList.add(e.matches ? 'dark-mode' : 'light-mode');
        document.getElementById("toggle-mode-btn").innerHTML = e.matches ? CONFIG.icons.moon : CONFIG.icons.sun;
    });
}

// UI Event Listeners
function initUI() {
    // Show/hide mobile rules
    document.querySelector('.mobile-rules').style.display = isMobile ? 'block' : 'none';
    document.querySelector('.desktop-rules').style.display = isMobile ? 'none' : 'block';
    
    // Prevent mobile browser navigation in game container
    if (isMobile) {
        const gameContainer = document.getElementById('game-container');
        gameContainer.addEventListener('touchmove', e => { e.preventDefault(); e.stopPropagation(); }, { passive: false });
        gameContainer.addEventListener('touchstart', e => { e.preventDefault(); e.stopPropagation(); }, { passive: false });
    }
    
    // Game controls
    document.getElementById("start-btn").addEventListener("click", function() {
        initGame();
        gameState = "running";
        this.innerText = "Restart";
    });
    
    document.getElementById("pause-btn").addEventListener("click", function() {
        if (gameState === "running") {
            gameState = "paused";
            this.innerText = "Unpause";
        } else if (gameState === "paused") {
            gameState = "running";
            this.innerText = "Pause";
        }
    });
    
    // Theme toggle
    document.getElementById("toggle-mode-btn").addEventListener("click", function() {
        if (document.body.classList.contains("dark-mode")) {
            document.body.classList.remove("dark-mode");
            document.body.classList.add("light-mode");
            this.innerHTML = CONFIG.icons.sun;
        } else {
            document.body.classList.remove("light-mode");
            document.body.classList.add("dark-mode");
            this.innerHTML = CONFIG.icons.moon;
        }
    });
    
    // Prevent arrow key scrolling
    window.addEventListener("keydown", e => {
        if ([37,38,39,40].includes(e.keyCode)) { e.preventDefault(); }
    });
} 