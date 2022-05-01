window.onload = function () {
    boardInit();
};

function boardInit() {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            let square = document.createElement('div');
            square.id = row.toString() + '-' + col.toString();
            square.classList.add('squares');
        }
    }
}
