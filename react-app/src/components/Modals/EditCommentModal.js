import {useState} from 'react'
import { NavLink } from 'react-router-dom'
import { Modal } from '../Context/Modal'
import './ModalCss/DeleteModal.css'
import DeleteComment from '../Comments/DeleteComment'

export default function EditCommentModal({comment, setShowButtons}) {
        const [showEditModal, setEditModal] = useState(false)
        const [showDeleteModal, setDeleteModal] = useState(false)

        return (
        <div id='post-buttons'>
            <button className='delete' onClick={() => setDeleteModal(true) }>Delete</button>
            {showDeleteModal && (
                <Modal onClose={() => {
                    setDeleteModal(false)
                }}>
                    <div id="delete-post-modal">
                        <div id="delete-header">
                            <h5>Delete comment?</h5>
                            <p>Are you sure you want to delete this comment?</p>
                        </div>
                        <div id='post-modal-buttons'>
                            <button onClick={() => setDeleteModal(false)}>Cancel</button>
                            <DeleteComment comment={comment} setDeleteModal={setDeleteModal} setShowButtons={setShowButtons} />
                        </div>
                    </div>

                </Modal>
            )}
            <button onClick={() => setEditModal(true)}>Edit</button>
            {showEditModal && (
                <Modal onClose={() => {
                    setEditModal(false)
                }}>
                    <div id="edit-comment-modal">
                        <div id='head'>
                            <button id="cancel" onClick={() => setShowButtons(false)}>Cancel</button>
                            <span>Edit Post</span>
                            <div id="empty"></div>
                        </div>
                        <div id="edit-post-content">
                            <div className='post'>
                            </div>  
                            <div id="caption">
                                <div className="user-container" id="edit">
                                    <div className="user-img" id="user-img">
                                    </div>
                                    <div className="username">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>
            )}


            <button onClick={() => setShowButtons(false)}>Cancel</button>
        </div>
        )
}
