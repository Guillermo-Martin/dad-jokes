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

        // add score to the object, set to 0
        res.data.score = 0;

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
  handleIncrement = (event) => {
    // get the joke id
    let jokeId = event.target.value;

    // filter through the jokes array and find the matching id
    let filteredJoke = this.state.jokes.filter(joke => joke.id === jokeId);
    
    // add +1 to that object's score (currently set to 0 in the state)
    let newScore = filteredJoke[0].score += 1;

    // change the joke's score
    this.setState({score: newScore});
  }

  // decrement function
  handleDecrement = () => {
    this.setState(state => ({ score: state.score - 1}));
  }

  render() {

    // for every joke in the jokes array, render a joke component
    
    const jokesList = this.state.jokes.map(joke => (
      <li key={joke.id}>
        <Joke 
          key={joke.id}
          id={joke.id}
          text={joke.joke}
          increment={this.handleIncrement}
          decrement={this.handleDecrement}
          score={joke.score}
        />
      </li>
      
      
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

