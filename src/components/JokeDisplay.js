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
      // create an array that will hold all ten jokes
      let allJokes = [];

      // make an api call 10 times;
      while (allJokes.length < 10) {
        let res = await axios.get("https://icanhazdadjoke.com/", { headers: { Accept: "application/json" } });
        
        // get joke info
        let jokeInfo = res.data;

        // push info into allJokes array
        allJokes.push(jokeInfo);
      }


      // then update the jokes State
      this.setState({ jokes: allJokes});


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
        key={joke.id}
        id={joke.id}
        text={joke.joke}
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

