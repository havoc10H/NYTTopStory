import axios from 'axios';
import React, { useState } from 'react';
import './style.css';
import { API_URL } from './EnvironmentValues';

function Register(props) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(API_URL + '/register', {
        firstName,
        lastName,
        email,
        password,
      });
      console.log(email);
      const { success, message } = response.data;
      if (success) {
        console.log("register: " + message);
        props.toggleForm();
      } else {
        console.log(message);
        alert(message);
      }
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  return (
    <div className="form">
      <div className="form-body">
        <div className="username form-content">
          <label className="form__label" htmlFor="firstName">
            First Name
          </label>
          <input
            className="form__input"
            type="text"
            id="firstName"
            placeholder="First Name"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
          />
        </div>
        <div className="username form-content">
          <label className="form__label" htmlFor="lastName">
            Last Name
          </label>
          <input
            className="form__input"
            type="text"
            id="lastName"
            placeholder="Last Name"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
          />
        </div>
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
        <button className="form__button" onClick={handleRegister}>
          Register
        </button>
        <button className="form__button" onClick={props.toggleForm}>
          Login
        </button>
      </div>
    </div>
  );
}

export default Register;