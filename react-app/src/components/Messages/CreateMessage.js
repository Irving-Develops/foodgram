import React, { useState, useEffect, useRef} from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMessageThunk } from "../../store/messages";
import { io } from 'socket.io-client';
import classes from './Message.module.css'
import {getMessagesThunk} from '../../store/messages'
import { getChatroomsThunk } from "../../store/chatrooms";


let socket;

export default function CreateMessage({chatroomId, setUpToDate}) {
    const dispatch = useDispatch()
    const [message, setMessage] = useState("");
    const user = useSelector(state => state.session.user)
    const messageObj = useSelector(state => state.messages)
    const chatrooms = useSelector(state => state.chatrooms)
    const messagesEndRef = useRef(null)


    //scrolls to newest message
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
        console.log("firing")
    }



    let chatroomUser;

    if(chatroomId) {
        chatroomUser = chatrooms[chatroomId].otherUser
    }

    
    let chatroomMessages;
    let formattedMsgs = []
    if(messageObj) {
        chatroomMessages = Object.values(messageObj).filter(message => message.chatroom_id === chatroomId)
        scrollToBottom()
    }

    
    const [messages, setMessages] = useState(chatroomMessages);

    
    const updateMessage = (e) => {
        setMessage(e.target.value)
    };

    useEffect(() => {
        if(chatroomId) {
            dispatch(getMessagesThunk(chatroomId))
            dispatch(getChatroomsThunk())

        }
    }, [dispatch, chatroomId])

    useEffect(() => {
        setMessages(chatroomMessages)
    }, [messageObj])

    useEffect(scrollToBottom, [messageObj]);
    
    useEffect(() => {
        // open socket connection
        // create websocket
        socket = io();

        socket.on("chat", (chat) => {
            // let x = messages.slice(0, messages.length - 2) 
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
            owner_id: user.id,
        }

       let createdMsg = await dispatch(addMessageThunk(newMessage))
       
       if(createdMsg) {
            // let data = { user: createdMsg.owner, msg: createdMsg.message, sender: createdMsg.owner_id , id: createdMsg.id}
            socket.emit("chat", createdMsg);
        }
        setUpToDate(false)
        setMessage("")
    }



    if(!messageObj || !chatroomUser || !messagesEndRef) return null;
    return (
        <div className={classes.chatContainer}>
                <div className={classes.otherUsername}>
                    <img src={chatroomUser.profile_pic} alt={chatroomUser.username}/>
                    <p>{chatroomUser.username}</p>
                </div>
                <div className={classes.messageContainer}>
                {messages.length > 0 && messages.map((message, ind) => (
                <div key={ind} className={classes.messageWrapper}>
                    {message.owner_id === user.id  ?
                    <span className={classes.messageOwner}>{message.message}</span>
                    :
                    <span className={classes.otherUser}>{message.message}</span>

                }
                </div>
                ))}
                <div  ref={messagesEndRef} />
                </div>
                <form onSubmit={sendChat} className={classes.createMessage}>
                    <input
                        value={message}
                        onChange={updateMessage}
                        placeholder="Message..."
                    />
                    <button type="submit">Send</button>
                </form>
        </div>
    )
}