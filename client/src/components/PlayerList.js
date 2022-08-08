import React, { useEffect, useContext, useState } from 'react'
import { AppContext } from '../context/AppContext';
import { ReactComponent as Crown } from '../images/crown.svg';

const PlayerList = () => {

    const { socket, room } = useContext(AppContext);

    const [listPlayer, setListPlayer] = useState([])


    useEffect(() => {
        socket.on("list_player", (data) => {
            console.log("on recoit la liste")
            console.log(data);
            setListPlayer(data.player)
        })

    }, [socket]);



    useEffect(() => {
        setTimeout(() => {
            socket.emit("get_player_list", room);
        }, 1000);
    }, [room, socket])

    return (
        <div className='player-list-container'>
            <ul className='list'>
                {listPlayer.map((player, i) => {
                    console.log("")
                    console.log(player)
                    return (
                        <li className="cont" key={i}>
                                <img
                                    className='avatar-picture'
                                    src={`https://avatars.dicebear.com/api/${player.sprite}/${player.seed}.svg?scale=100`}
                                    alt="Sprite"
                                />
                                <span className='username'>
                                    {player.name}
                                </span>
                                {player.host && <div className="crown">
                                    <Crown className="crownSVG" />
                                </div>}
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default PlayerList