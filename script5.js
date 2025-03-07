const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 600;

const startButton = document.getElementById("startButton");
const gameOverScreen = document.getElementById("gameOverScreen");
const restartButton = document.getElementById("restartButton");
const finalScoreElement = document.getElementById("finalScore");

let gameRunning = false;
let score = 0;

// Player Object
const player = {
    x: canvas.width / 2,
    y: canvas.height - 50,
    size: 30,
    speed: 5,
    icon: "👾",
    alive: true
};

// Bullets Array
const bullets = [];

// Enemies Array
const enemies = [];

// Controls
const keys = {};

document.addEventListener("keydown", (event) => {
    keys[event.key.toLowerCase()] = true; // Fix for uppercase/lowercase issues
});

document.addEventListener("keyup", (event) => {
    keys[event.key.toLowerCase()] = false;
});

// Shooting Mechanism
canvas.addEventListener("click", () => {
    if (gameRunning && player.alive) {
        bullets.push({ x: player.x + 10, y: player.y, width: 6, height: 10, speed: 7 });
    }
});

// Enemy Spawning
function spawnEnemies() {
    setInterval(() => {
        if (gameRunning) {
            enemies.push({
                x: Math.random() * (canvas.width - 30),
                y: 0,
                size: 30,
                speed: 2,
                icon: "💀"
            });
        }
    }, 1000);
}

// Game Loop
function update() {
    if (!gameRunning) return;

    // ✅ FIXED: Movement now updates every frame
    if (keys["a"] && player.x > 0) player.x -= player.speed;
    if (keys["d"] && player.x + player.size < canvas.width) player.x += player.speed;

    // Move Bullets
    bullets.forEach((bullet, index) => {
        bullet.y -= bullet.speed;
        if (bullet.y < 0) bullets.splice(index, 1);
    });

    // Move Enemies
    enemies.forEach((enemy, index) => {
        enemy.y += enemy.speed;

        // Check if an enemy hits the player
        if (
            player.alive &&
            enemy.x < player.x + player.size &&
            enemy.x + enemy.size > player.x &&
            enemy.y < player.y + player.size &&
            enemy.y + enemy.size > player.y
        ) {
            endGame();
        }

        if (enemy.y > canvas.height) enemies.splice(index, 1);
    });

    // Bullet Collision with Enemies
    bullets.forEach((bullet, bulletIndex) => {
        enemies.forEach((enemy, enemyIndex) => {
            if (
                bullet.x < enemy.x + enemy.size &&
                bullet.x + bullet.width > enemy.x &&
                bullet.y < enemy.y + enemy.size &&
                bullet.y + bullet.height > enemy.y
            ) {
                score += 10;
                enemies.splice(enemyIndex, 1);
                bullets.splice(bulletIndex, 1);
            }
        });
    });
}

// Draw Function
function draw() {
    if (!gameRunning) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw Player as an Icon
    ctx.font = "30px Arial";
    ctx.fillText(player.icon, player.x, player.y);

    // Draw Bullets
    ctx.fillStyle = "cyan";
    bullets.forEach((bullet) => ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height));

    // Draw Enemies as Skulls
    ctx.fillStyle = "red";
    enemies.forEach((enemy) => {
        ctx.fillText(enemy.icon, enemy.x, enemy.y);
    });

    // Draw Score
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText(`Score: ${score}`, 10, 30);
}

// Game Loop
function gameLoop() {
    update();
    draw();
    if (gameRunning) requestAnimationFrame(gameLoop);
}

// Start Game
startButton.addEventListener("click", () => {
    startButton.classList.add("hidden");
    canvas.classList.remove("hidden");
    gameRunning = true;
    score = 0;
    player.alive = true;
    enemies.length = 0;
    bullets.length = 0;
    spawnEnemies();
    gameLoop();
});

// End Game
function endGame() {
    player.alive = false;
    gameRunning = false;
    gameOverScreen.classList.remove("hidden");
    finalScoreElement.textContent = score;
}

// Restart Game
restartButton.addEventListener("click", () => {
    gameOverScreen.classList.add("hidden");
    startButton.click();
});