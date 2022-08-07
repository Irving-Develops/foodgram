import React, {useEffect, useState} from "react"
import { useDispatch } from "react-redux"
import { deleteCommentThunk } from "../../store/comments"

const DeleteComment = (comment, setShowModal) => {
    const dispatch = useDispatch()
    const [deleted, setDeleted] = useState(false)
    const handleDelete = async() => {
       let deletedComment =  await dispatch(deleteCommentThunk(comment))
        await setDeleted(true)
    }

    const close = () => {
        if(deleted) {
            setShowModal(false)
            setDeleted(false)
        }
    }


    return (
        <div onClick={close}>
            <button className='delete' onClick={handleDelete}>Delete</button>
        </div>
    )
}

export default DeleteComment