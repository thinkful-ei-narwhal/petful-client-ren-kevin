import React, { Component } from 'react';
import PetfulApiService from '../../services/petful-api';
import AddForm from '../AddForm/AddForm';

export default class Adoption extends Component {
  state = {
    line: [],
  };
  componentDidMount() {
    PetfulApiService.getPeople().then((res) => this.setState({ line: res }));
  }
  renderLine = () => {
    return this.state.line.map((ind) => <li>{ind}</li>);
  };
  render() {
    return (
      <div>
        <h1>People waiting to Adopt:</h1>
        <ul>{this.renderLine()} </ul>
        <AddForm />
      </div>
    );
  }
}
