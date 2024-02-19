function winningAlgorithm(board, row, col, symbol) {
    board[row][col] = symbol;

    // entire row
    let row_is_correct = true;
    for (let c = 0; c < 3; c++) {
        if (board[row][c] != symbol) {
            row_is_correct = false;
        }
    }

    // full column
    let col_is_correct = true;
    for (let r = 0; r < 3; r++) {
        if (board[r][col] != symbol) {
            col_is_correct = false;
        }
    }

    // left diagonal (\)
    let left_dia_correct = true;
    for (let i = 0; i <= 2; i++) {
        if (board[i][i] != symbol) {
            left_dia_correct = false;
        }
    }

    // right diagonal (/)
    let right_dia_correct = true;
    let r = 0;
    let c = 2;
    for (let i = 0; i < 2; i++) {
        r += 1;
        c -= 1;
        if (board[r][c] != symbol) {
            right_dia_correct = false;
        }
    }

    // check for draw
    let count = 0;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] != " ") {
                count++;
            }
        }
    }

    if (
        row_is_correct ||
        col_is_correct ||
        left_dia_correct ||
        right_dia_correct
    ) {
        return true;
    }

    if (count == 9) {
        return null;
    }

    return false;
}

test("test case 1", () => {
    expect(
        winningAlgorithm(
            [
                ["X", "O", "X"],
                [" ", "X", " "],
                [" ", " ", " "],
            ],
            2,
            2,
            "X"
        )
    ).toBe(true);
});

test("test case 2", () => {
    expect(
        winningAlgorithm(
            [
                ["X", " ", "X"],
                [" ", " ", " "],
                [" ", " ", " "],
            ],
            0,
            1,
            "X"
        )
    ).toBe(true);
});

test("test case 3", () => {
    expect(
        winningAlgorithm(
            [
                ["X", " ", "X"],
                [" ", " ", " "],
                [" ", " ", " "],
            ],
            0,
            1,
            "O"
        )
    ).toBe(false);
});

test("test case 4", () => {
    expect(
        winningAlgorithm(
            [
                ["X", " ", "X"],
                [" ", " ", " "],
                [" ", " ", " "],
            ],
            1,
            1,
            "X"
        )
    ).toBe(false);
});

test("test case 5", () => {
    expect(
        winningAlgorithm(
            [
                ["O", " ", "X"],
                [" ", "O", " "],
                [" ", " ", "X"],
            ],
            1,
            2,
            "X"
        )
    ).toBe(true);
});

test("test case 6", () => {
    expect(
        winningAlgorithm(
            [
                ["O", " ", "X"],
                ["X", "O", "X"],
                ["X", " ", " "],
            ],
            2,
            2,
            "X"
        )
    ).toBe(true);
});

test("test case 7", () => {
    expect(
        winningAlgorithm(
            [
                ["O", " ", "X"],
                ["X", "O", "X"],
                ["X", " ", " "],
            ],
            2,
            2,
            "O"
        )
    ).toBe(true);
});

test("test case 8", () => {
    expect(
        winningAlgorithm(
            [
                ["O", "O", "X"],
                ["X", "O", "O"],
                ["X", " ", "X"],
            ],
            2,
            1,
            "O"
        )
    ).toBe(true);
});

test("test case 9", () => {
    expect(
        winningAlgorithm(
            [
                [" ", " ", "X"],
                [" ", "X", "O"],
                [" ", " ", "X"],
            ],
            2,
            0,
            "X"
        )
    ).toBe(true);
});

test("test case 10", () => {
    expect(
        winningAlgorithm(
            [
                ["O", "X", "X"],
                ["X", "X", "O"],
                [" ", "O", "X"],
            ],
            2,
            0,
            "O"
        )
    ).toBe(null);
});
