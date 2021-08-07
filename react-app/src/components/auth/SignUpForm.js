import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';

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
    <form onSubmit={onSignUp}>
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div>
        <label>First Name</label>
        <input
          type="text"
          name="firstname"
          onChange={updateFirstname}
          value={firstname}/>
      </div>
      <div>
        <label>Last Name</label>
        <input
          type="text"
          name="lastname"
          onChange={updateLastname}
          value={lastname}/>
      </div>
      <div>
        <label>User Name</label>
        <input
          type='text'
          name='username'
          onChange={updateUsername}
          value={username}
        ></input>
      </div>
      <div>
        <label>Email</label>
        <input
          type='text'
          name='email'
          onChange={updateEmail}
          value={email}
        ></input>
      </div>
      <div>
        <label>Password</label>
        <input
          type='password'
          name='password'
          onChange={updatePassword}
          value={password}
        ></input>
      </div>
      <div>
        <label>Repeat Password</label>
        <input
          type='password'
          name='repeat_password'
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={true}
        ></input>
      </div>
      <div>
        <lable>Profile Pic</lable>
        <input
          type='text'
          name='profile_pic'
          onChange={updateUserImg}
          placeholder="Image Url"
          value={userImg}
        />
      </div>
      <div>
      {/* <select
        value={color}
        onChange={(e)=>setColor(e.target.value)}
        >
          {COLORS.map(color => (
            <option
              key={color}
            >
              {color}
            </option>
          ))}
        </select> */}
        <label>User Type</label>
        <select name="user_type">
          <option value={1}>--Choose User Type--</option>
          <option value={1}>Bystander</option>
          <option value={2} >Fighter</option>
          <option value={3}>Promoter</option>
        </select>
      </div>
      <button type='submit'>Sign Up</button>
    </form>
  );
};

export default SignUpForm;
