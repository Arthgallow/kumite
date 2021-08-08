
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
            <NavLink className="nav_bar_inner_left_inner" style={{textDecoration:'none' , color:'black'}} to={`/users/${sessionUser.id}`} exact={true} activeClassName='active'>
              <h1 className="home_name">Kumite!</h1>
              <img className="home_icon"  src={"https://image.flaticon.com/icons/png/512/25/25694.png"}/>
            </NavLink>
          </div>
          <div className="nav_bar_inner_center">
            <div className="nav_bar_inner_center_left">
              <NavLink style={{textDecoration:'none', color:'black'}} to='/users' exact={true} activeClassName='active'>
                Fighters
              </NavLink>
            </div>
            <div className="nav_bar_inner_center_right">
              <NavLink style={{textDecoration:'none', color:'black'}} to='/fights' exact={true} activeClassName='active'>
                Fights
              </NavLink>
            </div>
          </div>
          <div className="nav_bar_inner_right">
          <div className="nav_bar_inner_right_in">

          </div>
          <div className="nav_bar_inner_right_out">
            <LogoutButton />
          </div>
          </div>
      </nav>
    )
  }
  if(sessionUser === null) {
    return(
      <nav className="nav_bar">
        <div className="nav_bar_inner_left">
          Kumite!
        </div>
        <div className="nav_bar_center">

        </div>
        <div className="nav_bar_inner_right">
          <div className="nav_bar_inner_right_in">
            <LoginFormModal />
          </div>
          <div className="nav_bar_inner_right_out">
            <SignUpFormModal />
          </div>
        </div>

      </nav>
    )
  }



}

export default NavBar;
