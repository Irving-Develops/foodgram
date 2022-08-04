import React, {useEffect} from "react"
import {useDispatch, useSelector} from 'react-redux'
import { getCommentsThunk } from "../../store/comments"
import CreateComment from "./CreateComment"

function AllComments({postId}) {
    const dispatch = useDispatch()
    const comments = useSelector(state => state.comments)

    let commentsArr;
    if(comments){
        commentsArr = Object.values(comments).filter(comment => comment.post_id === postId)
    }
    console.log(commentsArr, "comments Array")

    useEffect(() => {
        dispatch(getCommentsThunk())
    }, [dispatch])

    if(!comments) return null
    return (
        <div className="comment-wrapper">
            {commentsArr && commentsArr.map(comment => (
                <p id={comment.id}>{comment.comment_text}</p>
            ))}
        </div>
    )
}

export default AllComments