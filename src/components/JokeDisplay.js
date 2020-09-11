import React, { Component } from 'react';
import axios from 'axios';
import Joke from './Joke';

class JokeDisplay extends Component {
  state = {
    jokes: [],
    score: 0
  }

  // make an API request when JokeDisplay renders
  async componentDidMount() {
    // for the GET request to respond with JSON , we have to pass in "headers" with the GET request
    try {

      // make the request 10 times; each time pushing the joke into the jokes state
      while (this.state.jokes.length < 10) {
        // make a request to get a joke
        let res = await axios.get("https://icanhazdadjoke.com/", { headers: { Accept: "application/json" } });
        let joke = res.data.joke;

        // push that joke into the jokes array in state
        this.setState(state => (
          { jokes: [...state.jokes, joke] }
        ));
      }

      // console.log(this.state.jokes);

    } catch (err) {
      console.log(err);
    }
  }

  // increment function
  handleIncrement = () => {
    this.setState(state => ({ score: state.score + 1}));
  }

  // decrement function
  handleDecrement = () => {
    this.setState(state => ({ score: state.score - 1}));
  }

  render() {

    // for every joke in the jokes array, render a joke component
    const jokesList = this.state.jokes.map(joke => (
      <Joke 
        text={joke}
        increment={this.handleIncrement}
        decrement={this.handleDecrement}
        score={this.state.score}
      />
    ));

    return (
      <div>
        <ul>
          {jokesList}
        </ul>
      </div>
    );
  }
}

export default JokeDisplay;

