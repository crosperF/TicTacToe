// create express app
const express = require("express");
const app = express();

// CORS
// const cors = require("cors");
// const corsOptions = {
//     origin: "http://localhost",
// };
// app.use(cors());

// create a http server
const http = require("http");
const server = http.createServer(app);

// using socket.io
const { Server } = require("socket.io");
const io = new Server(server, {
    cors: {
        origin: "*",
    },
});

app.get("/", (req, res) => {
    res.send({ msg: "Hello" });
});

const gameNamespace = io.of("/game");
gameNamespace.on("connect", (socket) => {
    // can stop if the room already has 2 clients
    socket.on("join game", (data) => {
        socket.join(data.game_id);
        gameNamespace
            .in(data.game_id)
            .emit("new joinee", `${data.user} has joined the game`);
    });

    //
    socket.on("player move", (data) => {
        gameNamespace.in(data.game_id).emit(
            "move",
            {
                user: data.user,
                cell: data.cell,
                symbol: data.symbol,
            }
            // `${data.user} has put ${data.symbol} on  cell ${data.cell}`
        );
    });
});

server.listen(3000, () => {
    console.log("started listening to server: 3000");
});
