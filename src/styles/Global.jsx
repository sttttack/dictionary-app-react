import styled, { createGlobalStyle, css } from "styled-components";
import fontCss from "../styles/fonts.module.css";

export const GlobalStyles = createGlobalStyle`



    ${fontCss}

    * {
        box-sizing: border-box;
        
    }

    html {
        font-size: 100%;
        
    }

    body {
        padding: 0;
        margin: 0;
        font-family: ${({ theme }) => theme.fonts.interBold};;
        background-color: ${({ theme, dark }) =>
          !dark ? theme.light.white : theme.dark.black};
    }
`;
