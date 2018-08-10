import * as breakpoints from '../variables/breakpoints';

export default `
  html,
  body {
    margin: 0;
  }

  .users {
    display: flex;
    flex-wrap: wrap;
  }

  .user {
    width: 100%;

    @media screen and (min-width: ${breakpoints.md}px) {
      width: 33.333333%;
    }

    @media screen and (min-width: ${breakpoints.lg}px) {
      width: 20%;
    }
  }
`;
