import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';

import NavHeader from './components/NavHeader';
import Register from './components/Register';
import Login from './components/Login';
import TopStories from './TopStories';

import { API_URL } from './components/EnvironmentValues';

function App() {

  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(['sessionId']);

  const toggleForm = () => {
    setShowRegisterForm(!showRegisterForm);
  };

  const toggleAuthenticate = () => {
    setAuthenticated(!authenticated);
  }

  useEffect(() => {
    const sessionId = cookies.sessionId;
    if (sessionId) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
  }, [cookies.sessionId]);

  const handleLogout = async (event) => {
    event.preventDefault();

    // Handle form submission
    try {
      const response = await axios.post(API_URL + '/logout', {});
      // Redirect to homepage or dashboard
      const { success, message } = response.data;
      console.log(response);
      if (success) {
        removeCookie('sessionId');
        setAuthenticated(false);
      } else {
        alert(message);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  
  return (
    <div>
      {authenticated ? (
        <>
          <NavHeader headerText="Top Posts" showLogout="show" handleLogout={handleLogout}></NavHeader>
          <TopStories></TopStories>
        </>
      ) : (
        <>
          {showRegisterForm ? (
            <>
              <NavHeader headerText="Register" showLogout="false"></NavHeader>
              <Register toggleForm={toggleForm} />
            </>
          ) : (
            <>
              <NavHeader headerText="Log in" showLogout="false"></NavHeader>
              <Login toggleForm={toggleForm} toggleAuthenticate={toggleAuthenticate} />
            </>
          )}
        </>
      )}
    </div>
  );
}

export default App;