import React, { useState, useEffect, useContext } from 'react'
import ScrollToBottom from "react-scroll-to-bottom"
import { AppContext } from '../context/AppContext';
import moment from 'moment';

const Chat = () => {


    const { username, socket, room } = useContext(AppContext);


    const [currrentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([])

    useEffect(() => {
        console.log("USERNAME : " + username)
    }, [])

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
                time: moment().format('LT')
            }
            //new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
            await socket.emit("send_message", messageData);
            setMessageList((list) => [...list, messageData]);
            setCurrentMessage("");
        }
    }
    return (
        <div className="chat-container">
            <div className="chat-header">
                <p>Chat</p>
            </div>
            <div className="chat-body">
                <ScrollToBottom className='chat-body-container'>
                    {messageList.map((a, i) => {
                        return (
                            <div
                                key={i}
                                className={username === a.author ? " message you" : "message other"}
                            >
                                <div className="message-box">
                                    <p>{a.message}</p>
                                </div>
                                <div className="message-info">
                                    <span> <span className='author'>{a.author}</span>  - <span className='time'>{a.time}</span> </span>
                                </div>
                            </div>)
                    })}
                </ScrollToBottom>
            </div>
            <div className="chat-footer">
                <input
                    className='input'
                    type="text"
                    value={currrentMessage}
                    onChange={(e) => setCurrentMessage(e.target.value)}
                    onKeyPress={(e) => { e.key === "Enter" && sendMessage(); }}
                />
                <button
                    className='btn'
                    onClick={sendMessage}
                >
                    Send &#9658;
                </button>
            </div>
        </div>
    )
}

export default Chat