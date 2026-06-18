"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";

import Toolbar from "./Toolbar";
import PlusMenu from "./PlusMenu";

const STORAGE_KEY = "medium-editor-draft";

export default function Editor() {
  const [title, setTitle] = useState("");
  const titleRef = useRef(null);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
        // visuais já tratados via CSS
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        autolink: true,
        HTMLAttributes: { rel: "noopener noreferrer", target: "_blank" },
      }),
      Placeholder.configure({
        placeholder: ({ node }) => {
          if (node.type.name === "heading") return "Subtítulo";
          return "Conte sua história…";
        },
        showOnlyWhenEditable: true,
        showOnlyCurrent: false,
      }),
    ],
    content: "",
    editorProps: {
      attributes: {
        class: "prose-editor",
        spellcheck: "true",
      },
    },
  });

  // Carrega rascunho salvo
  useEffect(() => {
    if (!editor) return;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const data = JSON.parse(raw);
        if (data.title) setTitle(data.title);
        if (data.content) editor.commands.setContent(data.content);
      }
    } catch {
      /* ignore */
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor]);

  // Salva rascunho (autosave)
  const persist = useCallback(
    (nextTitle, nextContent) => {
      try {
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({
            title: nextTitle,
            content: nextContent,
            savedAt: Date.now(),
          })
        );
      } catch {
        /* ignore */
      }
    },
    []
  );

  useEffect(() => {
    if (!editor) return;
    const handler = () => persist(title, editor.getJSON());
    editor.on("update", handler);
    return () => {
      editor.off("update", handler);
    };
  }, [editor, title, persist]);

  // Auto-resize do título
  const onTitleChange = (e) => {
    const value = e.target.value.replace(/\n/g, "");
    setTitle(value);
    if (titleRef.current) {
      titleRef.current.style.height = "auto";
      titleRef.current.style.height = titleRef.current.scrollHeight + "px";
    }
    persist(value, editor ? editor.getJSON() : null);
  };

  const onTitleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      editor?.commands.focus("start");
    }
    if (
      (e.key === "ArrowDown" || e.key === "Down") &&
      e.target.selectionStart === e.target.value.length
    ) {
      editor?.commands.focus("start");
    }
  };

  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.style.height = "auto";
      titleRef.current.style.height = titleRef.current.scrollHeight + "px";
    }
  }, [title]);

  return (
    <div className="editor-shell">
      <div className="author">
        <span className="author-caret">›</span>
        <div className="author-meta">
          <span className="author-name">Mariane Lima</span>
          <span className="author-status">Rascunho</span>
        </div>
      </div>

      <textarea
        ref={titleRef}
        className="title-input"
        placeholder="Título"
        rows={1}
        value={title}
        onChange={onTitleChange}
        onKeyDown={onTitleKeyDown}
      />

      <div className="body-wrap">
        {editor && <PlusMenu editor={editor} />}

        {editor && (
          <BubbleMenu
            editor={editor}
            tippyOptions={{ duration: 120, maxWidth: "none" }}
            shouldShow={({ editor, from, to }) =>
              from !== to && !editor.state.selection.empty
            }
          >
            <Toolbar editor={editor} />
          </BubbleMenu>
        )}

        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
