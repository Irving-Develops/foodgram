import React, {useEffect} from "react"
import {useDispatch, useSelector} from 'react-redux'
import { getCommentsThunk } from "../../store/comments"
import CreateComment from "./CreateComment"
import DeleteComment from "./DeleteComment"
import EditComment from "./EditComment"
import './Comments.css'

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
        <div className="comment-container">
            {commentsArr && commentsArr.map(comment => (
                <div className="comment-wrapper">
                    <p id={comment.id}>{comment.comment_text}</p>
                    <EditComment comment={comment} />
                    <DeleteComment comment={comment} />
                </div>
            ))}
        </div>
    )
}

export default AllComments