import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux'
import { editUserThunk } from '../../store/users';
import classes from './User.module.css'
import { getPostsThunk } from '../../store/posts';
import { getUsersThunk } from '../../store/users'


function User() {
  const dispatch = useDispatch()
  const { userId }  = useParams();
  const [profile_pic, setProfilePic] = useState()
  const [updated, setUpdated] = useState(false)
  const sessionUser = useSelector(state => state.session.user)
  const allUsers = useSelector(state => state.users)
  const posts = useSelector(state => state.posts)
  const user = Object.values(allUsers).filter(user => user.id === parseInt(userId))[0]
  console.log(user, "user")

  let myPosts;
  if(posts){
    console.log(posts)
    myPosts = Object.values(posts).filter(post => post.owner.id === parseInt(userId))
    console.log(myPosts, "posts")
  } 

      const updateImgUrl = (e) => {
        const img = e.target.files[0]
        setProfilePic(img)
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
      // if(user) {
        const editedUser = {
          id: user.id,
          full_name: user.full_name,
          email: user.email, 
          username: user.username,
          profile_pic,
        }

       let edit =  await dispatch(editUserThunk(editedUser))
       if(edit) setUpdated(true)

    }

    // useEffect(() => {
    //   setUpdated(true)
    // }, [user.profile_pic])



  useEffect(() => {
    dispatch(getPostsThunk())
    dispatch(getUsersThunk())
    setUpdated(true)
  }, [dispatch])

  // useEffect(() => {
  //   if (!userId) {
  //     return;
  //   }
  //   (async () => {
  //     const response = await fetch(`/api/users/${userId}`);
  //     const user = await response.json();
  //     setUser(user);
  //   })();
  // }, [userId]);

  console.log(user)

  if (!user || !updated) return null;
  return (
    <div className={classes.userContainer}>

      <div className={classes.userDetails}>

        {/* {user &&( */}
        <div className={classes.userImg}>
          <img src={user.profile_pic} alt={user.username} />
        </div>

        {/* )} */}

        <div className={classes.detailsWrapper}>
          
          <div className={classes.userHeader}>
            <h2>{user.username}</h2>
            <button>Edit Profile</button>
          </div>

          {sessionUser.id === user.id && (
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
