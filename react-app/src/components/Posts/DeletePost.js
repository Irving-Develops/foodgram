import React, {useState} from "react"
import { useDispatch } from "react-redux"
import { deletePostThunk } from "../../store/posts"

const DeletePost = ({post, setDeletedModal}) => {    
    const dispatch = useDispatch()
    const [deleted, setDeleted] = useState(false)
    // console.log(setShowModal)

    const handleDelete = async() => {
        let deletedPost =  await dispatch(deletePostThunk(post))
        await setDeleted(true)
        setDeletedModal(false)
        close()
    }

    const close = () => {
        if(deleted) {
            // setShowModal(false)
            setDeleted(false)
        }
    }

    // if(!post) return null
    return (
        <button style={{color: "red"}} onClick={handleDelete} >Delete</button>
    )
}

export default DeletePost