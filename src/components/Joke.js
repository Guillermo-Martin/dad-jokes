import React from 'react';

function Joke(props) {
  return (
    
      <div>
        <button onClick={props.increment} value={props.id}>Vote Up</button>
        <p>{props.score}</p>
        <button onClick={props.decrement}>Vote Down</button>
        <p>{props.text}</p>
        <p>{props.id}</p>
      </div>
    
  );
}

export default Joke;