import React, { useState } from 'react';
import { Modal } from "../context/Modal";
import SignUpForm from "../auth/SignUpForm";
import "./signupFormModal.css"

function SignUpFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="signup_btn">
        <img className="signup_icon"  src={"https://image.flaticon.com/icons/png/128/748/748137.png"}  onClick={() => setShowModal(true)}></img>
        <h1 className="signup_label">Sign up</h1>
      </div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SignUpForm />
        </Modal>
      )}
    </>
  );
}

export default SignUpFormModal;
