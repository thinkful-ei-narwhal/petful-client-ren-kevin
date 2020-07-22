import React, { Component } from 'react';
import PetList from '../../components/PetList/PetList';
import People from '../../components/People/People';

export default class Adoption extends Component {
  render() {
    return (
      <div>
        <h1>Adoption</h1>
        <PetList />
        <People />
      </div>
    );
  }
}
