import React, {useEffect} from "react"
import { useDispatch } from "react-redux"
import { deletePostThunk } from "../../store/posts"

const DeletePost = (post) => {
    const dispatch = useDispatch()
    const handleDelete = async() => {
        await dispatch(deletePostThunk(post))
    }


    return (
        <button onClick={handleDelete}>Delete</button>
    )
}

export default DeletePost