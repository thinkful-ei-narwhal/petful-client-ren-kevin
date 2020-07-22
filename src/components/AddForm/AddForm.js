import React, { Component } from 'react';
import PetfulApiService from '../../services/petful-api';

export default class Adoption extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    const { name } = e.target;
    console.log(name.value);
    PetfulApiService.postPeople(name.value);
  };
  render() {
    return (
      <div>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <input className="name-input" name="name"></input>
          <button>Add to Line</button>
        </form>
      </div>
    );
  }
}
