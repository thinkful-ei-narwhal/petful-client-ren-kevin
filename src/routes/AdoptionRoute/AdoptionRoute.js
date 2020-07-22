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
    person: 'Test',
    nextInLine: null,
    dequeueCat: false,
    dequeueDog: false,
  };

  componentDidMount() {
    PetfulApiService.getCats().then((res) => this.setState({ cat: res }));
    PetfulApiService.getDogs().then((res) => this.setState({ dog: res }));
    PetfulApiService.getPeople().then((res) => this.setState({ line: res }));
    PetfulApiService.getNextPerson().then((res) =>
    this.setState({ nextInLine: res })
    );
    this.setAdopt();
  }
  setAdopt = () => {
    this.state.nextInLine = this.state.person && this.setState({ adopt: true });
  };
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
    if (this.state.dequeueCat) {
      this.handleCatQueue();
      this.handleLineGeneration(this.state.nextInLine);
    } else {
      this.handleDogQueue();
      this.handleLineGeneration(this.state.nextInLine);
    }
  };
  handleCatQueue = () => {
    PetfulApiService.dequeueCats().then(
      PetfulApiService.getCats().then((res) => this.setState({ cat: res }))
    );
    this.setState({ dequeueCat: false, dequeueDog: true });
    console.log(this.state);
  };
  handleDogQueue = () => {
    PetfulApiService.dequeueDogs().then(
      PetfulApiService.getDogs().then((res) => this.setState({ dog: res }))
    );
    this.setState({ dequeueCat: true, dequeueDog: false });
  };
  handleLineGeneration = (name) => {
    PetfulApiService.postPeople({ person: name }).then(
      PetfulApiService.getPeople().then((res) => this.setState({ line: res }))
    );
  };
  renderDemo = () => {
    if (this.state.inLine) {
      setInterval(this.handleDemo, 5000);
    }
  };
  render() {
    return (
      <div>
        <h1>Adoption</h1>
        {/* {this.renderDemo()} */}
        <PetList cat={this.state.cat} dog={this.state.dog} />;
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
