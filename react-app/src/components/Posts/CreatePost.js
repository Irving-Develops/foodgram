import React, {useState} from "react";
import {useDispatch} from 'react-redux'
import { addPostThunk } from "../../store/posts";


function CreatePost({setCreateModal}) {
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

        const post = {
            img_url,
            caption
        }

        const newPost = await dispatch(addPostThunk(post))
        setCreateModal(false)
    }

    return (
        <form onSubmit={handleSubmit} id="create-post-form">
            <div>
                <input
                type="file"
                accept="image/*"
                onChange={updateImgUrl}
                />
            </div>
            <div>
                <textarea 
                    type="text"
                    name="caption"
                    placeholder="Add a caption..."
                    onChange={updateCaption}
                    value={caption}
                />
                <button type="submit">Submit</button>
            </div>
        </form>
    )

}

export default CreatePost