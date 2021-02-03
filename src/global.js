import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`

  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    transition: all 0.25s linear;
  }

  body .header .buttons ul li a {
    color: ${({ theme }) => theme.text};

  }

`;
