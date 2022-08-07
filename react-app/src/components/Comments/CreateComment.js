import React, {useState} from "react";
import {useDispatch, useSelector} from 'react-redux'
import { addCommentThunk } from "../../store/comments";
import Picker from 'emoji-picker-react';

function CreateComment(postId) {
    const dispatch = useDispatch()

    const [comment_text, setCommentText] = useState('')
    const user = useSelector(state => state.session.user.id)
    const [chosenEmoji, setChosenEmoji] = useState(null);


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

      const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);
  };

    return (
        <form onSubmit={handleSubmit} className="create-comment-form">
            <textarea
                type="text"
                name="comment_text"
                value={comment_text}
                placeholder="Add a comment..."
                onChange={updateCommentText}
            />
                <div>
      {chosenEmoji ? (
        <span>You chose: {chosenEmoji.emoji}</span>
      ) : (
        <span>No emoji Chosen</span>
      )}
      <Picker onEmojiClick={onEmojiClick} />
    </div>
            <button type="submit">Submit</button>
        </form>
    )
}

export default CreateComment