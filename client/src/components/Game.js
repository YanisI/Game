import React, { useContext } from 'react'
import { AppContext } from "../context/AppContext";

const Game = () => {

    
    const { username, sprite, seed, host } = useContext(AppContext);
    return (
        <div className="game">
            <div className="title">
                CultGames
            </div>
            {/* 
            <select className='selectQ' name="cars">
                <option value="volvo">10</option>
                <option value="saab">20</option>
                <option value="fiat" selected>30</option>
                <option value="audi">Audi</option>
            </select>*/}
            <button className='play-btn'>
                Jouer
            </button>
            {  host &&
                <div className="param">
                    params
                </div>
            }
        </div>
    )
}

export default Game