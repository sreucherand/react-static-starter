import { node, string } from 'prop-types';
import React from 'react';
import Helmet from 'react-helmet';

const Html = ({ children, css, data, js, name }) => {
  const helmet = Helmet.renderStatic();

  return (
    <html lang="en-US">
      <head>
        <meta charSet="utf-8" />

        <meta
          content="width=device-width, maximum-scale=5.0, initial-scale=1.0, minimum-scale=1.0, user-scalable=yes"
          name="viewport"
        />

        {helmet.title.toComponent()}
        {helmet.meta.toComponent()}

        <link media="screen" href={css} rel="stylesheet" type="text/css" />
      </head>

      <body>
        {children}

        <script
          dangerouslySetInnerHTML={{
            __html: `
          window.__data = ${data};
        `,
          }}
        />

        <script defer src={js} />
      </body>
    </html>
  );
};

Html.propTypes = {
  children: node.isRequired,
  css: string.isRequired,
  data: string.isRequired,
  js: string.isRequired,
  name: string.isRequired,
};

export default Html;
