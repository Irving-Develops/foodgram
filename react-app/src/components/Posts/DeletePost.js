import React, {useEffect} from "react"
import { useDispatch } from "react-redux"
import { deletePostThunk } from "../../store/posts"

const DeletePost = (post, setShowModal) => {
    console.log("set modal in delete" , setShowModal)

    const dispatch = useDispatch()

    const handleDelete = async(e) => {
        e.preventDefault()

        setShowModal(false)
        const deletedPost = await dispatch(deletePostThunk(post))
    }


    return (
        <button  style={{color: "red"}} onClick={handleDelete}>Delete</button>
    )
}

export default DeletePost