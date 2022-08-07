import React, {useState} from "react";
import {useDispatch} from 'react-redux'
import { editCommentThunk } from "../../store/comments";

function EditComment({comment}) {
    const dispatch = useDispatch();

    const [comment_text, setCommentText] = useState(comment.comment_text)

    const updateCommentText = (e) => {
        const comment = e.target.value
        setCommentText(comment)
    }

    const handleSubmit = async(e) => {
        e.preventDefault()

        const editedComment = {
            id: comment.id,
            comment_text,
            post_id: comment.post_id,
            user_id: comment.user_id
        }

        const newComment = await dispatch(editCommentThunk(editedComment))
    }

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text"
                name="comment_text"
                onChange={updateCommentText}
                value={comment_text}
            />
            <button type="submit">Edit</button>
        </form>
    )
}
export default EditComment