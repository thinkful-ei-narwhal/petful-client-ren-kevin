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
    person: '',
  };
  componentDidMount() {
    PetfulApiService.getCats().then((cat) => this.setState({ cat: cat }));
    PetfulApiService.getDogs().then((dog) => this.setState({ dog: dog }));
    PetfulApiService.getPeople().then((res) => this.setState({ line: res }));
  }

  setInLine = () => {
    this.setState((prev) => ({
      inLine: !prev,
    }));
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
        <PetList cat={this.state.cat} dog={this.state.dog} />
        <People
          line={this.state.line}
          setInLine={this.setInLine()}
          setPerson={this.setPerson()}
        />
      </div>
    );
  }
}
