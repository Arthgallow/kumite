import React, { useState } from 'react';
import { Modal } from "../context/Modal";
import EditComment from "../Comment/editComment";
import "./Modal.css"

function EditCommentModal({comment,featureObj}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>

      <img className="edit_btn" src={"https://image.flaticon.com/icons/png/512/3388/3388943.png"}  onClick={() => setShowModal(true)}></img>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditComment
            comment={comment}
            featureObj={featureObj}
            hideForm={setShowModal}
          />
        </Modal>
      )}
    </>
  );
}

export default EditCommentModal;
