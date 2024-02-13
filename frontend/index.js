const cells = document.querySelectorAll(".cell");
console.log(cells);

cells.forEach((cell) => {
    cell.addEventListener("click", (el) => {
        console.log(el.target.getAttribute("id"));
        console.log("clicked");
    });
});

const new_game = confirm("Do you want to start a new game?");
const player_symbol = new_game ? "X" : "O";
let game_id = (Math.random() + 1).toString(36).substring(7);

if (!new_game) {
    game_id = prompt("Enter game id to join game");
}

const username = prompt("What is your name?");
localStorage.setItem("game_id", game_id);

// const socket = io("http://localhost:3000");
// const socket = io("http://localhost:3000/game");
// socket.emit("join game", {
//     game_id: game_id,
//     user: username,
// });

// socket.on("msg", (data) => {
//     console.log(data);
// });

// socket.emit("select", {
//     user: username,
//     selected_cell: "1-1",
//     player_symbol: player_symbol,
// });
