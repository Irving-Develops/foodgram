import React, {useEffect, useState} from "react"
import { useDispatch } from "react-redux"
import { deleteCommentThunk } from "../../store/comments"

const DeleteComment = ({comment, setDeleteModal, setShowButtons}) => {
    const dispatch = useDispatch()
    const [deleted, setDeleted] = useState(false)
    const handleDelete = async() => {
       let deletedComment =  await dispatch(deleteCommentThunk(comment))
        await setDeleted(true)
        setDeleteModal(false)
        setShowButtons(false)
    }

    return (
        <button className='delete' onClick={handleDelete} id="delete">Delete</button>
    )
}

export default DeleteComment