// const GET_USERS = 'users/GET_USERS'
// const ADD_USER = 'user/ADD_USER'
// const EDIT_USER = 'user/EDIT_USER'
// const DELETE_USER = 'user/DELETE_USER'

// const getUsers = (users) => ({
//     type: GET_USERS,
//     users
// })

// const editUser = (user) => ({
//   type: EDIT_USER,
//   user
// })
// export const getUsersThunk = () => async(dispatch) => {
//     const res = await fetch('/api/users')

//     if(res.ok) {
//         const data = await res.json()
//         dispatch(getUsers(data.users))
//     } else {
//       const err = await res.json();
//       throw err;
//     }

// }

// export const editUserThunk = (user) => async(dispatch) => {
//   const {profile_pic} = user
//   const formData = new FormData()
//   formData.append('profile_pic', profile_pic)

//   const res = await fetch(`/api/user/${user.id}`, {
//     method: 'PUT',
//     body: formData
//   })

//   if(res.ok) {
//     const user = await res.json();
//     dispatch(editUser(user))
//     return user
//   }

// }


// export default function userReducer(state = {}, action){
//     let newState = {...state}
//     switch (action.type) {
//         case GET_USERS:
//             action.users.forEach(user => newState[user.id] = user)
//             return newState
//         case EDIT_USER:
//             newState[action.user.id] = action.user
//             return newState
//         default:
//             return state;
//     }
// }