import React, {useEffect, useState} from "react"
import { useDispatch, useSelector } from "react-redux"
import { addLikeThunk, editPostThunk, removeLikeThunk } from "../../store/posts"
import classes from './Likes.module.css'


export default function Likes({post}){
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user.id)
    const posts = useSelector(state => state.posts)
    const [likeCount, setLikeCount] = useState(0)

    const updatedPost = Object.values(posts).filter(updatedP => updatedP.id === post.id)

    useEffect(() => {
        setLikeCount(post.likes.length)
    }, [post])


    const handleLike = async() => {
        if(post.likes.includes(sessionUser)){
           let unlike = await dispatch(removeLikeThunk(post))
        }else {
           let like = await dispatch(addLikeThunk(post))
        }
    }


    return (
        <div className={classes.likesContainer}>
            <button onClick={handleLike}>Like</button>
            <span>{likeCount}</span>
        </div>

    )
}