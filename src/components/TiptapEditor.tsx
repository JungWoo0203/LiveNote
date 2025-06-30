/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { forwardRef, useImperativeHandle, useEffect } from "react";

export interface TiptapEditorHandle {
  focus: () => void;
  focusAtCoordinates: (coords: { x: number; y: number }) => void;
}

interface TiptapEditorProps {
  value: string;
  onChange: (content: string) => void;
}

const TiptapEditor = forwardRef<TiptapEditorHandle, TiptapEditorProps>(
  ({ value, onChange }, ref) => {
    const editor = useEditor({
      extensions: [
        StarterKit.configure({
          heading: {
            levels: [1, 2, 3],
          },
        }),
        Placeholder.configure({
          placeholder: ({ node }) => {
            if (
              node.type.name === "heading" &&
              "level" in node.attrs &&
              node.attrs.level === 1
            ) {
              return "Untitled";
            }
            return "Start writing...";
          },
        }),
      ],
      content: value,
      editorProps: {
        handleKeyDown: (view, event) => {
          if (event.key === "Tab") {
            event.preventDefault();

            if (event.shiftKey) {
              if (editor?.can().liftListItem("listItem")) {
                editor.chain().focus().liftListItem("listItem").run();
              }
              return true;
            } else {
              if (editor?.can().sinkListItem("listItem")) {
                editor.chain().focus().sinkListItem("listItem").run();
              }
              return true;
            }
          }
          return false;
        },
      },
      onUpdate: ({ editor }) => {
        const html = editor.getHTML();
        // Ensure the first node is always h1
        const firstNode = editor.state.doc.content.firstChild;
        if (
          firstNode &&
          (firstNode.type.name !== "heading" || firstNode.attrs.level !== 1)
        ) {
          editor.chain().focus().setNode("heading", { level: 1 }).run();
        }
        onChange(html);
      },
    });

    // Sync editor content with the value prop from parent
    useEffect(() => {
      if (editor) {
        const isSame = editor.getHTML() === value;
        if (!isSame) {
          editor.commands.setContent(value, false);
        }
      }
    }, [editor, value]);

    useImperativeHandle(ref, () => ({
      focus: () => {
        editor?.chain().focus().run();
      },
      focusAtCoordinates: (coords: { x: number; y: number }) => {
        if (!editor?.view.dom.isConnected) return;
        const pos = editor.view.posAtCoords({ left: coords.x, top: coords.y });
        if (pos) {
          editor.chain().focus(pos.pos).run();
        } else {
          editor.chain().focus("end").run();
        }
      },
    }));

    const toolbarButton = (isActive: boolean) => css`
      background-color: ${isActive ? "#eee" : "#333"};
      color: ${isActive ? "#333" : "#fff"};
      border: none;
      padding: 0.4rem 0.6rem;
      cursor: pointer;

      &:hover {
        background-color: ${isActive ? "#ddd" : "#444"};
      }
    `;

    return (
      <>
        {editor && (
          <BubbleMenu
            editor={editor}
            tippyOptions={{ duration: 100 }}
            css={css`
              display: flex;
              background-color: #333;
              border-radius: 5px;
              overflow: hidden;
              border: 1px solid #444;
            `}
          >
            <button
              onClick={() => editor.chain().focus().toggleBold().run()}
              css={toolbarButton(editor.isActive("bold"))}
            >
              <b>B</b>
            </button>
            <button
              onClick={() => editor.chain().focus().toggleItalic().run()}
              css={toolbarButton(editor.isActive("italic"))}
            >
              <i>I</i>
            </button>
            <button
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 2 }).run()
              }
              css={toolbarButton(editor.isActive("heading", { level: 2 }))}
            >
              H2
            </button>
            <button
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 3 }).run()
              }
              css={toolbarButton(editor.isActive("heading", { level: 3 }))}
            >
              H3
            </button>
          </BubbleMenu>
        )}
        <EditorContent editor={editor} />
      </>
    );
  }
);

TiptapEditor.displayName = "TiptapEditor";

export default TiptapEditor;
