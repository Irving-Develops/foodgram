import React, {useState} from "react";
import {useDispatch, useSelector} from 'react-redux'
import { addCommentThunk } from "../../store/comments";

function CreateComment(postId) {
    const dispatch = useDispatch()

    const [comment_text, setCommentText] = useState('')
    const user = useSelector(state => state.session.user.id)

    const updateCommentText = (e) => {
        const comment_text = e.target.value
        setCommentText(comment_text)
    }

    const handleSubmit = async(e) => {
        e.preventDefault()

        const comment = {
            comment_text,
            post_id: postId.postId,
            user_id: user
        }

        const newComment = await dispatch(addCommentThunk(comment))
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>Create a comment</label>
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