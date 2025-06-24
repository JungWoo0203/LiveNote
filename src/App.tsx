import { useState, useEffect } from "react";
import "./App.css";
import type { Note } from "./types";
import { NoteEditor } from "./components/NoteEditor";
import { NoteList } from "./components/NoteList";

function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);

  useEffect(() => {
    const savedNotes = localStorage.getItem("live-notes");
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("live-notes", JSON.stringify(notes));
  }, [notes]);

  const handleNoteSelect = (note: Note) => {
    setSelectedNoteId(note.id);
  };

  const handleNoteUpdate = (id: string, title: string, content: string) => {
    const updatedNotes = notes.map((note) =>
      note.id === id ? { ...note, title, content } : note
    );
    setNotes(updatedNotes);
  };

  const handleNewNote = () => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: "New Note",
      content: "",
    };
    setNotes([newNote, ...notes]);
    setSelectedNoteId(newNote.id);
  };

  const handleNoteDelete = (id: string) => {
    setNotes(notes.filter((note) => note.id !== id));
    if (selectedNoteId === id) {
      setSelectedNoteId(null);
    }
  };

  const handleBack = () => {
    setSelectedNoteId(null);
  };

  const selectedNote = selectedNoteId
    ? notes.find((note) => note.id === selectedNoteId)
    : null;

  return (
    <div className="app-container">
      {selectedNote ? (
        <NoteEditor
          note={selectedNote}
          onUpdate={handleNoteUpdate}
          onBack={handleBack}
        />
      ) : (
        <NoteList
          notes={notes}
          onNoteSelect={handleNoteSelect}
          onNewNote={handleNewNote}
          onNoteDelete={handleNoteDelete}
        />
      )}
    </div>
  );
}

export default App;
