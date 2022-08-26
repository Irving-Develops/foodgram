import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from 'socket.io-client';
import { getMessagesThunk } from '../../store/messages'
import CreateMessage from "../Messages/CreateMessage";

let socket;

const Chat = ({chatroomId}) => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const messageObj = useSelector(state => state.messages)
    let chatroomMessages;
    // const [messages, setMessages] = useState([]);
    // const [chatInput, setChatInput] = useState("");
    
    // console.log(messages, "messages 2")
    // if(messageObj) {
    //     chatroomMessages = Object.values(messageObj).filter(message => message.chatroom_id === chatroomId)
    // }


    useEffect(() => {
        if(chatroomId) {
            dispatch(getMessagesThunk(chatroomId))
        }
    }, [dispatch, chatroomId])


    // useEffect(() => {
    //     // open socket connection
    //     // create websocket
    //     socket = io();

    //     socket.on("chat", (chat) => {
    //             console.log(chat)
    //         // if(chatroomMessages){
    //         //     chatroomMessages.map(message => {
    //                 setMessages(messages => [...messages, chat])

    //             // })
    //         // }
    //     })
    //     // when component unmounts, disconnect
    //     return (() => {
    //         socket.disconnect()
    //     })
    // }, [])

    // const updateChatInput = (e) => {
    //     setChatInput(e.target.value)
    // };

    // const sendChat = (e) => {
    //     e.preventDefault()
    //     socket.emit("chat", { user: user.username, msg: chatInput });
    //     setChatInput("")
    // }

    return (user && (
        <div>
            {/* <div>
                {chatroomMessages.map((message, ind) => (
                    <div key={ind}>{`${message.owner}: ${message.message}`}</div>
                ))}
            </div> */}
            {/* <form onSubmit={sendChat}>
                <input
                    value={chatInput}
                    onChange={updateChatInput}
                />
                <button type="submit">Send</button>
            </form> */}
            {chatroomId && (
                <CreateMessage chatroomId={chatroomId} messageObj={messageObj}/>
            )}
        </div>
    )
    )
};


export default Chat;