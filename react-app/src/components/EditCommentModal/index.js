import React, { useState } from 'react';
import { Modal } from "../context/Modal";
import EditComment from "../Comment/editComment";

function EditCommentModal({comment,featureObj}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>EditComment</button>
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
