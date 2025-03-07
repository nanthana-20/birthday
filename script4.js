document.addEventListener("DOMContentLoaded", function () {
    const words = ["MASTERCHIEF", "CORTANA", "SPARTAN", "HALO", "WARTHOG", "COVENANT", "ODST", "BATTLE", "RINGWORLD"];
    const gridSize = 12;
    let grid = Array(gridSize).fill().map(() => Array(gridSize).fill(' '));
    let selectedCells = [];
    let confirmedSelections = new Set(); // Stores permanently selected cells

    // Generate Word List with Checkboxes
    const wordListElement = document.getElementById("word-list");
    words.forEach(word => {
        let listItem = document.createElement("li");
        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.dataset.word = word;
        listItem.appendChild(checkbox);
        listItem.appendChild(document.createTextNode(word));
        wordListElement.appendChild(listItem);
    });

    // Initialize Canvas
    const canvas = document.getElementById("wordCanvas");
    const ctx = canvas.getContext("2d");
    const cellSize = 40;
    canvas.width = gridSize * cellSize;
    canvas.height = gridSize * cellSize;

    // Fill Grid with Random Letters
    function fillGrid() {
        for (let i = 0; i < gridSize; i++) {
            for (let j = 0; j < gridSize; j++) {
                if (grid[i][j] === ' ') {
                    grid[i][j] = String.fromCharCode(65 + Math.floor(Math.random() * 26)); // A-Z
                }
            }
        }
    }

    // Place Words in Grid
    function placeWord(word) {
        let placed = false;
        while (!placed) {
            let row = Math.floor(Math.random() * gridSize);
            let col = Math.floor(Math.random() * gridSize);
            let direction = Math.random() > 0.5 ? "H" : "V";
            
            if (direction === "H" && col + word.length <= gridSize) {
                let fits = true;
                for (let i = 0; i < word.length; i++) {
                    if (grid[row][col + i] !== ' ') fits = false;
                }
                if (fits) {
                    for (let i = 0; i < word.length; i++) {
                        grid[row][col + i] = word[i];
                    }
                    placed = true;
                }
            } else if (direction === "V" && row + word.length <= gridSize) {
                let fits = true;
                for (let i = 0; i < word.length; i++) {
                    if (grid[row + i][col] !== ' ') fits = false;
                }
                if (fits) {
                    for (let i = 0; i < word.length; i++) {
                        grid[row + i][col] = word[i];
                    }
                    placed = true;
                }
            }
        }
    }

    // Draw Grid
    function drawGrid() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.font = "30px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        for (let i = 0; i < gridSize; i++) {
            for (let j = 0; j < gridSize; j++) {
                let cellKey = `${i}-${j}`;

                if (confirmedSelections.has(cellKey)) {
                    ctx.fillStyle = "lightgreen"; // Permanent highlight
                    ctx.fillRect(j * cellSize, i * cellSize, cellSize, cellSize);
                }

                ctx.strokeRect(j * cellSize, i * cellSize, cellSize, cellSize);
                ctx.fillStyle = "black";
                ctx.fillText(grid[i][j], j * cellSize + cellSize / 2, i * cellSize + cellSize / 2);
            }
        }
    }

    // Mouse Selection Logic
    let isSelecting = false;

    canvas.addEventListener("mousedown", (e) => {
        selectedCells = []; // Start fresh selection
        isSelecting = true;
        let x = Math.floor(e.offsetX / cellSize);
        let y = Math.floor(e.offsetY / cellSize);
        selectedCells.push(`${y}-${x}`);
        highlightSelection();
    });

    canvas.addEventListener("mousemove", (e) => {
        if (isSelecting) {
            let x = Math.floor(e.offsetX / cellSize);
            let y = Math.floor(e.offsetY / cellSize);
            let cellKey = `${y}-${x}`;
            if (!selectedCells.includes(cellKey)) {
                selectedCells.push(cellKey);
                highlightSelection();
            }
        }
    });

    canvas.addEventListener("mouseup", () => {
        isSelecting = false;

        // Convert selection to word
        let wordSelected = selectedCells.map(cell => {
            let [y, x] = cell.split("-").map(Number);
            return grid[y][x];
        }).join('');

        if (words.includes(wordSelected)) {
            // Permanently store correct selections
            selectedCells.forEach(cell => confirmedSelections.add(cell));
        }

        drawGrid();
    });

    // Highlight Selected Cells
    function highlightSelection() {
        drawGrid(); // Reset grid before re-drawing selection
        selectedCells.forEach(cell => {
            let [y, x] = cell.split("-").map(Number);
            ctx.fillStyle = "rgba(144, 238, 144, 0.5)"; // Light green transparent
            ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
            ctx.fillStyle = "black";
            ctx.fillText(grid[y][x], x * cellSize + cellSize / 2, y * cellSize + cellSize / 2);
        });
    }

    // Initialize Game
    words.forEach(placeWord);
    fillGrid();
    drawGrid();
});