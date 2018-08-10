import { array } from 'prop-types';
import React from 'react';
import { Helmet } from 'react-helmet';

import styles from './app.css';

const App = ({ data }) => (
  <div>
    <Helmet>
      <title>Users</title>
      <meta name="description" content="" />
    </Helmet>

    <h1>Users</h1>

    <div className={styles.users}>
      {data.map(user => (
        <div key={user.id} className={styles.user}>
          <h2>{user.name}</h2>

          <div>
            <em>@{user.username}</em>
          </div>

          <div>
            <a href={user.website} rel="noopener noreferrer" target="_blank">
              {user.website}
            </a>
          </div>
        </div>
      ))}
    </div>
  </div>
);

App.propTypes = { data: array.isRequired };

export default App;
