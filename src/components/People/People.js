import React, { Component } from 'react';
import PetfulApiService from '../../services/petful-api';
import AddForm from '../AddForm/AddForm';

export default class Adoption extends Component {
  renderLine = () => {
    return this.props.line.map((ind) => <li>{ind}</li>);
  };
  render() {
    return (
      <div>
        <h1>People waiting to Adopt:</h1>
        <ul>{this.renderLine()} </ul>
        <AddForm
          setInLine={this.props.setInLine()}
          setPerson={this.props.setPerson()}
        />
      </div>
    );
  }
}
