import React from 'react';
import ReactDOM from 'react-dom';

import App from './App/App';

window
  .fetch('https://jsonplaceholder.typicode.com/users')
  .then(response => response.json())
  .then(data => {
    ReactDOM.render(<App data={data} />, document.getElementById('container'));
  })
  .catch(() => console.warn('Could not receive data from the API!'));
