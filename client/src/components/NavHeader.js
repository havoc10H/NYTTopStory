import React, { useState, useContext } from 'react';

import './style.css';

function NavHeader(props) {

  return (
    <header className='header-style'>
      <div className='width-100'></div>
      <h1>{props.headerText}</h1>      
      <div className='width-100 header-div'>
      {props.showLogout == "show" ? (
        <button className='header-btn' onClick={props.handleLogout}>Logout</button>
      ):null}
      </div>      
    </header>
  );
}

export default NavHeader;