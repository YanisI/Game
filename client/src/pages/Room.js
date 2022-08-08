import React, { useContext, useEffect } from 'react'
import Chat from '../components/Chat';
import { AppContext } from "../context/AppContext";
import { ReactComponent as Crown } from '../images/crown.svg';

import { useNavigate } from "react-router-dom";
import PlayerList from '../components/PlayerList';
import Game from '../components/Game';

const Room = () => {

    const { username, sprite, seed, host } = useContext(AppContext);
    let navigate = useNavigate();

    useEffect(() => {
        if (username === "")
            navigate("/");
    }, [username, navigate]);

    return (
        <div className='page-room'>
            <div className="cont">
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