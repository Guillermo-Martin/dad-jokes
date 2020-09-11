import React, { Component } from 'react';
import axios from 'axios';
import Joke from './Joke';

class JokeDisplay extends Component {
  state = {
    jokes: [],
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


  render() {
    return (
      <div>
        <Joke />
      </div>
    );
  }
}

export default JokeDisplay;

