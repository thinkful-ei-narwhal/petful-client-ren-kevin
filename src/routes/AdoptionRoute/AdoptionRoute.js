import React, { Component } from 'react';
import PetList from '../../components/PetList/PetList';
import People from '../../components/People/People';
import PetfulApiService from '../../services/petful-api';

export default class Adoption extends Component {
  state = {
    cat: {},
    dog: {},
    line: [],
    inLine: false,
    adopt: false,
    nextInLine: null,
    person: '',
  };
  componentDidMount() {
    PetfulApiService.getCats().then((cat) => this.setState({ cat: cat }));
    PetfulApiService.getDogs().then((dog) => this.setState({ dog: dog }));
    PetfulApiService.getPeople().then((res) => this.setState({ line: res }));
    PetfulApiService.getNextPerson().then((res) => this.setState({ nextInLine: res }))
    this.setAdopt()
  }
  
  setDog = () => {
    
  }

  setAdopt = () => {
    this.state.nextInLine = this.state.person && this.setState({ adopt: true })
  };
  setInLine = () => {
    this.setState({ inLine: !this.state.inLine });
  };
  setPerson = (name) => {
    this.setState({ person: name });
  };
  handleAdoption = () => {
    if (this.state.inLine) {
    }
  };

  render() {
    return (
      <div>
        <h1>Adoption</h1>
        <PetList adopt={this.state.adopt} cat={this.state.cat} dog={this.state.dog} get/>
        <People
          line={this.state.line}
          inLine={this.state.inLine}
          setInLine={this.setInLine}
          setPerson={this.setPerson}
        />
      </div>
    );
  }
}
/* Demo starts when user adds themselves to the line - trigger state change of inLine to true on submit
Timer for 5 seconds that will dequeue both the pets and the people and create a post of a new 'user' while inLine is true
When user reaches the front of the line, trigger state change of adopt to render adoption options and change inLine to false, ending the demo timer */
