import React, { Component } from 'react';
import PetfulApiService from '../../services/petful-api';
import Pet from '../Pet/Pet';

export default class PetList extends Component {
  // state = {
  //   cat: {},
  //   dog: {}
  // }

  // componentDidMount() {
  //   this.getNextCat();
  //   this.getNextDog();
  // }

  // getNextCat = () => {
  //   console.log('run')
  //   PetfulApiService.getCats().then((res) => this.setState({ cat: res }));
  // }
  // getNextDog = () => {
  //   PetfulApiService.getDogs().then((res) => this.setState({ dog: res }));
  // }

  render() {
    return (
      <div>
        <Pet
          title="Cat"
          key='Cat'
          toggleAdopt={this.props.toggleAdopt}
          dequeue={PetfulApiService.dequeueCats}
          adopt={this.props.adopt}
          pet={this.props.cat}
          getNextPet={this.props.getNextCat}
        />
        <Pet
          title="Dog"
          key='Dog'
          setAdopt={this.props.setAdopt}
          dequeue={PetfulApiService.dequeueDogs}
          adopt={this.props.adopt}
          pet={this.props.dog}
          getNextPet={this.props.getNextDog}
        />
      </div>
    );
  }
}
