import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import "./signUpForm.css"

const SignUpForm = () => {
const type = [
"--Choose User Type--",
"Bystander",
"Fighter",
"Promoter"
]

  const [errors, setErrors] = useState([]);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [userImg, setUserImg] = useState('');
  // const [userType, setUserType] = useState(type[0]);

  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    let user_type = e.target.user_type.value;
    if(password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password, firstname, lastname, userImg, user_type));
      if (data) {
        setErrors(data)
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {

    setPassword(e.target.value);

  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  const updateFirstname = (e) => {
    setFirstname(e.target.value);
  };

  const updateLastname = (e) => {
    setLastname(e.target.value);
  };
  const updateUserImg = (e) => {
    setUserImg(e.target.value);
  };


  if (user) {
    return <Redirect to={`/users/${user.id}`} />;
  }
  console.log(errors)

  return (
    <form className="signup_form" onSubmit={onSignUp}>
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div className="greeting">
        <p>First rule of fight club? Tell your friends</p>
        <h1>Join the Club!</h1>
      </div>
      <div className="firstname_div">
        <label className="firstname_label">First Name</label>
        <input
          className="firstname_input"
          type="text"
          name="firstname"
          onChange={updateFirstname}
          value={firstname}/>
      </div>
      <div className="lastname_div">
        <label className="lastname_label">Last Name</label>
        <input
          className="lastname_input"
          type="text"
          name="lastname"
          onChange={updateLastname}
          value={lastname}/>
      </div>
      <div className="username_div" >
        <label className="username_label">User Name</label>
        <input
          className="username_input"
          type='text'
          name='username'
          onChange={updateUsername}
          value={username}
        ></input>
      </div>
      <div className="email_div">
        <label className="email_label">Email</label>
        <input
          className="email_input"
          type='text'
          name='email'
          onChange={updateEmail}
          value={email}
        ></input>
      </div>
      <div className="password_div">
        <label className="password_label">Password</label>
        <input
          className="password_input"
          type='password'
          name='password'
          onChange={updatePassword}
          value={password}
        ></input>
      </div>
      <div className="password_div">
        <label className="password_label">Repeat Password</label>
        <input
          className="password_input"
          type='password'
          name='repeat_password'
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={true}
        ></input>
      </div>
      <div className="profilePic_div">
        <lable className="profilePic_label">Profile Pic</lable>
        <input
          className="profilePic_input"
          type='text'
          name='profile_pic'
          onChange={updateUserImg}
          placeholder="Image Url"
          value={userImg}
        />
      </div>
      <div className="userType_div">
        <label className="userType_label">User Type</label>
        <select className="userType_select" name="user_type">
          <option value={1}>--Choose User Type--</option>
          <option value={1}>Bystander</option>
          <option value={2} >Fighter</option>
          <option value={3}>Promoter</option>
        </select>
      </div>
      <div className="signupBtn_box">
        <button style={{border:'none'}} className="loginForm_btn" type='submit'>
          <img className="signupForm_icon"  src={"https://image.flaticon.com/icons/png/128/748/748137.png"}  ></img>
          <h1 className="signupForm_label">Sign Up</h1>
        </button>
      </div>
    </form>
  );
};

export default SignUpForm;
