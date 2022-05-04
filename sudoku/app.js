const puzzle = [
    [0, 8, 0, 1, 0, 0, 0, 0, 7],
    [0, 0, 0, 0, 7, 0, 9, 6, 0],
    [0, 2, 6, 9, 0, 0, 1, 3, 0],
    [0, 0, 0, 2, 9, 0, 3, 0, 4],
    [9, 6, 0, 0, 0, 0, 0, 8, 2],
    [5, 0, 2, 0, 4, 7, 0, 0, 0],
    [0, 1, 3, 0, 0, 9, 8, 4, 0],
    [0, 9, 7, 0, 2, 0, 0, 0, 0],
    [6, 0, 0, 0, 0, 3, 0, 7, 0],
];

const solvedPuzzle = [
    [3, 8, 9, 1, 6, 5, 4, 2, 7],
    [1, 4, 5, 3, 7, 2, 9, 6, 8],
    [7, 2, 6, 9, 8, 4, 1, 3, 5],
    [8, 7, 1, 2, 9, 6, 3, 5, 4],
    [9, 6, 4, 5, 3, 1, 7, 8, 2],
    [5, 3, 2, 8, 4, 7, 6, 9, 1],
    [2, 1, 3, 7, 5, 9, 8, 4, 6],
    [4, 9, 7, 6, 2, 8, 5, 1, 3],
    [6, 5, 8, 4, 1, 3, 2, 7, 9],
];

let buttonSelected = null;
let squareSelected = null;
let solved;

window.onload = function () {
    run();
};

function run() {
    displayBoard();
    displayPuzzle();
    displayNumpad();
    attachListeners();
}

function displayBoard() {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {

            let square = document.createElement('div');
            square.id = row.toString() + '-' + col.toString();
            square.classList.add('squares');

            if (row == 0) {
                square.classList.add('border-top');
            }
            if (col == 0) {
                square.classList.add('border-left');
            }
            if (row == 2 || row == 5 || row == 8) {
                square.classList.add('border-bottom');
            }
            if (col == 2 || col == 5 || col == 8) {
                square.classList.add('border-right');
            }

            square.addEventListener('click', selectSquare);
            square.addEventListener('click', enterNumber);
            document.getElementById('board').appendChild(square);
        }
    }
}

function displayPuzzle() {
    solved = false;
    const cells = getCells();

    cells.forEach((cell) => {
        const cellId = cell.id;
        const coords = getCoordinates(cell);

        if (puzzle[coords.row][coords.col] != 0) {
            document.getElementById(cellId).textContent = puzzle[coords.row][coords.col];
            cell.classList.add('displayPuzzleSquares');
        } else {
            document.getElementById(cellId).textContent = '';
        }
    });
}

function displayNumpad() {
    for (let num = 1; num <= 10; num++) {
        const button = document.createElement('button');

        if (num == 10) {
            button.textContent = 'X';
            button.id = 'deleteBtn';
        } else {
            button.textContent = num;
            button.id = `${num}-button`;
        }

        button.classList.add('numpadButtons');
        button.addEventListener('click', selectNumber);
        document.getElementById('numpad').appendChild(button);
    }
}

function selectNumber() {
    if (buttonSelected != null) {
        buttonSelected.classList.remove('numSelected');
    }
    buttonSelected = this;
    buttonSelected.classList.add('numSelected');
}

function selectSquare() {
    if (squareSelected != this) {
        if (squareSelected != null) {
            squareSelected.classList.remove('cell-color');
        }
        squareSelected = this;
    }
    squareSelected.classList.add('cell-color');
}

function enterNumber() {
    if (buttonSelected && !solved) {
        const coords = getCoordinates(this);

        if (puzzle[coords.row][coords.col] == 0) {
            if (buttonSelected.textContent == 'X') {
                this.innerText = '';
                this.classList.remove('entered-numbers');
            } else {
                this.innerText = Number(buttonSelected.textContent);
                this.classList.add('entered-numbers');
            }
        }
    }
}

function getCoordinates(input) {
    const coords = input.id.split('-');
    return {
        row: Number(coords[0]),
        col: Number(coords[1])
    }
}

function attachListeners() {
    document.getElementsByClassName('game-action')[1].addEventListener('click', checkForErrors);
    document.getElementsByClassName('game-action')[1].addEventListener('click', cehekSolution);
    document.getElementsByClassName('game-action')[2].addEventListener('click', displayPuzzle);
    document.getElementsByClassName('game-action')[3].addEventListener('click', solvePuzzle);
}

function solvePuzzle() {
    const cells = getCells();

    cells.forEach((cell) => {
        const coords = getCoordinates(cell);
        document.getElementById(cell.id).textContent = solvedPuzzle[coords.row][coords.col];
        cell.classList.remove('entered-numbers');
    });

    solved = true;
}

function getCells() {
    return document.querySelectorAll('.squares');
}

function cehekSolution() {
    const cells = getCells();

    for (const cell of cells) {
        const coords = getCoordinates(cell);
        const row = coords.row;
        const col = coords.col;


        if (document.getElementById(cell.id).textContent != solvedPuzzle[row][col]) {
            alert('The solution is incorrect. Try again.');
            return;
        }
    }
    
    solved = true;
    alert('Congratulations! You solved the puzzle! :)');
}

function checkForErrors() {
    //TODO: add implementation
}

//TODO: REFACTOR CODE!!! :)
