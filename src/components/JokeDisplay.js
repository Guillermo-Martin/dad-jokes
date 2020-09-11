import React, { Component } from 'react';
import Joke from './Joke';

class JokeDisplay extends Component {
  render() {
    return (
      <div>
        <Joke />
      </div>
    );
  }
}

export default JokeDisplay;