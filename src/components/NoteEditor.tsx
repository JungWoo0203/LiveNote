/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import type { Note } from "@/api/notes/notes.dto";
import TiptapEditor, { TiptapEditorHandle } from "./TiptapEditor";
import { EditorHeader } from "./EditorHeader/index";
import { useRef, MouseEvent, useState, useEffect, useCallback } from "react";
import { useDebounce } from "@/hooks/useDebounce";

interface NoteEditorProps {
  note: Note;
  onUpdate: (code: string, title: string, content: string) => void;
  onBack: () => void;
  isMobile: boolean;
  connectCode: string | null;
  onEnableSharing: () => void;
  onJoinSession: (code: string) => void;
}

// The internal state now includes the note's code to prevent race conditions.
interface EditorState {
  code: string;
  title: string;
  content: string;
}

export const NoteEditor = ({
  note,
  onUpdate,
  onBack,
  isMobile,
  connectCode,
  onEnableSharing,
  onJoinSession,
}: NoteEditorProps) => {
  const editorRef = useRef<TiptapEditorHandle>(null);

  // The single source of truth for the editor's content.
  const [editorState, setEditorState] = useState<EditorState>({
    code: note.code,
    title: note.title,
    content: note.content,
  });
  const [debouncedState, cancelDebounce] = useDebounce(editorState, 1000);

  // A ref to get the latest state inside the cleanup function.
  const latestStateRef = useRef(editorState);
  latestStateRef.current = editorState;

  // Debounced save effect.
  useEffect(() => {
    // Only save if the debounced content is different from the original note prop.
    const isDirty =
      debouncedState.title !== note.title ||
      debouncedState.content !== note.content;

    // And critically, only save if the debounced state belongs to the *current* note.
    if (isDirty && debouncedState.code === note.code) {
      onUpdate(
        debouncedState.code,
        debouncedState.title,
        debouncedState.content
      );
    }
  }, [debouncedState, note, onUpdate]);

  // Force-save on unmount or note change.
  useEffect(() => {
    return () => {
      // 1. Cancel any scheduled debounced save.
      cancelDebounce();

      const lastState = latestStateRef.current;

      // 2. Check if the unsaved content belongs to the note being closed.
      if (lastState.code === note.code) {
        const isDirty =
          lastState.title !== note.title || lastState.content !== note.content;

        // 3. If it's dirty, save it immediately.
        if (isDirty) {
          onUpdate(lastState.code, lastState.title, lastState.content);
        }
      }
    };
  }, [note, onUpdate, cancelDebounce]);

  // When the note prop changes, reset the internal state.
  useEffect(() => {
    setEditorState({
      code: note.code,
      title: note.title,
      content: note.content,
    });
  }, [note]);

  const handleEditorChange = useCallback(
    (htmlContent: string) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlContent, "text/html");
      const titleElement = doc.querySelector("h1");
      const title = titleElement?.innerText || "Untitled";

      if (titleElement) {
        titleElement.remove();
      }
      const content = doc.body.innerHTML;

      // Update the state with the current note's code.
      setEditorState({ code: note.code, title, content });
    },
    [note.code]
  );

  const handleContainerClick = useCallback((e: MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest(".ProseMirror")) {
      return;
    }
    editorRef.current?.focusAtCoordinates({ x: e.clientX, y: e.clientY });
  }, []);

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        height: 100%;
        flex-grow: 1;
        width: 100%;
        min-width: 0;
      `}
    >
      <EditorHeader
        isMobile={isMobile}
        onBack={onBack}
        connectCode={connectCode}
        onEnableSharing={onEnableSharing}
        onJoinSession={onJoinSession}
      />
      <div
        onClick={handleContainerClick}
        css={css`
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          overflow-y: auto;

          .ProseMirror {
            flex-grow: 1;
            outline: none;
            padding: 1rem 0;
          }
        `}
      >
        <TiptapEditor
          ref={editorRef}
          value={`<h1>${editorState.title}</h1>${editorState.content}`}
          onChange={handleEditorChange}
        />
      </div>
    </div>
  );
};
