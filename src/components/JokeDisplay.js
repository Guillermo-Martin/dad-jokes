import React, { Component } from 'react';
import axios from 'axios';
import Joke from './Joke';

class JokeDisplay extends Component {

  // make an API request when JokeDisplay renders
  async componentDidMount() {
    // for the GET request to respond with JSON , we have to pass in "headers" with the GET request
    try {
      let res = await axios.get("https://icanhazdadjoke.com/", { headers: { Accept: "application/json" } }); 
 
      console.log(res.data);

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

