import {NavLink} from 'react-router-dom'

function PostUser({post}) {
    return (
        <div class="user-container">
            <div class='user-img'>
                <img src='https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg' alt={post.owner.username}/>
            </div>
            <div class="username">
                <NavLink to={`/users/${post.owner.id}`}>{post.owner.username}</NavLink>
            </div>
        </div>
    )

}
    
    export default PostUser