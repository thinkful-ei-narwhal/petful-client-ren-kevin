import React, { Component } from 'react';

export default class Pet extends Component {
  renderAdoptButton = () => {
    return this.props.adopt && <button onClick={() => this.props.dequeue()}>Adopt Me!</button>
  }

  render() {
    console.log(this.props);
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
