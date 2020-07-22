import React, { Component } from 'react';
import PetfulApiService from '../../services/petful-api';
import Pet from '../Pet/Pet';

export default class PetList extends Component {
  render() {
    console.log(this.state);
    return (
      <div>
        <Pet title="Cat" adopt={this.props.adopt} pet={this.props.cat} />
        <Pet title="Dog" adopt={this.props.adopt} pet={this.props.dog} />
      </div>
    );
  }
}
