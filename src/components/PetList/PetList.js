import React, { Component } from 'react';
import PetfulApiService from '../../services/petful-api';
import Pet from '../Pet/Pet';

export default class PetList extends Component {
  state = {
    cat: {},
    dog: {},
  };
  componentDidMount() {
    PetfulApiService.getCats().then((cat) => this.setState({ cat: cat }));
    PetfulApiService.getDogs().then((dog) => this.setState({ dog: dog }));
  }

  render() {
    console.log(this.state);
    return (
      <div>
        <Pet title="Cat" pet={this.state.cat} />
        <Pet title="Dog" pet={this.state.dog} />
      </div>
    );
  }
}
