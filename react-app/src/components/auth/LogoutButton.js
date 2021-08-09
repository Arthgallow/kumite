import React from 'react';
import { useDispatch } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { logout } from '../../store/session';
import "./logoutButton.css"


const LogoutButton = () => {
  const history = useHistory();
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());
    history.push('/' );
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
