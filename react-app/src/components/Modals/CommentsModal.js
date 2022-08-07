import {useState} from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import PostUser from '../Posts/PostOwner'
import CommentOwner from '../Comments/CommentOwner'
import CreateComment from '../Comments/CreateComment'
import './ModalCss/CommentsModal.css'

function CommentsModal({commentsArr, post}) {
        return (
            <div className='container'>
                <div className='post-img-container'>
                    <img src={post.img_url} alt="post"></img>
                </div>
                <div id="comments-comp-container" >
                    <div id='post-owner'>
                        <PostUser post={post} />
                    </div>

                    <div className='comments-container'>
                            {commentsArr.map(comment => 
                                <CommentOwner comment={comment} />
                            )}
                    <div className="create-comment-container" id="create-in-modal">
                        <CreateComment postId={post.id} />
                    </div>
                    </div>

                </div>

            </div>
        )

}

export default CommentsModal