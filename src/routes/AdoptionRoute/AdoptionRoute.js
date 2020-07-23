import React, { Component } from 'react';
import PetList from '../../components/PetList/PetList';
import People from '../../components/People/People';
import PetfulApiService from '../../services/petful-api';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default class Adoption extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cat: {},
      dog: {},
      line: [],
      inLine: false,
      adopt: false,
      person: 'Test',
      nextInLine: null,
      dequeueCat: false,
      dequeueDog: false,
      show: false
    };
    this.timer = null;
  }

  componentDidMount() {
    this.getNextCat();
    this.getNextDog();
    PetfulApiService.getPeople().then((res) => this.setState({ line: res }));
    PetfulApiService.getNextPerson().then((res) => this.setState({ nextInLine: res }));
    this.setAdopt();
  }
  componentDidUpdate() {
    if (this.state.line[0] !== this.state.person) {
      if (this.timer === null && this.state.inLine === true) {
        this.timer = setInterval(() => {
          this.handlePetQueue();
          this.handleLineGeneration(this.state.line[0]);
        }, 6000);
        console.log('triggered1', this.state, this.timer);
      }
    }
    if (this.state.line[0] === this.state.person) {
      console.log('triggered2');
      clearInterval(this.timer);
      this.timer = null;
    }
  }
  getNextCat = () => {
    PetfulApiService.getCats().then((res) => {this.setState({ cat: res })});
  }
  getNextDog = () => {
    PetfulApiService.getDogs().then((res) => this.setState({ dog: res }));
  }
  setAdopt = () => {
    this.state.nextInLine === this.state.person && this.setState({ adopt: true });
  };
  toggleAdopt = () => {
    this.setState({ adopt: !this.state.adopt })
  }
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
          this.setCat();
          this.setDog();
        })
      );
    } else if (this.state.dequeueDog === true) {
      PetfulApiService.dequeueDogs().then(
        PetfulApiService.getDogs().then((res) => {
          this.setState({ dog: res });
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

  handleShow = () => {
    this.setState({ show: true })
  }

  handleClose = () => {
    this.setState({ show: false})
  }
  
  render() {
    return (
      <div>
        <h1>Adoption</h1>
        <PetList 
          toggleAdopt={this.toggleAdopt}
          getNextCat={this.getNextCat}
          getNextDog={this.getNextDog}
          adopt={true}
          cat={this.state.cat}
          dog={this.state.dog}
          handleShow={this.handleShow}
        />;

        <People
          line={this.state.line}
          inLine={this.state.inLine}
          setInLine={this.setInLine}
          setPerson={this.setPerson}
          setCat={this.setCat}
          setLine={this.setLine}
        />

        <Button variant="primary" onClick={this.handleShow}>
          Launch demo modal
        </Button>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Congrats!</Modal.Title>
          </Modal.Header>
          <Modal.Body>You just adopted a friend!</Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={this.handleClose}>
              Yay!
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
/* Demo starts when user adds themselves to the line - trigger state change of inLine to true on submit
Timer for 5 seconds that will dequeue both the pets and the people and create a post of a new 'user' while inLine is true
When user reaches the front of the line, trigger state change of adopt to render adoption options and change inLine to false, ending the demo timer */
