import React, { Component } from 'react';
import axios from 'axios';
import Joke from './Joke';
import './../assets/styles/JokeDisplay.css';

class JokeDisplay extends Component {
  state = {
    jokes: [],
    score: 0,
    isLoaded: false
  }

  // make an API request when JokeDisplay renders
  async componentDidMount() {
    // for the GET request to respond with JSON , we have to pass in "headers" with the GET request
    try {

      // check to see if there are jokes in localstorage
      let prevJokes = localStorage.getItem("jokes");

      // if there are no jokes, make an api request to get 10 jokes
      if(prevJokes === null) {
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

        // then update the jokes State and isLoaded state to true
        this.setState({ jokes: allJokes, isLoaded: true });

        // store jokes into localstorage
        localStorage.setItem("jokes", JSON.stringify(allJokes));
      } else {
        // set isLoaded to true 
        this.setState({jokes: JSON.parse(prevJokes), isLoaded: true });
      }
        
      
      


    } catch (err) {
      console.log(err);
    }

    // // store all of the jokes into local storage
    // localStorage.setItem("jokes", JSON.stringify(this.state.jokes));

    // // retrieve jokes from local storage 
    // let prevJokes = JSON.parse(localStorage.getItem("jokes"));

    // // change state to previously stored jokes
    // this.setState({ jokes: prevJokes });
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
    this.setState({ score: newScore });

    // push new score to localStorage (push updated jokes array)
    localStorage.setItem("jokes", JSON.stringify(this.state.jokes));
  }

  // decrement function
  handleDecrement = (event) => {
    // get the joke id
    let jokeId = event.target.value;

    // filter through the jokes array and find the matching id
    let filteredJoke = this.state.jokes.filter(joke => joke.id === jokeId);

    // subtract 1 to that object's score (currently set to 0 in the state)
    let newScore = filteredJoke[0].score -= 1;

    // change the joke's score
    this.setState({ score: newScore });

    // push new score to localStorage (push updated jokes array)
    localStorage.setItem("jokes", JSON.stringify(this.state.jokes));
  }

  // get new Jokes function
  handleGetJokes = async () => {
    // change isLoaded to false
    this.setState({ isLoaded: false });

    // then get jokes
    try {
      // create an array to hold new jokes
      let newJokes = [];

      while (newJokes.length < 10) {
        // make an api request to get 10 jokes
        let res = await axios.get("https://icanhazdadjoke.com/", { headers: { Accept: "application/json" } });

        // get joke info
        let jokeInfo = res.data;

        // add score to the object, set to 0
        res.data.score = 0;

        // push info into allJokes array
        newJokes.push(jokeInfo);
      }

      // add jokes to the existing set of jokes
      this.setState(curState => ({jokes: [...curState.jokes, ...newJokes], isLoaded: true}));

      // push new jokes into local storage
      localStorage.setItem("jokes", JSON.stringify(this.state.jokes));
    } catch (err) {
      console.log(err);
    }
  }


  render() {

    // sort method:  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort#:~:text=The%20sort()%20method%20sorts,UTF%2D16%20code%20units%20values.
    // sort jokes by ascending score
    let sortedJokes = this.state.jokes.sort((a, b) => b.score - a.score);
    
    // for every joke in the jokes array, render a joke component (map through sorted jokes)
    const jokesList = sortedJokes.map(joke => (
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
      <div className="JokeDisplay">
        {/* sidebar */}
        <div className="JokeDisplay-sidebar">
          <h2>Dad Jokes</h2>
          <button onClick={this.handleGetJokes}>New Jokes</button>

        </div>



        {/* jokes list */}
        <div className="JokeDisplay-list">
          {/* conditionally render component */}
          {
            this.state.isLoaded 
              ? 
                <ul>
                  {jokesList}
                </ul>
              :
                <h1>LOADING!</h1>
          }
          
        </div>

      </div>
    );
  }
}

export default JokeDisplay;

// FURTHER STUDY:
// check for duplicate jokes

  // loop through the jokes and get the id
  // see if the array has the id (use '.includes(id))
  // if it doesn't include the id(push it into a new array)


