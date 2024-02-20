"use strict";
const new_game = confirm("Do you want to start a new game?");
const player_symbol = new_game ? "X" : "O";
let current_player_turn = player_symbol == "X" ? true : false;
let game_id = String(Math.floor(100000000 + Math.random() * 900000000));

if (!new_game) {
    game_id = prompt("Enter game code to join game");
}

const username = prompt("What is your name?");
document.getElementById("game_id").innerHTML = "Game Code:" + game_id;
document.getElementById(
    "user_info"
).innerHTML = `Hello ${username}!  Your symbol is ${player_symbol}`;

// const socket = io("http://localhost:3000");
const socket = io("http://localhost:3000/game");
socket.emit("join game", {
    game_id: game_id,
    user: username,
});

// SOCKET LISTENERS
socket.on("new joinee", (data) => {
    console.log(data);
});

socket.on("move", (data) => {
    if (data.user != username) {
        setCellValue(data.cell, data.symbol);
        current_player_turn = true;
    }
    if (data.game_status == "won") {
        alert(`${data.user} (${data.symbol}) won the game`);
    } else if (data.game_status == "draw") {
        alert(`The match is a draw`);
    }
});

function setCellValue(cell, symbol) {
    const el = document.getElementById(cell);
    el.innerHTML = symbol;
    el.classList.add("filled-cell");
}

const onClickOfCell = (cell) => {
    if (!current_player_turn) {
        return;
    }

    // fill the cell value
    setCellValue(cell, player_symbol);

    // check if the move has made the player win
    let board = [[], [], []];
    document.querySelectorAll(".cell").forEach((el) => {
        const [r, c] = el.id.split("-");
        let cur_symbol = el.innerHTML;
        if (cur_symbol != "X" && cur_symbol != "O") {
            cur_symbol = " ";
        }

        board[r].push(cur_symbol);
    });

    const [r, c] = cell.split("-");
    let win_status = winningAlgorithm(
        board,
        Number(r),
        Number(c),
        player_symbol
    );

    let game_status =
        win_status == true
            ? "won"
            : win_status == null
            ? "draw"
            : "in_progress";

    socket.emit("player move", {
        user: username,
        symbol: player_symbol,
        cell: cell,
        game_status: game_status,
        game_id,
    });
    current_player_turn = false;
};

// ADD EVENT LISTENER TO CELLS
document.querySelectorAll(".cell").forEach((cell) => {
    cell.addEventListener("click", (el) => {
        onClickOfCell(el.target.getAttribute("id"));
    });
});

function winningAlgorithm(board, row, col, symbol) {
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
    for (let i = 0; i <= 2; i++) {
        if (board[r][c] != symbol) {
            right_dia_correct = false;
        }
        r += 1;
        c -= 1;
    }

    if (
        row_is_correct ||
        col_is_correct ||
        left_dia_correct ||
        right_dia_correct
    ) {
        return true;
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
    if (count == 9) {
        return null;
    }

    return false;
}
