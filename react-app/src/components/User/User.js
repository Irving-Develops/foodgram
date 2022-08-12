import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux'
import { editUserThunk } from '../../store/session';
import classes from './User.module.css'
import { getPostsThunk } from '../../store/posts';


function User() {
  const dispatch = useDispatch()
  const [user, setUser] = useState({});
  const { userId }  = useParams();
  const [profile_pic, setProfilePic] = useState()
  const sessionUser = useSelector(state => state.session.user.id)
  const posts = useSelector(state => state.posts)
  let myPosts;
  if(posts){
    console.log(Object.values(posts))
    myPosts = Object.values(posts).filter(post => post.owner.id === user.id)
  } 

      const updateImgUrl = (e) => {
        const img = e.target.files[0]
        setProfilePic(img)
    }

    const handleSubmit = async(e) => {

      if(user) {
        const editedUser = {
          id: user.id,
          full_name: user.full_name,
          email: user.email, 
          username: user.username,
          profile_pic,
        }
        console.log(editedUser, "edited user")
       let edit =  await dispatch(editUserThunk(editedUser))
        console.log(edit, "edit")
      }

    }
  useEffect(() => {
    dispatch(getPostsThunk())
  }, [dispatch])

  useEffect(() => {
    if (!userId) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      setUser(user);
    })();
  }, [userId]);

  if (!user) {
    return null;
  }


  return (
    <div className={classes.userContainer}>
      <div className={classes.userDetails}>
        <h2>{user.username}</h2>
        <img src={user.profile_pic} alt={user.username} />
        {sessionUser === user.id && (
          <form onSubmit={handleSubmit} >
                <input
                  type="file"
                  accept="image/*"
                  onChange={updateImgUrl}
                />
            <button>Update Image</button>
          </form>
        )}
        <h3>{user.full_name}</h3>
      </div>
      <div className={classes.userPostsContainer}>
          {myPosts  && myPosts.map(post => (
            <div className={classes.imgWrapper} key={post.id}>
              <img src={post.img_url} alt="image" /> 
            </div>
          ))}
      </div>

    </div>

  );
}
export default User;
