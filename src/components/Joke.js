import React from 'react';
import './../assets/styles/Joke.css';

function Joke(props) {
  return (
    
      <div className="Joke-line">
        <button onClick={props.increment} value={props.id}>Vote Up</button>
        <p>{props.score}</p>
        <button onClick={props.decrement} value={props.id}>Vote Down</button>
        <p>{props.text}</p>
      </div>
    
  );
}

export default Joke;