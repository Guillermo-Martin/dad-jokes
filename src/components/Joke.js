import React from 'react';

function Joke(props) {
  return (
    
      <li>
        <button onClick={props.increment}>Vote Up</button>
        <p>{props.score}</p>
        <button onClick={props.decrement}>Vote Down</button>
        <p>{props.text}</p>
      </li>
    
  );
}

export default Joke;