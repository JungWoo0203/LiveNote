import type { Note } from "../types";

interface NoteListProps {
  notes: Note[];
  onNoteSelect: (note: Note) => void;
  onNewNote: () => void;
  onNoteDelete: (id: string) => void;
}

export const NoteList = ({
  notes,
  onNoteSelect,
  onNewNote,
  onNoteDelete,
}: NoteListProps) => (
  <div className="note-list-container">
    <header className="app-header">
      <h1>LiveNote</h1>
      <p>Your thoughts, saved instantly.</p>
      <button onClick={onNewNote} className="new-note-btn">
        New Note
      </button>
    </header>
    <div className="note-list">
      {notes.map((note) => (
        <div
          key={note.id}
          className="note-item"
          onClick={() => onNoteSelect(note)}
        >
          <h2>{note.title || "Untitled"}</h2>
          <p>{note.content.substring(0, 100)}</p>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNoteDelete(note.id);
            }}
            className="delete-note-btn"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  </div>
);
