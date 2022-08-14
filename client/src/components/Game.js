import React, { useContext, useState } from 'react'
import { AppContext } from "../context/AppContext";
import Param from './Param';

const Game = () => {

    
    const { username, sprite, seed, host } = useContext(AppContext);

    const [params, setParams] = useState(false)

    const handleParams = () => {
        setParams(!params);
    }

    const handleValidate = () => {
        setParams(!params);
    }
    return (
        <div className="game">
            <div className="title">
                CultGames
            </div>
            {/* 
            */}
            <button className='play-btn'>
                Jouer
            </button>
            {  host &&
                <div 
                className="param"
                onClick={handleParams}
                >
                    params
                </div>
            }
            
            {params && <Param handleValidate={handleValidate}/>}
        </div>
    )
}

export default Game