import React, { useState, useContext, useEffect } from "react"
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import Avatar from "../components/Avatar";
import ShowNotification from "../components/ShowNotification";

const Home = () => {

  const { socket, dispatch } = useContext(AppContext);
  const [username, setUsername] = useState("")
  const [room, setRoom] = useState("");
  const [seed, setSeed] = useState(1000);
  const [sprite, setSprite] = useState("avataaars");
  const [errMessage, setErrMessage] = useState("");
  const [showNotification, setShowNotification] = useState(false);

  let navigate = useNavigate();

  useEffect(() => {
    socket.on("err_message", (data) => {
      setErrMessage(data);
      notification(setShowNotification);
    })

    socket.on("succ_join_message", (data) => {
      navigate(`/Room/${data}`);
    })

    socket.on("succ_create_message", (data) => {
      navigate(`/Room/${data}`);
    })
  }, [])

  const joinRoom = async () => {
    if (username !== "" && room !== "") {
      let data = {
        room: room,
        player: [{
          name: username,
          id: socket.id,
          sprite: sprite,
          seed: seed,
          host: false
        }]
      }
      socket.emit("join_room", data);
      await dispatch({
        type: "JOIN",
        payload: {
          username: username,
          room: room,
          sprite: sprite,
          seed: seed,
          host: false
        }
      });

    }
  }

  const createRoom = async () => {
    console.log("create_room")
    if (username !== "") {
      let data = {
        room: Math.random().toString(36).slice(2, 12),
        player: [{
          name: username,
          id: socket.id,
          sprite: sprite,
          seed: seed
        }]
      }
      console.log(data);
      socket.emit("create_room", data);
      setRoom(data.room);
      await dispatch({
        type: "CREATE",
        payload: {
          username: username,
          room: data.room,
          sprite: sprite,
          seed: seed
        }
      });
      navigate(`/Room/${data.room}`);
    }
  }

  const notification = (setter) => {
    setter(true);
    setTimeout(() => {
      setter(false);
    }, 2000);
  }



  return (
    <>
      <div className="home-page">
        <div className="home-container">
          <p className="title">
            CultGames
          </p>
          <div className="rooms">
            <input
              type="text"
              maxLength="12"
              placeholder="Enter your name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <div>
              <Avatar seed={seed} setSeed={setSeed} sprite={sprite} setSprite={setSprite} />
            </div>
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
      <ShowNotification showNotification={showNotification} errMessage={errMessage} />
    </>
  )
}

export default Home