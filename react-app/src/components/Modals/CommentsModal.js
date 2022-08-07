import {useState} from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import PostUser from '../Posts/PostOwner'
import './ModalCss/CommentsModal.css'

function CommentsModal({commentsArr, post}) {
        return (
            <div className='container'>
                <div className='post-img-container'>
                    <img src={post.img_url} alt="post"></img>
                </div>
                <div className='comments-container'>
                    <PostUser post={post} />
                    {commentsArr.map(comment => 
                        <p>{comment.comment_text}</p>
                    )}
                </div>
            </div>
        )

}

export default CommentsModal