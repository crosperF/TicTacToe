// create express app
const express = require("express");
const app = express();

// CORS
const cors = require("cors");
app.use(cors());
// create a http server
const http = require("http");
const server = http.createServer(app);

// using socket.io
const { Server } = require("socket.io");
const io = new Server(server);

app.get("/", (req, res) => {
    res.send("Hello");
});

io.on("connection", (socket) => {
    console.log("a user is connected");
});

server.listen(3000, () => {
    console.log("started listening to server: 3000");
});
