import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Hompage extends Component {
  render() {
    return (
      <div className="Homepage">
        <h1 className="welcome">Welcome to Petful Adoption Service</h1>
        <h3>Up for Adoption:</h3>
        <h3 className="process">How the Process Works:</h3>
        <p>
          In order to adopt one of our adorable pets your name must be added to
          the list of those looking to adopt. Please keep in mind, while you can
          view all our furry friends, only those up for immediate adoption will
          be available. We are a fair Adoption service that believe all pets
          should be given the chance for a loving home
        </p>
        <h4>
          Interested in bringing home a new family member? Click{' '}
          <Link className="adopt" to="/adoption">
            Adopt
          </Link>{' '}
          to begin the process.
        </h4>
      </div>
    );
  }
}
