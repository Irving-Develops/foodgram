import React, {useState} from "react"
import { useDispatch, useSelector } from "react-redux"
import { addLikeThunk, editPostThunk } from "../../store/posts"

export default function Likes({post}){
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user.id)

    const handleLike = async() => {
        if(post.likes.includes(sessionUser)){

        }else {
            console.log("working")
            dispatch(addLikeThunk(post))
        }
    }
    return (
        <button onClick={handleLike}>Like</button>
    )
}