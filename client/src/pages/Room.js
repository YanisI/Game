import React, { useContext, useEffect } from 'react'
import Chat from '../components/Chat';
import { AppContext } from "../context/AppContext";
import { ReactComponent as Crown } from '../images/crown.svg';

import { useNavigate } from "react-router-dom";
import PlayerList from '../components/PlayerList';
import Game from '../components/Game';

const Room = () => {

    const { socket, username, sprite, seed, host, dispatch } = useContext(AppContext);
    let navigate = useNavigate();

    useEffect(() => {
        if (username === "")
            navigate("/");
    }, [username, navigate]);

    const leaveLobby = async () => {
        console.log("On quitte")
        let data = {
            id: socket.id,
            room: socket.room
        }
        socket.emit("leave_room", data);
        
        navigate("/");
        await dispatch({
            type: "LEAVING_ROOM",
            payload: {
              username: "",
              room: "",
              sprite: sprite,
              seed: seed,
              host: false
            }
          });
    }

    return (
        <div className='page-room'>
            <div className="cont">
                <div className="leave"
                    onClick={leaveLobby}>
                    leave
                </div>
                <div className="left">
                    <div className="myAvatar">
                        <img
                        className='avatar-picture'
                            src={`https://avatars.dicebear.com/api/${sprite}/${seed}.svg?scale=100`}
                            alt="Sprite"
                        />
                        <span className='username'>
                            {username}
                        </span>
                        {host && <div className="crown">
                            <Crown className="crownSVG"/>
                        </div>}
                    </div>

                    <Chat />
                </div>
                <div className="jeu">
                    <Game />
                </div>
                <div className="players">
                    <PlayerList />
                </div>
            </div>
        </div>
    )
}

export default Room