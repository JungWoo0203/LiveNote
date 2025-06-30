/** @jsxImportSource @emotion/react */
import { useCallback } from "react";
import type { Note } from "@/api/notes/notes.dto";
import {
  containerCss,
  titleCss,
  contentCss,
  deleteButtonCss,
} from "./NoteBox.styles";

interface NoteBoxProps {
  note: Note;
  onSelect: (note: Note) => void;
  onDelete: (code: string) => void;
}

export const NoteBox = ({ note, onSelect, onDelete }: NoteBoxProps) => {
  const contentSnippet = note.content
    .replace(/<[^>]+>/g, " ")
    .substring(0, 100);

  const handleDelete = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      onDelete(note.code);
    },
    [note.code, onDelete]
  );

  return (
    <div onClick={() => onSelect(note)} css={containerCss}>
      <h2 css={titleCss}>{note.title || "Untitled"}</h2>
      <p css={contentCss}>{contentSnippet}</p>
      <button onClick={handleDelete} css={deleteButtonCss}>
        Delete
      </button>
    </div>
  );
};
