import {useState} from 'react'
import { NavLink } from 'react-router-dom'
import { Modal } from '../Context/Modal'
import './ModalCss/DeleteModal.css'
import DeleteComment from '../Comments/DeleteComment'

export default function EditCommentModal({comment, setShowModal}) {
        const [showEditModal, setEditModal] = useState(false)
        const [showDeleteModal, setDeleteModal] = useState(false)
        console.log(setShowModal, "show modal in edit comment")
        const setShowModal2 = setShowModal

        return (
        <div id='post-modal-buttons'>
            {/* <button className='delete' onClick={() => setDeleteModal(true) }>Delete</button> */}
            <DeleteComment comment={comment} setShowModal={setShowModal2} />
            <button onClick={() => setEditModal(true)}>Edit</button>
            {showEditModal && (
                <Modal onClose={() => {
                    setEditModal(false)
                    setShowModal(false)
                }}>
                    <div id="edit-post-modal">
                        <div id='head'>
                            <button id="cancel" onClick={() => setShowModal(false)}>Cancel</button>
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


            <button>Cancel</button>
        </div>
        )
}
