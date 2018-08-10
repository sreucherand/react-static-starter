/* eslint-disable react/no-danger */
import chalk from 'chalk';
import fetch from 'node-fetch';
import fs from 'fs-extra';
import path from 'path';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import App from './App/App';
import Html from './Html/Html';
import manifest from '../public/static/manifest.json';

console.log(`${'\n'}${chalk.bold('— Static files')}`);

const filename = path.resolve('public/index.html');

fetch('https://jsonplaceholder.typicode.com/users')
  .then(response => response.json())
  .then(data => {
    const output = renderToStaticMarkup(
      <Html
        data={JSON.stringify(data)}
        css={manifest['app.css']}
        js={manifest['app.js']}
        name="app"
      >
        <div
          dangerouslySetInnerHTML={{
            __html: renderToStaticMarkup(<App data={data} />),
          }}
          id="container"
        />
      </Html>
    );

    return fs.writeFile(filename, `<!DOCTYPE html>${output}`);
  })
  .then(() =>
    console.log(
      `  [+] ${chalk.bold(
        `./${path.relative(process.cwd(), filename)}`
      )} ${chalk.bold.green('[build]')}`
    )
  )
  .catch(error => console.warn('Could not generate a static build!', error));
