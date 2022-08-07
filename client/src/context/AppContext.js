import { createContext, useReducer } from "react";
import io from "socket.io-client"

const socket = io.connect("http://localhost:3777");

const initialState = {
    socket: socket,
    username: "",
    room: "",
    host: false,
    sprite: "avataaars",
    seed: 1000
};



const reducer = (state, action) => {
    switch (action.type) {
        case "CREATE":
            return {
                ...state, 
                username: action.payload.username, 
                room : action.payload.room, 
                host: true, 
                sprit : action.payload.sprite, 
                seed : action.payload.seed
            }
        case "JOIN":
            return {
                ...state, 
                username: action.payload.username, 
                room : action.payload.room, 
                sprite : action.payload.sprite, 
                seed : action.payload.seed
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
                sprite: state.sprite,
                seed: state.seed,
                dispatch
            }}>
            {props.children}
        </AppContext.Provider>
    )
}