
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
          <div className="nav_bar_inner_left">
            <NavLink to={`/users/${sessionUser.id}`} exact={true} activeClassName='active'>
              Kumite
            </NavLink>
          </div>
          <div className="nav_bar_inner_center">
            <NavLink to='/fighters' exact={true} activeClassName='active'>
              Fighters
            </NavLink>

          </div>
          <div className="nav_bar_inner_right">
            <LogoutButton />
          </div>
      </nav>
    )
  }
  if(sessionUser === null) {
    return(
      <nav className="nav_bar">
        <div className="nav_bar_inner_left">

        </div>
        <div className="nav_bar_center">

        </div>
        <div className="nav_bar_inner_right">
        <LoginFormModal />
        <SignUpFormModal />
        </div>

      </nav>
    )
  }



}

export default NavBar;
