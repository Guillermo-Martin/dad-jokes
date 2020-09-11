import React, { Component } from 'react';
import axios from 'axios';
import Joke from './Joke';

class JokeDisplay extends Component {

  // make an API request when JokeDisplay renders


  render() {
    return (
      <div>
        <Joke />
      </div>
    );
  }
}

export default JokeDisplay;

