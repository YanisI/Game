import React, { useContext, useEffect } from 'react'
import Chat from '../components/Chat';
import { AppContext } from "../context/AppContext";

import { useNavigate } from "react-router-dom";

const Room = () => {

    const { username } = useContext(AppContext);
    let navigate = useNavigate();

    useEffect(()=> {
        if(username === "")
            navigate("/");
    },[username, navigate]);
    
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