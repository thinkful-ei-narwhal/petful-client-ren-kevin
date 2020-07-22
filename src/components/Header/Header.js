import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Header extends Component {
  render() {
    return (
      <nav className="Header">
        <h1>
          <Link to="/">Petful</Link>
        </h1>

        <Link to="/adoption">Adopt</Link>
      </nav>
    );
  }
}