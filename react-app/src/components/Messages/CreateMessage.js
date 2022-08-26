import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMessageThunk } from "../../store/messages";
import { io } from 'socket.io-client';


let socket;

export default function CreateMessage({chatroomId, messageObj}) {
    const dispatch = useDispatch()

    // const messageObj = useSelector(state => state.messages)
    console.log(messageObj, "obj")
    const [message, setMessage] = useState("");
    const user = useSelector(state => state.session.user.id)
    
    let chatroomMessages;
    let formattedMsgs = []
    if(messageObj) {
        chatroomMessages = Object.values(messageObj).filter(message => message.chatroom_id === chatroomId)
        chatroomMessages.map(msg => {
            let data = { user: msg.owner, msg: msg.message }
            formattedMsgs.push(data)
        })
    }

    
    const [messages, setMessages] = useState(formattedMsgs);

    console.log(messages, "messages on render")
    
    const updateMessage = (e) => {
        setMessage(e.target.value)
    };

    // useEffect(() => {
        // setMessages(formattedMsgs)
    // }, [formattedMsgs])

    useEffect(() => {
        // open socket connection
        // create websocket
        socket = io();

        socket.on("chat", (chat) => {
            if(messages) {
                setMessages(messages => [...messages, chat])
            }
        })
        // when component unmounts, disconnect
        return (() => {
            socket.disconnect()
        })
    }, [])


    const sendChat = async(e) => {
        e.preventDefault()



        const newMessage = {
            message,
            chatroom_id: chatroomId,
            owner_id: user,
        }

       let createdMsg = await dispatch(addMessageThunk(newMessage))
       
       if(createdMsg) {
            let data = { user: createdMsg?.owner, msg: createdMsg?.message }
            console.log(data, "data")
            socket.emit("chat", data);
        }
        setMessage("")
    }


    if(!messageObj) return null;
    return (
        <div>
            <div>
                {messages.length > 0 && messages.map((message, ind) => (
                    <div key={ind}>{`${message.user}: ${message.msg}`}</div>
                ))}
            </div>

            <form onSubmit={sendChat}>
                <input
                    value={message}
                    onChange={updateMessage}
                />
                <button type="submit">Send</button>
            </form>
        </div>
    )
}