import React from 'react';

// Styled components
import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';

import { Header } from './Header';

const GlobalStyle = createGlobalStyle`
    ${normalize}
    *   {
        text-decoration: none;
    }

    p {
        margin: 0;
    }

    html {
        box-sizing: border-box;
        font-size: 16px;
        -webkit-font-smoothing: antialiased;
    }

    body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        overscroll-behavior: none;
        overflow-x: hidden;
    }
`;

export const Layout = ({ children }) => {
    return (
        <>
            <GlobalStyle />
            <Header />
            <main>{children}</main>
        </>
    );
}


