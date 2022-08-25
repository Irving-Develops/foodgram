import React, {useEffect, useState} from "react"
import {useDispatch, useSelector} from 'react-redux'
import { getChatroomsThunk } from "../../store/chatrooms"
import { getUsersThunk } from "../../store/users"
import TimeSince from "../../TimeSince"
import classes from './Chatroom.module.css'

export default function Chatrooms(){
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)
    const chatrooms = useSelector(state => state.chatrooms)
    const users = useSelector(state => state.users)
    let myChatrooms;
    let myChatArray;

    if(chatrooms){
        myChatrooms = Object.values(chatrooms).filter(room => {
            if(room.creator_id === sessionUser.id || room.receiver_id === sessionUser.id){
                return true
            }
        })
        
        myChatArray = Object.values(myChatrooms)

        myChatArray.map(room => {
            if(room.creator_id === sessionUser.id){
                room.otherUser = users[room.receiver_id]
            }else{
                room.otherUser = users[room.creator_id]
            }
        })
    }

    console.log(myChatArray)

    useEffect(() => {
        dispatch(getChatroomsThunk())
        dispatch(getUsersThunk())
    }, [dispatch])

    if(!myChatArray) return null
    return (
        <div className={classes.chatContainer}>

            <div className={classes.usersContainer}>

                <div className={classes.sessionUser}>
                    <p>{sessionUser.username}</p>
                </div>

                <div className={classes.otherUsers}>
                    {myChatArray.length > 0 && myChatArray.map(chatroom => (
                        
                        <div className={classes.eachUser} key={chatroom.id}>
                            {chatroom.otherUser ? 
                            <div className={classes.userContainer}>
                                <div className={classes.userImg}>
                                    <img src={chatroom.otherUser.profile_pic} alt={chatroom.otherUser.username}/>
                                </div>
                                <div className={classes.msgDetails}>
                                    <p>{chatroom.otherUser.username}</p>
                                    <p>{chatroom.messages[chatroom.messages.length - 1].message}</p>
                                    <TimeSince date={chatroom.messages[chatroom.messages.length - 1].created_at} />
                                </div>
                            </div>
                            :
                            <img src="static/loading.svg" alt="loading" />
                            }
                        </div>
                    ))}
                </div>

            </div>
        </div>
    )
}