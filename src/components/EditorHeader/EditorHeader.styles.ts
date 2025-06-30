import { css } from "@emotion/react";

export const headerCss = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #282c34;
  border-bottom: 1px solid #444;
`;

export const buttonCss = css`
  background: none;
  border: 1px solid #666;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #3c4048;
  }
`;

export const shareButtonCss = css`
  ${buttonCss}
  background-color: #646cff;
  border-color: #646cff;
  &:hover {
    background-color: #535bf2;
  }
`;

export const shareContainerCss = css`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const shareCodeCss = css`
  background-color: #333;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  color: #eee;
  cursor: pointer;
  border: 1px dashed #666;

  strong {
    margin-left: 0.5rem;
    color: #80aaff;
    font-weight: bold;
  }
`;

export const joinInputCss = css`
  background-color: #333;
  border: 1px solid #666;
  color: white;
  padding: 0.5rem;
  border-radius: 5px;
  margin-right: 0.5rem;
`;
