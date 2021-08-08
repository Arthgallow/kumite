import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import "./logoutButton.css"

const LogoutButton = () => {
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());
  };

  return (
    <>
    <div  onClick={onLogout} className="logout_btn">
        <img className="logout_icon"  src={"https://www.iconpacks.net/icons/2/free-exit-icon-2860-thumb.png"}></img>
        <h1 className="logout_label">Log Out</h1>
      </div>
    </>
  );
};

export default LogoutButton;
