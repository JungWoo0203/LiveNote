import type { Note } from "../types";

interface NoteEditorProps {
  note: Note;
  onUpdate: (id: string, title: string, content: string) => void;
  onBack: () => void;
}

export const NoteEditor = ({ note, onUpdate, onBack }: NoteEditorProps) => (
  <div className="note-editor-container">
    <div className="note-editor-header">
      <button onClick={onBack}>← Back</button>
    </div>
    <input
      type="text"
      className="note-title-input"
      value={note.title}
      onChange={(e) => onUpdate(note.id, e.target.value, note.content)}
      placeholder="Title"
    />
    <textarea
      className="note-editor"
      value={note.content}
      onChange={(e) => onUpdate(note.id, note.title, e.target.value)}
      placeholder="Start typing..."
    />
  </div>
);
