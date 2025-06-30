"use client";

import { Global, css } from "@emotion/react";

const styles = css`
  :root {
    font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
    line-height: 1.5;
    font-weight: 400;
    color-scheme: light dark;
    color: rgba(255, 255, 255, 0.87);
    background-color: #242424;
  }

  body {
    margin: 0;
    display: flex;
    place-items: center;
    min-width: 320px;
    min-height: 100vh;
    font-family: var(--font-family);
    color: var(--color);
    background-color: var(--background-color);
  }

  * {
    box-sizing: border-box;
  }
`;

export const GlobalStyles = () => <Global styles={styles} />;
