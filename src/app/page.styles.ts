import { css } from "@emotion/react";

export const appContainer = css`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
  height: 100vh;
`;

export const mobileContainer = css`
  display: flex;
  flex-direction: column;
`;

export const desktopContainer = css`
  display: flex;
  flex-direction: row;
  gap: 2rem;
`;
