"use client";

import { useEffect, useRef, useState } from "react";

function Divider() {
  return <span className="tb-divider" aria-hidden="true" />;
}

export default function Toolbar({ editor }) {
  const [linkMode, setLinkMode] = useState(false);
  const [linkValue, setLinkValue] = useState("");
  const linkInputRef = useRef(null);

  useEffect(() => {
    if (linkMode && linkInputRef.current) {
      linkInputRef.current.focus();
    }
  }, [linkMode]);

  const openLink = () => {
    const previous = editor.getAttributes("link").href || "";
    setLinkValue(previous);
    setLinkMode(true);
  };

  const applyLink = (e) => {
    e?.preventDefault();
    const url = linkValue.trim();
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
    } else {
      const href = /^https?:\/\//i.test(url) ? url : `https://${url}`;
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href })
        .run();
    }
    setLinkMode(false);
  };

  if (linkMode) {
    return (
      <form className="toolbar link-form" onSubmit={applyLink}>
        <input
          ref={linkInputRef}
          className="link-input"
          type="text"
          placeholder="Cole ou digite um link…"
          value={linkValue}
          onChange={(e) => setLinkValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Escape") setLinkMode(false);
          }}
        />
        <button type="submit" className="tb-btn tb-apply" title="Aplicar">
          ✓
        </button>
        <button
          type="button"
          className="tb-btn"
          title="Remover link"
          onClick={() => {
            editor.chain().focus().extendMarkRange("link").unsetLink().run();
            setLinkMode(false);
          }}
        >
          ✕
        </button>
      </form>
    );
  }

  const isActive = (name, attrs) => editor.isActive(name, attrs);

  return (
    <div className="toolbar">
      <button
        type="button"
        className={`tb-btn ${isActive("bold") ? "is-active" : ""}`}
        title="Negrito"
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        <span className="ic-bold">B</span>
      </button>

      <button
        type="button"
        className={`tb-btn ${isActive("italic") ? "is-active" : ""}`}
        title="Itálico"
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        <span className="ic-italic">i</span>
      </button>

      <button
        type="button"
        className={`tb-btn ${isActive("link") ? "is-active" : ""}`}
        title="Link"
        onClick={openLink}
      >
        <svg width="20" height="20" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M3.9 12a3.1 3.1 0 0 1 3.1-3.1h3V7H7a5 5 0 0 0 0 10h3v-1.9H7A3.1 3.1 0 0 1 3.9 12zM8 13h8v-2H8v2zm9-6h-3v1.9h3a3.1 3.1 0 0 1 0 6.2h-3V17h3a5 5 0 0 0 0-10z"
          />
        </svg>
      </button>

      <Divider />

      <button
        type="button"
        className={`tb-btn ${isActive("heading", { level: 2 }) ? "is-active" : ""}`}
        title="Título"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
      >
        <span className="ic-title-lg">T</span>
      </button>

      <button
        type="button"
        className={`tb-btn ${isActive("heading", { level: 3 }) ? "is-active" : ""}`}
        title="Subtítulo"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
      >
        <span className="ic-title-sm">T</span>
      </button>

      <button
        type="button"
        className={`tb-btn ${isActive("blockquote") ? "is-active" : ""}`}
        title="Citação"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
      >
        <span className="ic-quote">&rdquo;</span>
      </button>

      <button
        type="button"
        className={`tb-btn ${isActive("bulletList") ? "is-active" : ""}`}
        title="Lista"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      >
        <svg width="20" height="20" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M4 7a1.3 1.3 0 1 0 0-2.6A1.3 1.3 0 0 0 4 7zm0 6.3a1.3 1.3 0 1 0 0-2.6 1.3 1.3 0 0 0 0 2.6zm0 6.3a1.3 1.3 0 1 0 0-2.6 1.3 1.3 0 0 0 0 2.6zM8 6h12V4.6H8V6zm0 6.7h12v-1.4H8v1.4zM8 19h12v-1.4H8V19z"
          />
        </svg>
      </button>

      <Divider />

      <button
        type="button"
        className="tb-btn"
        title="Comentar (em breve)"
        onClick={() => editor.chain().focus().run()}
      >
        <svg width="20" height="20" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M20 2H4a2 2 0 0 0-2 2v18l4-4h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zm0 14H5.2L4 17.2V4h16v12z"
          />
        </svg>
      </button>
    </div>
  );
}
