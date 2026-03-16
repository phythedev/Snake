// Game Configuration
const CONFIG = {
    // Canvas settings
    canvasSize: 600,
    cellCount: 15,
    cellSize: 600 / 15, // canvasSize / cellCount
    snakeSize: (600 / 15) - 4, // cellSize - 4

    // Game settings
    frameRate: {
        mobile: 8,
        desktop: 10
    },

    // Food settings
    foodTypes: {
        apple: {
            color: "#A94442",
            points: 10,
            probability: 0.98
        },
        goldenApple: {
            color: "#BFA06B",
            points: 30,
            probability: 0.02
        }
    },

    // Theme icons
    icons: {
        sun: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>',
        moon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"></path></svg>'
    },

    // Touch settings
    touch: {
        minSwipe: 40,
        cooldown: 100
    }
}; 