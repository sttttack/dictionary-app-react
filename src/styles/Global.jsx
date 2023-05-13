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
        background-color: ${({ theme }) => theme.colors.white};
        font-family: ${({ theme }) => theme.fonts.inter}       
    }
`;
