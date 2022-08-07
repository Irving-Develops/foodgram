import React, {useEffect} from "react"
import { useDispatch } from "react-redux"
import { deletePostThunk } from "../../store/posts"

const DeletePost = (post, setShowModal) => {

    
    const dispatch = useDispatch()

    const handleDelete = async(e) => {
        e.preventDefault()
        let deleted =  await dispatch(deletePostThunk(post))
        if(deleted) window.alert("Post has been deleted")
    }

    if(!post) return null
    return (
            <button style={{color: "red"}} onClick={handleDelete} >Delete</button>
    )
}

export default DeletePost