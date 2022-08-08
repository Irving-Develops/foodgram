import {NavLink} from 'react-router-dom'
import {useState} from 'react'
import { Modal } from '../Context/Modal';
import { useSelector } from 'react-redux';
import TimeSince from '../../TimeSince';
import EditCommentModal from '../Modals/EditCommentModal';

function CommentOwner({comment, showPic}) {

    const sessionUser = useSelector(state => state.session.user.id)
    const [showButtons, setShowButtons] = useState(false)

    console.log(showPic, "show pic?")

    return (
        <div className="comment-container" >
            <div id='main-line'>
                {!showPic && (
                <div className='user-img'>
                    <img src='https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg' alt={comment.owner.username}/>
                </div>
                )}
                <div id='comment-text'>
                    <NavLink to={`/users/${comment.owner.id}`}>{comment.owner.username}</NavLink>
                    <span>{comment.comment_text}</span>
                    <TimeSince date={comment.created_at} />
                </div>
                {sessionUser === comment.owner.id && !showButtons &&(
                    <div className='drop-down'>
                        <svg onClick={() => setShowButtons(true)} aria-label="More options" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><circle cx="12" cy="12" r="1.5"></circle><circle cx="6" cy="12" r="1.5"></circle><circle cx="18" cy="12" r="1.5"></circle></svg>
                    </div>
                    )}
                    {showButtons && (
                        <div id="user-profile-modal">   
                            <EditCommentModal comment={comment} setShowButtons={setShowButtons}/>
                        </div>
                    )}
            </div>
        </div>
    )

}
    
    export default CommentOwner