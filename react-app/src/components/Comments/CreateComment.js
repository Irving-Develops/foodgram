import React, {useState} from "react";
import {useDispatch, useSelector} from 'react-redux'
import { addCommentThunk } from "../../store/comments";
import { Editor } from "@tinymce/tinymce-react";


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
        <form onSubmit={handleSubmit} className="create-comment-form">
            {/* <textarea
                type="text"
                name="comment_text"
                value={comment_text}
                placeholder="Add a comment..."
                onChange={updateCommentText}
            /> */}
                <Editor
                apiKey="qagffr3pkuv17a8on1afax661irst1hbr4e6tbv888sz91jc"
                init={{
                    plugins: "emoticons",
                    toolbar: "emoticons",
                    toolbar_location: "left",
                    menubar: false,
                    statusbar: false,
                    height: 40
                }}
                onChange={updateCommentText}
                value={comment_text}
                />
            <button type="submit">Submit</button>
        </form>
    )
}

export default CreateComment