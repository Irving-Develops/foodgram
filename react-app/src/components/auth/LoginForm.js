import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, NavLink } from 'react-router-dom';
import { login } from '../../store/session';
import DemoUser from './Demo';
import './Login.css'

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

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div id="full-screen">
      <div id="login-container">
        <div id="login-image">
          <img src="https://www.instagram.com/static/images/homepage/phones/home-phones.png/1dc085cdb87d.png" alt="phone" />
        </div>
        <div id="login-form">
          <form onSubmit={onLogin} id="form">
            <div id="content">
              <h1>Foodgram</h1>
              <div>
                {errors.map((error, ind) => (
                  <div key={ind}>{error}</div>
                ))}
              </div>
              <div className='input-field'>
                <input
                  name='email'
                  type='text'
                  placeholder='Email'
                  value={email}
                  onChange={updateEmail}
                />
              </div>
              <div className='input-field'>
                <input
                  name='password'
                  type='password'
                  placeholder='Password'
                  value={password}
                  onChange={updatePassword}
                />
              </div>
              <div className='button-blue'>
                <button type='submit'>Login</button>
                <h4>OR</h4>
                <DemoUser />
              </div>

            </div>
          </form>
          <div id="sign-up">
            <span>Dont have an account? <NavLink to='/sign-up'>sign up</NavLink></span>
          </div>
        </div>
      </div>

    </div>
  );
};

export default LoginForm;
