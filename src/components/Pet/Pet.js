import React, { Component } from 'react';
import PetfulApiService from '../../services/petful-api';

export default class Pet extends Component {
  state = {
    pet: {},
    update: false
  }

  componentDidMount() {
    this.getNextPet();
  }

  getNextPet = () => {
    this.props.title === 'Cat'
    ? PetfulApiService.getCats().then((res) => this.setState({ pet: res }))
    : PetfulApiService.getDogs().then((res) => this.setState({ pet: res }));
  }

  dequeueAndGetNext = () => {
    this.props.dequeue()
    .then(this.getNextPet)
  }

  renderAdoptButton = () => {
    return (
      this.props.adopt && (
        <button onClick={() => this.dequeueAndGetNext()}>Adopt Me!</button>
      )
    );
  }

  render() {
    console.log(this.state.update);
    const {
      age,
      breed,
      description,
      gender,
      imageURL,
      name,
      story,
    } = this.state.pet;
    return (
      <div>
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
