
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
  console.log("WHO AM I??", sessionUser);
  console.log("True?", sessionUser !== null);
  console.log("False", sessionUser === null);
  if(sessionUser !== null) {
    return(
      <nav className="nav_bar">

      </nav>
    )
  }
  if(sessionUser === null) {
    return(
      <nav className="nav_bar">

      </nav>
    )
  }


  return (
    <nav>
      <ul>
        <li>
          <NavLink to='/' exact={true} activeClassName='active'>
            Home
          </NavLink>
        </li>
        <li>
          <LoginFormModal />
        </li>
        <li>
          <SignUpFormModal />
        </li>
        <li>
          <NavLink to='/users' exact={true} activeClassName='active'>
            Users
          </NavLink>
        </li>
        <li>
          <LogoutButton />
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
