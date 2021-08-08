import React, { useState } from 'react';
import { Modal } from "../context/Modal";
import LoginForm from "../auth/LoginForm";
import "./loginFormModal.css"

function LoginFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="login_btn">
        <img className="login_icon"  src={"https://image.flaticon.com/icons/png/512/152/152533.png"}  onClick={() => setShowModal(true)}></img>
        <h1 className="login_label">Log in</h1>
      </div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <LoginForm  />
        </Modal>
      )}
    </>
  );
}

export default LoginFormModal;
