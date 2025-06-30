import { css } from "@emotion/react";

export const containerCss = css`
  background-color: #2e2e2e;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
  border: 1px solid #444;
  &:hover {
    background-color: #3a3a3a;
  }
`;

export const titleCss = css`
  margin-top: 0;
  margin-bottom: 0.5rem;
  font-size: 1.4em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const contentCss = css`
  margin: 0;
  color: #aaa;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  height: 1.5em; /* Fallback for browsers that don't support -webkit-line-clamp */
  line-height: 1.5em;
`;

export const deleteButtonCss = css`
  background-color: #ff4d4d;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9em;
  margin-top: 1rem;
  float: right;
  transition: background-color 0.2s;
  &:hover {
    background-color: #e60000;
  }
`;
