const express = require('express');
const app = express();
const http = require("http");
const cors = require('cors');
const port = 3777;
const {Server} = require("socket.io")
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
})

let rooms= [];

io.on("connection", (socket) => {
    console.log("User connected " + socket.id);

    socket.on("join_room", (data) => {
        let a = [...rooms, data];
        rooms = a;
        console.log("Liste des salons : " + rooms)
        socket.join(data);
        console.log("user " + socket.id + " join " + data)
    });

    socket.on("create_room", (data) => {
        let a = {
            room : data.room,
            player : [{
                name : data.player[0].name,
                id: socket.id
            }]
        }
        rooms = [...rooms, a];
        console.log("Creation lobby : " + data.room + " - by player : " + data.player[0].name + " - " + data.player[0].id);
        socket.join(data.room);

        console.log("Liste des rooms : ") 
        rooms.map(a => console.log(a));
    });


    socket.on("send_message", (data) => {
        console.log("DATA : " + data.message)
        socket.to(data.room).emit("receive_message", data)
        console.log(data)
    });


    socket.on("disconnect", () => {
        console.log("User disconnected " + socket.id);
    });

})

server.listen(port, () => {
    console.log("SERVER RUNNING")
});