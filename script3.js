const canvas = document.getElementById('gameBoard');
const ctx = canvas.getContext('2d');
const playButton = document.getElementById('playButton');
const gameOverScreen = document.getElementById('gameOverScreen');
const restartButton = document.getElementById('restartButton');
const finalScore = document.getElementById('finalScore');
const scoreDisplay = document.getElementById('score');

const gridSize = 20; // Increased grid size for better visibility
let snake = [{ x: 100, y: 100 }];
let food = generateFood();
let dx = gridSize;
let dy = 0;
let score = 0;
let gameRunning = false;
let gameSpeed = 150; // Slowed down game speed

document.addEventListener('keydown', changeDirection);
playButton.addEventListener('click', startGame);
restartButton.addEventListener('click', startGame);

function startGame() {
    gameOverScreen.style.display = 'none';
    playButton.style.display = 'none';
    scoreDisplay.textContent = 'Score: 0';
    snake = [{ x: 100, y: 100 }];
    dx = gridSize;
    dy = 0;
    score = 0;
    food = generateFood();
    gameRunning = true;
    gameLoop();
}

function gameLoop() {
    if (!gameRunning) return;

    setTimeout(function () {
        clearCanvas();
        moveSnake();
        drawSnake();
        drawFood();
        checkCollision();
        updateScore();
        gameLoop();
    }, gameSpeed);
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function moveSnake() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        score++;
        food = generateFood();
    } else {
        snake.pop();
    }
}

function drawSnake() {
    ctx.fillStyle = 'lime';
    for (let part of snake) {
        ctx.fillRect(part.x, part.y, gridSize, gridSize);
    }
}

function drawFood() {
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, gridSize, gridSize);
}

function generateFood() {
    const x = Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize;
    const y = Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize;
    return { x, y };
}

function changeDirection(event) {
    if (event.key === 'ArrowUp' && dy === 0) {
        dx = 0;
        dy = -gridSize;
    } else if (event.key === 'ArrowDown' && dy === 0) {
        dx = 0;
        dy = gridSize;
    } else if (event.key === 'ArrowLeft' && dx === 0) {
        dx = -gridSize;
        dy = 0;
    } else if (event.key === 'ArrowRight' && dx === 0) {
        dx = gridSize;
        dy = 0;
    }
}

function checkCollision() {
    if (snake[0].x < 0 || snake[0].x >= canvas.width || snake[0].y < 0 || snake[0].y >= canvas.height) {
        endGame();
    }

    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            endGame();
        }
    }
}

function endGame() {
    gameRunning = false;
    gameOverScreen.style.display = 'block';
    finalScore.textContent = `Your Score: ${score}`;
    playButton.style.display = 'block';
}

function updateScore() {
    scoreDisplay.textContent = `Score: ${score}`;
}