import React, {useEffect} from "react"
import { NavLink } from "react-router-dom"
import {useDispatch, useSelector} from 'react-redux'
import { getPostsThunk } from "../../store/posts"
import CreatePost from "./CreatePost"
import EditPost from "./EditPost"
import DeletePost from "./DeletePost"
import AllComments from "../Comments/AllComments"
import CreateComment from "../Comments/CreateComment"
import PostUser from "./PostUser"
import './Posts.css'

function AllPosts(){
    const dispatch = useDispatch()
    const posts = useSelector(state => state.posts)

    console.log("posts", posts)
    let postsArr;
    
    if(posts){
       postsArr = Object.values(posts)
    }

    useEffect(()=> {
        dispatch(getPostsThunk())
    }, [dispatch])


    if(!posts) return null
    return (
        <div className="post-container">
            {postsArr && postsArr.map(post => (
                <div className="post-wrapper" id={post.id}>
                    <PostUser post={post}/>
                    <div className="post"> 
                        <img src={post.img_url} alt="delicious platter" />
                    </div>
                    <div className="caption-container">
                        <NavLink to={`/user/${post.user_id}`} id='owner'>{post.owner.username} </NavLink><span id="caption">{post.caption}</span>
                    </div>
                    <div className="button-container">
                        <EditPost post={post} />
                        <DeletePost post={post} />
                    </div>
                    <div className="comments-container"> 
                        <AllComments postId={post.id} />
                    </div>
                    <div className="create-comment-container">
                        <CreateComment postId={post.id} />
                    </div>
                </div>
            ))}
            <CreatePost />
        </div>
    )
}

export default AllPosts