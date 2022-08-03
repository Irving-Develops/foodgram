import React, {useState} from "react";
import {useDispatch} from 'react-redux'
import { editPostThunk } from "../../store/posts";


function EditPost({post}) {
    const dispatch = useDispatch()

    const [img_url, setImgUrl] = useState(null)
    const [caption, setCaption] = useState('')

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
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
              type="file"
              accept="image/*"
              onChange={updateImgUrl}
            />
            <input 
                type="text"
                name="caption"
                onChange={updateCaption}
                value={caption}
            />
            <button type="submit">Submit</button>
            {/* {(imageLoading)&& <p>Loading...</p>} */}
        </form>
    )

}

export default EditPost