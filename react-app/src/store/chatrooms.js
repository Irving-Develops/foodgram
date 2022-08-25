const GET_CHATROOMS = 'chatrooms/GET_CHATROOMS'

export const getChatrooms = (chatrooms) => ({
    type: GET_CHATROOMS,
    chatrooms
})

export const getChatroomsThunk = () => async(dispatch) => {
    let res = await fetch('/api/chatrooms')

    if(res.ok) {
        const data = await res.json()
        dispatch(getChatrooms(data.chatrooms))
    }
}

export default function commentReducer(state = {}, action){
    let newState = {...state} 
    switch (action.type){
        case GET_CHATROOMS:
            action.chatrooms.forEach((chatroom) => newState[chatroom.id] = chatroom);
        return newState
    default:
        return state;
    }
}