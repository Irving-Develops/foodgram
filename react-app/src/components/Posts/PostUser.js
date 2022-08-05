import {NavLink} from 'react-router-dom'
import {useState} from 'react'
import { Modal } from '../Context/Modal';
import PostModal from '../Modals/PostModal'

function PostUser({post}) {
  const [showModal, setShowModal] = useState(false);


    return (
        <div class="user-container">
            <div class='user-img'>
                <img src='https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg' alt={post.owner.username}/>
            </div>
            <div class="username">
                <NavLink to={`/users/${post.owner.id}`}>{post.owner.username}</NavLink>
            </div>
            <div className='drop-down'>
                <svg onClick={() => setShowModal(true)} aria-label="More options" class="_ab6-" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><circle cx="12" cy="12" r="1.5"></circle><circle cx="6" cy="12" r="1.5"></circle><circle cx="18" cy="12" r="1.5"></circle></svg>
            </div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <div id="user-profile-modal">   
                        <PostModal />
                    </div>
                </Modal>
            )}
        </div>
    )

}
    
    export default PostUser