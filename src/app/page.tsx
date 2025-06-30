"use client";

import { useResponsive } from "@/hooks/useResponsive";
import { NoteEditor } from "@/components/NoteEditor";
import { NoteList } from "@/components/NoteList";
import * as S from "./page.styles";
import { useNotes } from "@/hooks/useNotes";

export default function Page() {
  const { isMobile } = useResponsive();
  const {
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
  } = useNotes();

  if (isMobile) {
    return (
      <div css={[S.appContainer, S.mobileContainer]}>
        {selectedNote ? (
          <NoteEditor
            note={selectedNote}
            onUpdate={handleNoteUpdate}
            onBack={handleBack}
            isMobile={isMobile}
            connectCode={connectCode}
            onEnableSharing={handleEnableSharing}
            onJoinSession={setConnectCode}
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

  return (
    <div css={[S.appContainer, S.desktopContainer]}>
      <NoteList
        notes={notes}
        onNoteSelect={handleNoteSelect}
        onNewNote={handleNewNote}
        onNoteDelete={handleNoteDelete}
      />
      {selectedNote && (
        <NoteEditor
          note={selectedNote}
          onUpdate={handleNoteUpdate}
          onBack={handleBack}
          isMobile={isMobile}
          connectCode={connectCode}
          onEnableSharing={handleEnableSharing}
          onJoinSession={setConnectCode}
        />
      )}
    </div>
  );
}
