import React, { Component } from 'react';
import logo from './Park1.jpg';
import './header.css';


class Header extends Component {
  render() {
    return (
        <div className="Page-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>Parking Reservation System</h2>
        </div>
    );
  }
}

export default Header;