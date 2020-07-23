import React, { Component } from 'react';
import PetList from '../../components/PetList/PetList';
import People from '../../components/People/People';
import PetfulApiService from '../../services/petful-api';
import './AdoptionRoute.css';

export default class Adoption extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cat: {},
      dog: {},
      line: [],
      inLine: false,
      adopt: false,
      person: '',
      nextInLine: null,
      dequeueCat: false,
      dequeueDog: false,
    };
    this.timer = null;
  }

  componentDidMount() {
    this.getNextCat();
    this.getNextDog();
    PetfulApiService.getPeople().then((res) => this.setState({ line: res }));
    PetfulApiService.getNextPerson().then((res) =>
      this.setState({ nextInLine: res })
    );
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.nextInLine !== this.state.person) {
      if (this.timer === null && this.state.inLine === true) {
        this.timer = setInterval(() => {
          this.handlePetQueue();
          this.handleLineGeneration(this.state.line[0]);
        }, 6000);
      }
    }
    if (this.state.nextInLine === this.state.person && this.timer !== null) {
      console.log('triggered', this.state);
      clearInterval(this.timer);
      this.timer = null;
      if (prevState.adopt !== true) {
        this.toggleAdopt();
      }
    }
  }
  getNextCat = () => {
    PetfulApiService.getCats().then((res) => {
      this.setState({ cat: res });
    });
  };
  getNextDog = () => {
    PetfulApiService.getDogs().then((res) => this.setState({ dog: res }));
  };
  setAdopt = () => {
    this.state.nextInLine === this.state.person &&
      this.setState({ adopt: true });
  };
  toggleAdopt = () => {
    this.setState({ adopt: !this.state.adopt });
  };
  setLine = (person) => {
    this.setState({ line: [...this.state.line, person] });
  };
  setInLine = () => {
    this.setState({ inLine: !this.state.inLine });
  };
  setCat = () => {
    this.setState({ dequeueCat: !this.state.dequeueCat });
  };
  setDog = () => {
    this.setState({ dequeueDog: !this.state.dequeueDog });
  };
  setPerson = (name) => {
    this.setState({ person: name });
  };
  handlePetQueue = () => {
    if (this.state.dequeueCat === true) {
      PetfulApiService.dequeueCats().then(
        PetfulApiService.getCats().then((res) => {
          this.setState({ cat: res });
          PetfulApiService.getNextPerson().then((res) =>
            this.setState({ nextInLine: res })
          );
          this.setCat();
          this.setDog();
        })
      );
    } else if (this.state.dequeueDog === true) {
      PetfulApiService.dequeueDogs().then(
        PetfulApiService.getDogs().then((res) => {
          this.setState({ dog: res });
          PetfulApiService.getNextPerson().then((res) =>
            this.setState({ nextInLine: res })
          );
          this.setCat();
          this.setDog();
        })
      );
    }
  };
  handleLineGeneration = (name) => {
    PetfulApiService.postPeople({ person: name }).then(
      PetfulApiService.getPeople().then((res) => this.setState({ line: res }))
    );
  };
  renderAdopt = () => {
    return (
      <div>
        {this.state.adopt === true && (
          <div>You're up! Time to choose your new best friend!</div>
        )}
      </div>
    );
  };

  render() {
    return (
      <div className="adoption-container">
        <h1>Adoption</h1>
        <PetList
          toggleAdopt={this.toggleAdopt}
          getNextCat={this.getNextCat}
          getNextDog={this.getNextDog}
          adopt={this.state.adopt}
          cat={this.state.cat}
          dog={this.state.dog}
        />
        ;
        <People
          line={this.state.line}
          inLine={this.state.inLine}
          setInLine={this.setInLine}
          setPerson={this.setPerson}
          setCat={this.setCat}
          setLine={this.setLine}
        />
      </div>
    );
  }
}
/* Demo starts when user adds themselves to the line - trigger state change of inLine to true on submit
Timer for 5 seconds that will dequeue both the pets and the people and create a post of a new 'user' while inLine is true
When user reaches the front of the line, trigger state change of adopt to render adoption options and change inLine to false, ending the demo timer */
