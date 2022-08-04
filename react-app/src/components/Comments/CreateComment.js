import React, {useState} from "react";
import {useDispatch} from 'react-redux'
import { addCommentThunk } from "../../store/comments";

function CreateComment(postId) {
    const dispatch = useDispatch()

    const [comment_text, setCommentText] = useState('')

    const updateCommentText = (e) => {
        const comment_text = e.target.value
        setCommentText(comment_text)
    }

    const handleSubmit = async(e) => {
        e.preventDefault()

        const comment = {
            comment_text,
            post_id: postId
        }

        const newComment = await dispatch(addCommentThunk(comment))
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="comment_text"
                value={comment_text}
                onChange={updateCommentText}
            />
            <button type="submit">Submit</button>
        </form>
    )
}

export default CreateComment