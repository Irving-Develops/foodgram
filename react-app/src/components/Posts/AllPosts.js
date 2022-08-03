import React, {useEffect} from "react"
import {useDispatch, useSelector} from 'react-redux'
import { getPostsThunk } from "../../store/posts"
import CreatePost from "./CreatePost"
import EditPost from "./EditPost"
import DeletePost from "./DeletePost"
import './Posts.css'

function AllPosts(){
    const dispatch = useDispatch()
    const posts = useSelector(state => state.posts)
    let postsArr;
    
    if(posts){
       postsArr = Object.values(posts)
    }
    console.log(postsArr, "posts")

    useEffect(()=> {
        dispatch(getPostsThunk())
    }, [dispatch])

    if(!posts) return null
    return (
        <div className="post-container">
            {postsArr && postsArr.map(post => (
                <div className="post-wrapper" id={post.id}>
                    <div className="post"> 
                        <img src={post.img_url} alt="delicious platter" />
                    </div>
                    <div className="caption">
                        <p>{post.caption}</p>
                    </div>
                    <div className="button-container">
                        <EditPost post={post} />
                        <DeletePost post={post} />
                    </div>
                </div>
            ))}
            <CreatePost />
        </div>
    )
}

export default AllPosts