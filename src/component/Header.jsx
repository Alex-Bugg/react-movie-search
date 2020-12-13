import React from 'react';
import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";
import Logo from '../assets/img/074194976b80c2f29725611704e513ac.svg'

const Header = () => {
  return (
      <header className="main_header">
        <div className="container">
          <div className="main_header-warp">
            <Link className="main_header-logo_wrap" to="/">
              <svg className="main_header-logo">
                <use href={Logo + '#logo'}></use>
              </svg>
              <p className="main_header-logo_name">Filmoteka</p>
            </Link>
            <nav className="main_header-nav">
              <ul className="main_header-list">
                <li>
                  <Link to="/" className="main_header-link">Home</Link>
                </li>
                <li>
                  <Link to="/profile" className="main_header-link">Profile</Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
  )
}

export default Header