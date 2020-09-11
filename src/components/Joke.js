import React from 'react';

function Joke(props) {
  return (
    <div>
      <li>{props.text}</li>
    </div>
  );
}

export default Joke;