import { createContext, useReducer } from "react";
import io from "socket.io-client"

const socket = io.connect("http://localhost:3777");

const initialState = {
    socket: socket,
    username: "",
    room: "",
    host: false
};



const reducer = (state, action) => {
    switch (action.type) {
        case "CREATE":
            return {
                ...state, username: action.payload.username, room : action.payload.room, host: true
            }
        case "JOIN":
            return {
                ...state, username: action.payload.username, room : action.payload.room
            }
        default: return state;
    }

}


export const AppContext = createContext();

export const AppProvider = (props) => {

    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <AppContext.Provider
            value={{
                username: state.username,
                room: state.room,
                host: state.host,
                socket: state.socket,
                dispatch
            }}>
            {props.children}
        </AppContext.Provider>
    )
}