const puzzle = [
    [0, 8, 0, 1, 0, 0, 0, 0, 7],
    [0, 0, 0, 0, 7, 0, 9, 6, 0],
    [0, 2, 6, 9, 0, 0, 1, 3, 0],
    [0, 0, 0, 2, 9, 0, 3, 0, 4],
    [9, 6, 0, 0, 0, 0, 0, 8, 2],
    [5, 0, 2, 0, 4, 7, 0, 0, 0],
    [0, 1, 3, 0, 0, 9, 8, 4, 0],
    [0, 9, 7, 0, 2, 0, 0, 0, 0],
    [6, 0, 0, 0, 0, 3, 0, 7, 0]
];

let buttonSelected = null;

window.onload = function () {
    start();
};

function start() {
    displayBoard();
    displayPuzzle();
    displayNumpad();
}

function displayBoard() {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            let square = document.createElement('div');
            square.id = row.toString() + '-' + col.toString();
            square.classList.add('squares');
            square.addEventListener('click', selectSquare);
            document.getElementById('board').appendChild(square);
        }
    }
}

function displayPuzzle() {
    const cells = document.querySelectorAll('.squares');

    cells.forEach((cell) => {
        let cellId = cell.id;
        let coords = cellId.split('-');
        let row = Number(coords[0]);
        let col = Number(coords[1]);

        if (puzzle[row][col] != 0) {
            document.getElementById(cellId).textContent = puzzle[row][col];
            cell.classList.add('displayPuzzleSquares');
        }
    });
}

function displayNumpad() {
    for (let num = 1; num <= 9; num++) {
        const number = document.createElement('button');
        number.textContent = num;
        number.id = `${num}-button`;
        number.classList.add('numpadButtons');
        number.addEventListener('click', selectNumber);
        document.getElementById('numpad').appendChild(number);
    }

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'X';
    deleteBtn.id = 'deleteBtn';
    deleteBtn.classList.add('numpadButtons');
    deleteBtn.addEventListener('click', selectNumber);
    document.getElementById('numpad').appendChild(deleteBtn);
}
