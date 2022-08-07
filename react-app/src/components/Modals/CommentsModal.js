import {useState} from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import PostUser from '../Posts/PostOwner'
import CommentOwner from '../Comments/CommentOwner'
import './ModalCss/CommentsModal.css'

function CommentsModal({commentsArr, post}) {
        return (
            <div className='container'>
                <div className='post-img-container'>
                    <img src={post.img_url} alt="post"></img>
                </div>
                <div className='comments-container'>
                    <div id='post-owner'>
                        <PostUser post={post} />
                    </div>
                    <div id="empty-div-60">
                        test
                    </div>
                        {commentsArr.map(comment => 
                            <CommentOwner comment={comment} />
                        )}
                </div>
            </div>
        )

}

export default CommentsModal