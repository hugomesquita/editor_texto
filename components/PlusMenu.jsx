"use client";

import { useState } from "react";
import { FloatingMenu } from "@tiptap/react";

export default function PlusMenu({ editor }) {
  const [open, setOpen] = useState(false);

  const insertImage = () => {
    const url = window.prompt("URL da imagem:");
    if (url) {
      const safe = url.replace(/"/g, "&quot;");
      editor
        .chain()
        .focus()
        .insertContent(
          `<p><img src="${safe}" alt="" style="max-width:100%;border-radius:4px" /></p>`
        )
        .run();
    }
    setOpen(false);
  };

  const insertDivider = () => {
    editor.chain().focus().setHorizontalRule().run();
    setOpen(false);
  };

  const insertQuote = () => {
    editor.chain().focus().toggleBlockquote().run();
    setOpen(false);
  };

  return (
    <FloatingMenu
      editor={editor}
      tippyOptions={{ duration: 120, placement: "left" }}
      shouldShow={({ editor, state }) => {
        const { $from, empty } = state.selection;
        const isEmptyParagraph =
          empty &&
          $from.parent.type.name === "paragraph" &&
          $from.parent.content.size === 0;
        return isEmptyParagraph;
      }}
    >
      <div className={`plus-menu ${open ? "is-open" : ""}`}>
        <button
          type="button"
          className="plus-toggle"
          title="Adicionar"
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="22" height="22" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M12 5v14M5 12h14"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        </button>

        {open && (
          <div className="plus-actions">
            <button type="button" title="Imagem" onClick={insertImage}>
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M21 5H3a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1zm-1 11.6-4.3-4.3-2.5 2.5-3.2-3.2L4 17V7h16v9.6zM8 10.5A1.5 1.5 0 1 0 8 7.5a1.5 1.5 0 0 0 0 3z"
                />
              </svg>
            </button>
            <button type="button" title="Divisor" onClick={insertDivider}>
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path fill="currentColor" d="M4 11h16v2H4z" />
              </svg>
            </button>
            <button type="button" title="Citação" onClick={insertQuote}>
              <span className="plus-quote">&rdquo;</span>
            </button>
          </div>
        )}
      </div>
    </FloatingMenu>
  );
}
