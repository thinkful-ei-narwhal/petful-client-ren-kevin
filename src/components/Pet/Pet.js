import React, { Component } from 'react';
import PetfulApiService from '../../services/petful-api';
import Button from 'react-bootstrap/Button';
export default class Pet extends Component {
  state = {
    pet: {},
  };

  dequeueAndGetNext = () => {
    this.props
      .dequeue()
      .then(this.props.getNextPet)
      .then(this.props.handleShow)
      .then(this.props.toggleAdopt);
  };

  renderAdoptButton = () => {
    return (
      this.props.adopt && (
        <button onClick={() => this.dequeueAndGetNext()}>Adopt Me!</button>
      )
    );
  };

  render() {
    const {
      age,
      breed,
      description,
      gender,
      imageURL,
      name,
      story,
    } = this.props.pet;
    return (
      <div className="pet-container">
        <h1>{this.props.title}</h1>
        <h2>{name}</h2>
        <img src={imageURL} alt="pet"></img>
        <p>
          Breed: {breed} Gender:{gender} age:{age} Story:{story} Description:
          {description}
        </p>
        {this.renderAdoptButton()}
      </div>
    );
  }
}
// // "age": 3,
// "breed": "Golden Retriever",
// "description": "A smiling golden-brown golden retreiver listening to music.",
// "gender": "Male",
// "imageURL": "https://images.pexels.com/photos/33053/dog-young-dog-small-dog-maltese.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500",
// "name": "Zim",
// "story": "Owner Passed away"
