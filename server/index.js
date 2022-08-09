const express = require('express');
const app = express();
const http = require("http");
const cors = require('cors');
const port = 3777;
const { Server } = require("socket.io")
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
})

let rooms = [];

io.on("connection", (socket) => {
    console.log("User connected " + socket.id);

    socket.on("join_room", (data) => {
        console.log("JOIN ROOM")
        if(rooms.filter(a => a.room === data.room).length === 1){
            let a = {
                name: data.player[0].name,
                id: socket.id,
                sprite: data.player[0].sprite,
                seed: data.player[0].seed,
                host: false
            }
    
            rooms.filter(a => a.room === data.room)[0].player.push(a)
            let roomData = rooms.filter(a => a.room === data.room)[0]
            console.log(roomData)
            socket.join(data.room);
            
            socket.emit("succ_join_message", data.room)
            console.log("user " + socket.id + " join " + data)
            console.log("")
    
            
            socket.to(data.room).emit("list_player", roomData)
        }
        else{
            socket.emit("err_message", ("The Room doesn't exist"))
        }

    });

    socket.on("create_room", (data) => {
        console.log("CREATE ROOM")
        let roomData = {
            room: data.room,
            player: [{
                name: data.player[0].name,
                id: socket.id,
                sprite: data.player[0].sprite,
                seed: data.player[0].seed,
                host: true
            }]
        }
        rooms = [...rooms, roomData];
        
        socket.emit("succ_create_message", data.room)
        console.log("Creation lobby : " + data.room + " - by player : " + data.player[0].name + " - " + data.player[0].id);
        socket.join(data.room);

        socket.to(data.room).emit("list_player_fetch", roomData)

        console.log("Liste des rooms : ")
        rooms.map(a => console.log(a));
        console.log("")
    });


    socket.on("send_message", (data) => {
        console.log("DATA : " + data.message)
        console.log(data.room)
        socket.to(data.room).emit("receive_message", data)
        console.log(data)
    });

    socket.on("get_player_list",(data) =>{
        console.log("")
        console.log("")
        console.log(data)
        console.log("Liste des joueurs de la room:")
        console.log(rooms.filter(a => a.room === data))
        socket.emit("list_player", rooms.filter(a => a.room === data)[0])
    });


    socket.on("disconnect", () => {
        console.log("User disconnected " + socket.id);
    });

})

server.listen(port, () => {
    console.log("SERVER RUNNING")
});