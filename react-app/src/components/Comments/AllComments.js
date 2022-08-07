import React, {useEffect, useState} from "react"
import {useDispatch, useSelector} from 'react-redux'
import { getCommentsThunk } from "../../store/comments"
import CreateComment from "./CreateComment"
import DeleteComment from "./DeleteComment"
import EditComment from "./EditComment"
import './Comments.css'
import { Modal } from "../Context/Modal"
import CommentsModal from "../Modals/CommentsModal"
import TimeSince from "../../TimeSince"

function AllComments({post}) {
    const dispatch = useDispatch()
    const comments = useSelector(state => state.comments)
    const [showCommentModal, setCommentModal] = useState(false)
    const [showDeleteModal, setDeleteModal] = useState(false)

    
    let commentsArr;
    let commentCount
    if(comments){
        commentsArr = Object.values(comments).filter(comment => comment.post_id === post.id)
        commentCount = commentsArr.length
    }

    useEffect(() => {
        dispatch(getCommentsThunk())
    }, [dispatch])

    if(!comments) return null
    return (
        <div className="comment-container">
            {commentCount > 0 && (
                <p onClick={() => setCommentModal(true)}>view all {commentCount} comments</p>
            )}
            {showCommentModal && (
                <Modal onClose={() => setCommentModal(false)}>
                    <CommentsModal commentsArr={commentsArr} post={post}/>
                </Modal>
            )}
            {commentsArr && commentsArr.slice(0).reverse().map(comment => (
                <div className="comment-wrapper">
                    <p id={comment.id}>{comment.comment_text}</p>
                    <TimeSince date={comment.created_at} />
                    <EditComment comment={comment} />
                    <DeleteComment comment={comment} />
                </div>
            ))}
        </div>
    )
}


export default AllComments