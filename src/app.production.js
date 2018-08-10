import React from 'react';
import ReactDOM from 'react-dom';

import App from './App/App';

ReactDOM.render(
  <App data={window.__data} />,
  document.getElementById('container')
);
