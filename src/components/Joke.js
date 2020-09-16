import React from 'react';
import './../assets/styles/Joke.css';

function Joke(props) {
  // create function to dynamically change colors
  function changeColor() {
    if(props.score >= 5) {
      return "darkGreen";
    } else if (props.score < 0) {
      return "red";
    } else {
      return "lightGreen";
    }
  }

  return (
    
      <div className="Joke-line">
        <button onClick={props.increment} value={props.id}>Vote Up</button>
        {/* color in style will call the changeColor function */}
        <p style={ {color: changeColor()} }>{props.score}</p>
        <button onClick={props.decrement} value={props.id}>Vote Down</button>
        <p>{props.text}</p>
      </div>
    
  );
}

export default Joke;