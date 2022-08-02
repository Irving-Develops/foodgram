const GET_POSTS = 'posts/GET_POSTS'
const ADD_POST = 'posts/ADD_POST'
const EDIT_POST = 'posts/EDIT_POST'
const DELETE_POST = 'post/DELETE_POST'

export const getPosts = (posts) => ({
    type: GET_POSTS,
    posts
})

export const addPost = (post) => ({
    type: ADD_POST,
    post
})

export const editPost = (post) => ({
    type: EDIT_POST,
    post
})

export const deletePost = (post) => ({
    type: DELETE_POST,
    post
})

export const getPostsThunk = () => async(dispatch) => {
    const res = await fetch('/api/posts');

    if(res.ok) {
        const data = await res.json()
        dispatch(getPosts(data.posts))
    } else {
      const err = await res.json();
      throw err;
    }
}

export default function spotReducer(state = {}, action){
    let newState = {...state} 
    switch (action.type){
        case GET_POSTS:
        action.posts.forEach((post) => newState[post.id] = post);
        return newState
    default:
        return state;
    }
}