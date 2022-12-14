import React, {useEffect, useState} from "react"
import {useDispatch, useSelector} from 'react-redux'
import { getCommentsThunk } from "../../store/comments"
import './Comments.css'
import { Modal } from "../Context/Modal"
import CommentsModal from "../Modals/CommentsModal"
import CommentOwner from "./CommentOwner"

function AllComments({post}) {
    const dispatch = useDispatch()
    const comments = useSelector(state => state.comments)
    const sessionUser = useSelector(state => state.session.user.id)
    const [showCommentModal, setCommentModal] = useState(false)
    let showPic = true;

    let myComments;
    let commentsArr;
    let commentCount;

    if(comments){
        commentsArr = Object.values(comments).filter(comment => comment.post_id === post.id)
        commentCount = commentsArr.length
        myComments = commentsArr.filter(comments => comments.owner.id === sessionUser)
    }

    useEffect(() => {
        dispatch(getCommentsThunk())
    }, [dispatch])

    if(!comments) return null
    return (
        <div id="view-comments">
            {commentCount > 0 && (
                <p onClick={() => setCommentModal(true)}>view all {commentCount} comments</p>
            )}
            {showCommentModal && (
                <Modal onClose={() => setCommentModal(false)}>
                    <CommentsModal commentsArr={commentsArr} post={post}/>
                </Modal>
            )}
            <div className="comments-container">
                {myComments && myComments.map(comment => 
                    <CommentOwner key={comment.id} comment={comment} showPic={showPic}/>
                )}
            </div>
        </div>
    )
}


export default AllComments