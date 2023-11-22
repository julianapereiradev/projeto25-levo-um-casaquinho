import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    * {
        font-family: 'Inika', serif;
        font-style: normal;
        font-weight: 400;
        box-sizing: border-box;
    }

    button {
        cursor: pointer;
    }

    body {
      background-color: #FFFFFF;
    }

    a {
        color: inherit;
        text-decoration: inherit;
    }
`

export default GlobalStyle