"use strict";
const new_game = confirm("Do you want to start a new game?");
const player_symbol = new_game ? "X" : "O";
let game_id = String(Math.floor(100000000 + Math.random() * 900000000));

if (!new_game) {
    game_id = prompt("Enter game code to join game");
}

const username = prompt("What is your name?");
document.getElementById("game_id").innerHTML = "Game Code:" + game_id;

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
    console.log(data);
});

const onClickOfCell = (cell) => {
    // check if the move has made the player win

    socket.emit("player move", {
        user: username,
        symbol: player_symbol,
        cell: cell,
        winner: null,
        game_id,
    });
};

// ADD EVENT LISTENER TO CELLS
document.querySelectorAll(".cell").forEach((cell) => {
    cell.addEventListener("click", (el) => {
        onClickOfCell(el.target.getAttribute("id"));
    });
});
