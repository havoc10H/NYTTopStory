import React, { useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { API_URL } from './EnvironmentValues';
import './style.css';

function Login(props) {
  const [cookies, setCookie] = useCookies(['sessionId']);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const handleLogin = async (event) => {
    event.preventDefault();
    // Handle form submission
    try {
      const response = await axios.post(API_URL + '/login', { email, password });

      // Redirect to homepage or dashboard
      const { success, message } = response.data;
      if (success) {
        setCookie('sessionId', response, { path: '/' });
        props.toggleAuthenticate();
      } else {
        alert(message);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="form">
      <div className="form-body">
        <div className="email form-content">
          <label className="form__label" htmlFor="email">
            Email
          </label>
          <input
            className="form__input"
            type="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="password form-content">
          <label className="form__label" htmlFor="password">
            Password
          </label>
          <input
            className="form__input"
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button className="form__button" onClick={handleLogin}>
          Login
        </button>
        <button className="form__button" onClick={props.toggleForm}>
          Register
        </button>
      </div>
    </div>
  );
}

export default Login;