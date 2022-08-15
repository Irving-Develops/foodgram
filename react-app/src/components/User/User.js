import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux'
import classes from './User.module.css'
import { Modal } from '../Context/Modal';
import { getPostsThunk } from '../../store/posts';
import { getUsersThunk } from '../../store/users'
import EditProfile from './EditProfilePic';
import AllComments from '../Comments/AllComments';

function User() {
  const dispatch = useDispatch()
  const { userId }  = useParams();
  const [showEditModal, setEditModal] = useState(false)
  const [showCommentModal2, setCommentModal2] = useState(false)
  const sessionUser = useSelector(state => state.session.user)
  const allUsers = useSelector(state => state.users)
  const posts = useSelector(state => state.posts)
  const user = Object.values(allUsers).filter(user => user.id === parseInt(userId))[0]

  let myPosts;
  if(posts){
    console.log(posts)
    myPosts = Object.values(posts).filter(post => post.owner.id === parseInt(userId))
  } 

  useEffect(() => {
    dispatch(getPostsThunk())
    dispatch(getUsersThunk())
  }, [dispatch])


  if (!user) return null;
  return (
    <div className={classes.userContainer}>

      <div className={classes.userDetails}>

        <div className={classes.userImg}>
          <img src={user.profile_pic} alt={user.username} />
        </div>

        <div className={classes.detailsWrapper}>
          
          <div className={classes.userHeader}>
            <h2>{user.username}</h2>
            <button onClick={() => setEditModal(true)}>Edit Profile</button>
          </div>

          {showEditModal && sessionUser.id === user.id &&  (
            <Modal className={classes.modalContainer} onClose={() => {
              setEditModal(false)
            }}>
              <div className={classes.modalHeader}>
                <button onClick={() => setEditModal(false)}>Cancel</button>
                <h3>Edit Profile Picture</h3>
              </div>

                <img src={user.profile_pic} alt={user.username} />
                <EditProfile user={user} setEditModal={setEditModal}/>
            </Modal>
          )}

          <div className={classes.postNum}>
            {myPosts.length === 0 ? 
            <span>{myPosts.length} posts</span>
            : myPosts.length === 1 ?
            <span>{myPosts.length} post</span>
            : 
            <span>{myPosts.length} posts</span>
            }
          </div>

          <span>{user.full_name}</span>

        </div>

      </div>


      <div className={classes.userPostsContainer}>
          {myPosts  && myPosts.map(post =>  (
            <div className={classes.imgWrapper} key={post.id}>
              <img src={post.img_url} alt="image" /> 
              <AllComments post={post} isSvg={false} isOverlay={true}/>
            </div>
          ))}
      </div>

    </div>

  );
}
export default User;
