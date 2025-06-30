import { useState, useEffect, useCallback } from "react";
import {
  createNote,
  getNotes,
  updateNote,
  deleteNoteFromConnection,
  connectClient,
  getClientConnection,
} from "@/api/notes/notes.api";
import type { Note } from "@/api/notes/notes.dto";

export const useNotes = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);
  const [connectCode, setConnectCode] = useState<string | null>(null);

  const syncNotes = useCallback(async () => {
    try {
      if (connectCode) {
        const connection = await getClientConnection(connectCode);
        const remoteNotes = await getNotes({ codes: connection.noteCodes });
        setNotes(remoteNotes);
      } else {
        const localNoteCodes = JSON.parse(
          localStorage.getItem("live-note-codes") || "[]"
        );
        if (localNoteCodes.length > 0) {
          const localNotes = await getNotes({ codes: localNoteCodes });
          setNotes(localNotes);
        } else {
          setNotes([]); // Clear notes if no local codes exist
        }
      }
    } catch (error) {
      console.error("Failed to sync notes:", error);
      setNotes([]); // Clear notes on error to avoid inconsistent state
    }
  }, [connectCode]);

  useEffect(() => {
    syncNotes();
  }, [syncNotes]);

  const handleEnableSharing = useCallback(async () => {
    if (notes.length === 0) return;
    try {
      const noteCodes = notes.map((n) => n.code);
      const connection = await connectClient({ noteCodes });
      setConnectCode(connection.code);
      alert(`Sharing started! Code: ${connection.code}`);
    } catch (error) {
      console.error("Failed to enable sharing:", error);
    }
  }, [notes]);

  const handleNoteSelect = useCallback((note: Note) => {
    setSelectedNoteId(note.code);
  }, []);

  const handleNoteUpdate = useCallback(
    async (code: string, title: string, content: string) => {
      try {
        await updateNote(code, { title, content }, connectCode ?? undefined);
        setNotes((currentNotes) =>
          currentNotes.map((note) =>
            note.code === code
              ? {
                  ...note,
                  title,
                  content,
                  updateDate: new Date().toISOString(),
                }
              : note
          )
        );
      } catch (error) {
        console.error("Failed to update note:", error);
      }
    },
    [connectCode]
  );

  const handleNewNote = useCallback(async () => {
    try {
      const newNote = await createNote(connectCode ?? undefined);
      setNotes((prevNotes) => {
        const newNotes = [newNote, ...prevNotes];
        if (!connectCode) {
          const localNoteCodes = newNotes.map((n) => n.code);
          localStorage.setItem(
            "live-note-codes",
            JSON.stringify(localNoteCodes)
          );
        }
        return newNotes;
      });
      setSelectedNoteId(newNote.code);
    } catch (error) {
      console.error("Failed to create note:", error);
    }
  }, [connectCode]);

  const handleNoteDelete = useCallback(
    async (code: string) => {
      try {
        if (connectCode) {
          const connection = await deleteNoteFromConnection(connectCode, code);
          setNotes((prevNotes) =>
            prevNotes.filter((n) => connection.noteCodes.includes(n.code))
          );
        } else {
          setNotes((prevNotes) => {
            const newNotes = prevNotes.filter((note) => note.code !== code);
            const localNoteCodes = newNotes.map((n) => n.code);
            localStorage.setItem(
              "live-note-codes",
              JSON.stringify(localNoteCodes)
            );
            return newNotes;
          });
        }

        if (selectedNoteId === code) {
          setSelectedNoteId(null);
        }
      } catch (error) {
        console.error("Failed to delete note:", error);
      }
    },
    [connectCode, selectedNoteId]
  );

  const handleBack = useCallback(() => {
    setSelectedNoteId(null);
  }, []);

  const selectedNote = selectedNoteId
    ? notes.find((note) => note.code === selectedNoteId)
    : null;

  return {
    notes,
    selectedNote,
    connectCode,
    handleNoteSelect,
    handleNoteUpdate,
    handleNewNote,
    handleNoteDelete,
    handleBack,
    handleEnableSharing,
    setConnectCode,
  };
};
