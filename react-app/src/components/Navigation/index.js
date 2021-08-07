
import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import SignUpForm from '../auth/SignUpForm';
import LoginFormModal from '../LoginFormModal';
import SignUpFormModal from '../SignupFormModal';
import "./Navigation.css"

const NavBar = () => {
  let sessionUser = useSelector(state => state.session.user);
  if(sessionUser !== null) {
    return(
      <nav className="nav_bar">
          <NavLink to={`/users/${sessionUser.id}`} exact={true} activeClassName='active'>
            Kumite
          </NavLink>
          <NavLink to='/fighters' exact={true} activeClassName='active'>
            Fighters
          </NavLink>
          <LogoutButton />
      </nav>
    )
  }
  if(sessionUser === null) {
    return(
      <nav className="nav_bar">
        <LoginFormModal />
        <SignUpFormModal />

      </nav>
    )
  }



}

export default NavBar;
