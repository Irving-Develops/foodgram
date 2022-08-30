import React, {useEffect} from "react"
import {useDispatch, useSelector} from 'react-redux'
import {deleteMessageThunk } from "../../store/messages";


export default function DeleteMessage({message, socket, setMessages, chatroomId}){
    const dispatch = useDispatch()
    const messageObj = useSelector(state => state.messages)
    let chatroomMessages;
    if(messageObj) {
        chatroomMessages = Object.values(messageObj).filter(message => message.chatroom_id === chatroomId)
    }


    useEffect(() => {
        setMessages(chatroomMessages)
    }, [messageObj])



    useEffect(() => {
    // open socket connection
    // create websocket

    socket.on("chat", (message) => {
        // let x = messages.slice(0, messages.length - 2) 
        // if(messages) {
        setMessages(messages => [...messages])
        setMessages()
                // scrollToBottom()
    })

    // when component unmounts, disconnect
    return (() => {
        socket.disconnect()
    })
    }, [])

    const handleDelete = async() => {
        let deletedMessage = await dispatch(deleteMessageThunk(message))
        if(deletedMessage) {
            socket.emit("chat", deletedMessage)
        }
    }

    return (
        <button onClick={handleDelete}>Unsend</button>
    )

}