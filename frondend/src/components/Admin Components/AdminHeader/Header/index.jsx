import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faShoppingBasket,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import './Header.css';
import Navbar from './Navbar';
import Logout from '../../../Common Components/Logout';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const [activeMenu, setActiveMenu] = useState(false);
    const navigate = useNavigate();
  window.onscroll = () => {
    setActiveMenu(false);
  };
  const handleMenuButton = () => {
    setActiveMenu(!activeMenu);
  };
  const userName = localStorage.getItem('userName');
  return (
    <header className="header">
      <a href="/" className="logo">
        {/* <i>
          <FontAwesomeIcon icon={faShoppingBasket} />
        </i> */}
        <img
            className="p-1"
            src="/image/logo.png"
            width="40"
            height="40"
            style={{marginRight:"15px"}}
        ></img>
        BT-BOOKSTORE
      </a>
      <Navbar active={activeMenu} />
      <div className="icons">
        <button type="button" id="menu-btn" onClick={handleMenuButton}>
          <FontAwesomeIcon className="fa-icon" icon={faBars} />
        </button>
        {userName ?
          <div
            style={{
              display: 'flex',
              gap: '5px',
              alignItems: 'center',
              fontSize: '1.5rem',
              marginRight: '7px',
            }}
          >
            <FontAwesomeIcon className="fa-icon" icon={faUser} />
            <span>{userName}</span>
          </div>
          :
          ""
        }
        {userName ?
          <Logout />
          :
          <button style={{width:'7.5rem'}} onClick={() => { navigate("/login") }}>Login</button>
        }
      </div>
    </header>
  );
}
