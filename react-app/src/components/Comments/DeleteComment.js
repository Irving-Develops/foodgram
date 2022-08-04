import React, {useEffect} from "react"
import { useDispatch } from "react-redux"
import { deleteCommentThunk } from "../../store/comments"

const DeleteComment = (comment) => {
    const dispatch = useDispatch()
    const handleDelete = async() => {
        await dispatch(deleteCommentThunk(comment))
    }


    return (
        <button onClick={handleDelete}>Delete</button>
    )
}

export default DeleteComment