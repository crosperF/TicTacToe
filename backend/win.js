function winningAlgorithm(row, col, symbol) {
    // let row = 1;
    // let col = 1;
    // let symbol = "X";

    let board = [
        ["X", "O", "X"],
        [" ", "X", " "],
        [" ", " ", " "],
    ];
    board[row][col] = symbol;
    console.log(board);
    // left/right = entire row
    let row_is_correct = true;
    for (c = 0; c < 3; c++) {
        if (board[row][c] != symbol) {
            row_is_correct = false;
        }
    }

    // full column
    let col_is_correct = true;
    for (r = 0; r < 3; r++) {
        if (board[r][col] != symbol) {
            col_is_correct = false;
        }
    }

    // if ((row === 1) & (col === 1)) {
    // left diagonal (\)
    let left_dia_correct = true;
    for (let i = 0; i < 2; i++) {
        if (board[i][i] != symbol) {
            left_dia_correct = false;
        }
    }

    // right diagonal (/)
    let right_dia_correct = true;
    for (let r = 0; r < 2; r++) {
        for (let c = 2; c >= 0; c--) {
            if (board[r][c] != symbol) {
                right_dia_correct = false;
            }
        }
    }
    // }

    return (
        row_is_correct &&
        col_is_correct &&
        left_dia_correct &&
        right_dia_correct
    );
    // draw
}

console.log(winningAlgorithm(2, 2, "X"));
console.log(winningAlgorithm(2, 2, "0"));
