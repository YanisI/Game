import React from 'react'
import Chat from '../components/Chat';
import { AppContext } from "../context/AppContext";

const Room = () => {
    return (
        <div className='page-room'>
            <div className="cont">
                <div className="left">
                    PROFILE PICTURE
                    
                    <Chat />
                </div>
                <div className="jeu">
                    bbb
                </div>
                <div className="players">
                    aaaa
                </div>
            </div>
        </div>
    )
}

export default Room