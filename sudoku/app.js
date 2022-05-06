
function displayPuzzle() {
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

function attachListeners() {
    document.getElementsByClassName('option-list-items')[2].addEventListener('click', cehekSolution);
    document.getElementsByClassName('option-list-items')[3].addEventListener('click', displayPuzzle);
    document.getElementsByClassName('option-list-items')[3].addEventListener('click', resetTimer);
    document.getElementsByClassName('option-list-items')[4].addEventListener('click', solvePuzzle);
    document.getElementById('timer-pause').addEventListener('click', () => { isPaused = true });
    document.getElementById('timer-resume').addEventListener('click', () => { isPaused = false });
}

function startTimer() {
    setInterval(updateTimer, 1000);

    function updateTimer() {
        if (!isPaused) {
            seconds++;

            if (seconds > 59) {
                seconds = 0;
                minutes++;
            }
            if (minutes > 59) {
                alert('Sorry, you wasn\'t able to solve the puzzle.');
                isPaused = true;
                minutes = 0;
                seconds = '00';
                timerDiv.textContent = `${minutes}:${seconds}`;
                return;
            }
            seconds = seconds < 10 ? '0' + seconds : seconds;
            timerDiv.textContent = `${minutes}:${seconds}`;
        }
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
    if (buttonSelected && !solved && !isPaused) {
        console.log(squareSelected);

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
    isPaused = true;
    alert('Congratulations, you solved the puzzle! :)');
}

function resetTimer() {
    minutes = 0;
    seconds = '00';
    isPaused = false
    solved = false;
}

//TODO: REFACTOR THE CODE!!! :)
