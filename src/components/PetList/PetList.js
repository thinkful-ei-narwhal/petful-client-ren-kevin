import React, { Component } from 'react';
import PetfulApiService from '../../services/petful-api';
import Pet from '../Pet/Pet';

export default class PetList extends Component {
  render() {
    return (
      <div>
        <Pet title="Cat" dequeue={PetfulApiService.dequeueCats()} adopt={this.props.adopt} pet={this.props.cat} />
        <Pet title="Dog" dequeue={PetfulApiService.dequeueDogs()} adopt={this.props.adopt} pet={this.props.dog} />
      </div>
    );
  }
}
