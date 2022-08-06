import React, { useState, useContext, useEffect } from "react"
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const Home = () => {

  const { socket, dispatch } = useContext(AppContext);
  const [username, setUsername] = useState("")
  const [room, setRoom] = useState("");

  let navigate = useNavigate();

  const joinRoom = async () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      await dispatch({
        type: "JOIN",
        payload: {
          username: username,
          room: room
        }
      });
      navigate(`/Room/${room}`);
    }
  }

  const createRoom = async () => {
    console.log("create_room")
    if (username !== "") {
      let data = {
        room: Math.random().toString(36).slice(2, 12),
        player: [{
          name: username,
          id: socket.id
        }]
      }
      console.log(data);
      socket.emit("create_room", data);
      setRoom(data.room);
      await dispatch({
        type: "CREATE",
        payload: {
          username: username,
          room: data.room
        }
      });
      navigate(`/Room/${data.room}`);
    }
  }

  return (
    <div className="home-page">
      <div className="home-container">
        <p className="title">CultGames</p>
        <div className="rooms">
          <input
            type="text"
            placeholder="Enter your name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter the room name (ex: abcdef26gh)"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
          />
          <button
            onClick={joinRoom}
            className="btn join"
          >
            Join a room
          </button>
          <button
            onClick={createRoom}
            className="btn create"
          >
            Create a private room
          </button>
        </div>
      </div>
    </div>
  )
}

export default Home