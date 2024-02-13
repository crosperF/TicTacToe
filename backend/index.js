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
    socket.on("join game", (data) => {
        gameNamespace
            .in(data.game_id)
            .emit("msg", `${data.user} has joined the game`);
    });
});

// io.on("connection", (socket) => {
//     console.log("a user is connected");

//     socket.on("select", (data) => {
//         console.log(data);
//     });
// });

server.listen(3000, () => {
    console.log("started listening to server: 3000");
});
