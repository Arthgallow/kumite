import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory, NavLink } from 'react-router-dom';
import { login } from '../../store/session';
import "./loginForm.css"

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);

    }

  };

  if (user) {
    return <Redirect to={`/fighters`} />;
  }

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };
  let demoLogin =()=>{
    document.querySelector('.email_input').value='demo@aa.io';
    document.querySelector('.password_input').value='password';
  }

  return (
    <form className="login_form" onSubmit={onLogin}>
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
        <div className="greeting">
          <h2>
            Welcom Back!
          </h2>
          <p>If you want to fight...</p>
          <h1 style={{fontFamily:"Permanent Marker"}}>Kumite!</h1>
        </div>
      <div className="email_div">
        <label className="email_label" htmlFor='email'>Email</label>
        <input
          className="email_input"
          name='email'
          type='text'
          placeholder='Email'
          value={email}
          onChange={updateEmail}
        />
      </div>
      <div className="password_div">
        <label className="password_label" htmlFor='password'>Password</label>
        <input
          className="password_input"
          name='password'
          type='password'
          placeholder='Password'
          value={password}
          onChange={updatePassword}
        />
      </div>
      <div className="loginBtn_box">
        <button style={{border:'none'}} className="loginForm_btn" type='submit'>
          <img className="loginForm_icon"  src={"https://image.flaticon.com/icons/png/512/152/152533.png"}  ></img>
          <h1 className="loginForm_label">Log in</h1>
        </button>

        <button style={{border:"none"}} className="demoUser_box" onClick={()=>{
          setEmail('demo@aa.io');
          setPassword('password');
        }} type='submit'>
          <img className="demoUser_icon" style={{border:"none"}} src={"https://image.flaticon.com/icons/png/128/266/266134.png"}  ></img>
          <h1 className="demoUser_label"> Demo User</h1>
        </button>

      </div>


    </form>
  );
};

export default LoginForm;
