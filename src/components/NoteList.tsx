/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import type { Note } from "@/api/notes/notes.dto";
import { NoteBox } from "./NoteBox/index";

interface NoteListProps {
  notes: Note[];
  onNoteSelect: (note: Note) => void;
  onNewNote: () => void;
  onNoteDelete: (code: string) => void;
}

export const NoteList = ({
  notes,
  onNoteSelect,
  onNewNote,
  onNoteDelete,
}: NoteListProps) => (
  <div
    css={css`
      display: flex;
      flex-direction: column;
      height: 100%;
      min-width: 300px;
      max-width: 350px;
      border-right: 1px solid #444;
      padding-right: 2rem;
      height: calc(100vh - 4rem);
    `}
  >
    <header
      css={css`
        text-align: center;
        margin-bottom: 2rem;
        h1 {
          font-size: 2.5em;
          font-weight: bold;
          margin: 0;
        }
        p {
          color: #888;
          margin: 0;
          margin-bottom: 1rem;
        }
      `}
    >
      <h1>LiveNote</h1>
      <p>Your thoughts, saved instantly.</p>
      <button
        onClick={onNewNote}
        css={css`
          background-color: #646cff;
          color: white;
          border: none;
          padding: 0.8rem 1.5rem;
          border-radius: 8px;
          cursor: pointer;
          font-size: 1em;
          font-weight: 500;
          transition: background-color 0.25s;
          &:hover {
            background-color: #535bf2;
          }
        `}
      >
        New Note
      </button>
    </header>
    <div
      css={css`
        flex-grow: 1;
        overflow-y: auto;
        padding-right: 1rem;
      `}
    >
      {notes.map((note) => (
        <NoteBox
          key={note.code}
          note={note}
          onSelect={onNoteSelect}
          onDelete={onNoteDelete}
        />
      ))}
    </div>
  </div>
);
