import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html, body {
    height: 100%;
    margin: 0;
    padding: 0;
  }
  
  * {
    font-family: "Spoqa Han Sans Neo", 'Noto Sons KR';
    source: url(${`${process.env.PUBLIC_URL}/font/SpoqaHanSansNeo-Medium.otf`});
    color: #222222;
  }
  a {
    text-decoration: none;
  }
`;

export default GlobalStyle;
