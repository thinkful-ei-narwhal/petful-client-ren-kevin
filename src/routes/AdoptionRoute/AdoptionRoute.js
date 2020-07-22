import React, { Component } from 'react';
import PetList from '../../components/PetList/PetList';
import People from '../../components/People/People';
import PetfulApiService from '../../services/petful-api';

export default class Adoption extends Component {
  state = {
    cat: {},
    dog: {},
    line: [],
    inLine: true,
    adopt: false,
    person: 'Test',
    dequeueCat: true,
    dequeueDog: false,
  };
  componentDidMount() {
    PetfulApiService.getCats().then((res) => this.setState({ cat: res }));
    PetfulApiService.getDogs().then((res) => this.setState({ dog: res }));
    PetfulApiService.getPeople().then((res) => this.setState({ line: res }));
    setTimeout(this.handleDemo, 5000);
  }
  setLine = (person) => {
    this.setState({ line: [...this.state.line, person] });
  };
  setInLine = () => {
    this.setState({ inLine: !this.state.inLine });
  };
  setPerson = (name) => {
    this.setState({ person: name });
  };
  handleDemo = () => {
    console.log('triggering');
    if (this.state.inLine) {
      if (this.state.dequeueCat) {
        this.handleCatQueue();
        this.handleLineGeneration(this.state.line[0]);
      } else {
        this.handleDogQueue();
        this.handleLineGeneration(this.state.line[0]);
      }
    }
  };
  handleCatQueue = () => {
    PetfulApiService.dequeueCats().then(
      PetfulApiService.getCats().then((res) => this.setState({ cat: res }))
    );
    this.setState({ dequeueCat: false, dequeueDog: true });
    this.renderPetList();
  };
  handleDogQueue = () => {
    PetfulApiService.dequeueDogs()
      .then(PetfulApiService.getDogs())
      .then((res) => this.setState({ dog: res }));
    this.setState({ dequeueCat: true, dequeueDog: false });
  };
  handleLineGeneration = (name) => {
    PetfulApiService.postPeople({ person: name }).then(this.setLine(name));
  };
  renderPetList = () => {
    return <PetList cat={this.state.cat} dog={this.state.dog} />;
  };
  render() {
    return (
      <div>
        <h1>Adoption</h1>
        {this.renderPetList()}
        <People
          line={this.state.line}
          inLine={this.state.inLine}
          setInLine={this.setInLine}
          setPerson={this.setPerson}
          setLine={this.setLine}
        />
      </div>
    );
  }
}
/* Demo starts when user adds themselves to the line - trigger state change of inLine to true on submit
Timer for 5 seconds that will dequeue both the pets and the people and create a post of a new 'user' while inLine is true
When user reaches the front of the line, trigger state change of adopt to render adoption options and change inLine to false, ending the demo timer */
