import React, { useState, useEffect, useContext } from 'react'
import ScrollToBottom from "react-scroll-to-bottom"
import { AppContext } from '../context/AppContext';

const Chat = () => {

    
  const { username, socket, room } = useContext(AppContext);


    const [currrentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([])

    useEffect(() => {
        console.log("USERNAME : " +username)
    },[])

    useEffect(() => {
        socket.on("receive_message", (data) => {
            console.log(data)
            setMessageList((list) => [...list, data]);
            console.log(messageList);
        })
    }, [])


    const sendMessage = async () => {
        if (currrentMessage !== "") {
            const messageData = {
                room: room,
                author: username,
                message: currrentMessage,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes() + ":" + + new Date(Date.now()).getSeconds()
            }

            await socket.emit("send_message", messageData);
            setMessageList((list) => [...list, messageData]);
            setCurrentMessage("");
        }
    }
    return (
        <div className="chat-container">
            <div className="chat-header">
                <p> Live Chat : {room}</p>
            </div>
            <div className="chat-body">
                <ScrollToBottom className='chat-body-container'>
                    {messageList.map((a, index) => {
                        return (
                            <p key={index}>
                                {a.author}
                                {a.message}
                                {a.time}
                            </p>)
                    })}
                </ScrollToBottom>
            </div>
            <div className="chat-footer">
                <input
                    type="text"
                    placeholder='...'
                    value={currrentMessage}
                    onChange={(e) => setCurrentMessage(e.target.value)}
                    onKeyPress={(e) => { e.key === "Enter" && sendMessage(); }}
                />
                <button onClick={sendMessage}> Send &#9658;</button>
            </div>
        </div>
    )
}

export default Chat