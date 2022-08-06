import React, {useState} from "react";
import {useDispatch} from 'react-redux'
import { editPostThunk } from "../../store/posts";


function EditPost({post, setShowModal}) {
    const dispatch = useDispatch()

    console.log("set modal in edit" , setShowModal)
    const [img_url, setImgUrl] = useState(post.img_url)
    const [caption, setCaption] = useState(post.caption)

    console.log('edit img url', img_url)

    const updateImgUrl = (e) => {
        const img = e.target.files[0]
        setImgUrl(img)
    }
    const updateCaption = (e) => {
        const caption = e.target.value
        setCaption(caption)
    }

    const handleSubmit = async(e) => {
        e.preventDefault()

        const editedPost = {
            id: post.id,
            img_url,
            caption
        }

        const newPost = await dispatch(editPostThunk(editedPost))

        setShowModal(false)
    }

    return (
        <form onSubmit={handleSubmit}>
            {/* <input
              type="file"
              accept="image/*"
              onChange={updateImgUrl}
            /> */}
            <button type="submit">Done</button>
            <textarea 
                type="text"
                name="caption"
                placeholder="Write a caption..."
                onChange={updateCaption}
                value={caption}
            />
            {/* {(imageLoading)&& <p>Loading...</p>} */}
        </form>
    )

}

export default EditPost