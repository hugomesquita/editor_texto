"use client";

// Ícone que mostra a imagem (bloco) e o texto (linhas) lado a lado,
// deixando claro de que lado o texto vai ficar.
function AlignIcon({ align }) {
  if (align === "left") {
    // imagem à esquerda, texto à direita
    return (
      <svg width="20" height="20" viewBox="0 0 24 24">
        <rect x="3" y="6" width="9" height="12" rx="1" fill="currentColor" />
        <rect x="14" y="7" width="7" height="2" rx="1" fill="currentColor" />
        <rect x="14" y="11" width="7" height="2" rx="1" fill="currentColor" />
        <rect x="14" y="15" width="7" height="2" rx="1" fill="currentColor" />
      </svg>
    );
  }
  if (align === "right") {
    // imagem à direita, texto à esquerda
    return (
      <svg width="20" height="20" viewBox="0 0 24 24">
        <rect x="12" y="6" width="9" height="12" rx="1" fill="currentColor" />
        <rect x="3" y="7" width="7" height="2" rx="1" fill="currentColor" />
        <rect x="3" y="11" width="7" height="2" rx="1" fill="currentColor" />
        <rect x="3" y="15" width="7" height="2" rx="1" fill="currentColor" />
      </svg>
    );
  }
  if (align === "full") {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24">
        <path fill="currentColor" d="M3 5h18v2H3V5zm0 4h18v6H3V9zm0 8h18v2H3v-2z" />
      </svg>
    );
  }
  // center
  return (
    <svg width="20" height="20" viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M3 5h18v2H3V5zm4 4h10v2H7V9zm-4 4h18v2H3v-2zm4 4h10v2H7v-2z"
      />
    </svg>
  );
}

const OPTIONS = [
  { align: "left", title: "Imagem à esquerda · texto à direita" },
  { align: "center", title: "Centralizar" },
  { align: "right", title: "Imagem à direita · texto à esquerda" },
  { align: "full", title: "Largura total" },
];

export default function ImageToolbar({ editor }) {
  const current = editor.getAttributes("image").align || "center";

  return (
    <div className="toolbar image-toolbar">
      {OPTIONS.map((opt) => (
        <button
          key={opt.align}
          type="button"
          className={`tb-btn ${current === opt.align ? "is-active" : ""}`}
          title={opt.title}
          onClick={() => editor.chain().focus().setImageAlign(opt.align).run()}
        >
          <AlignIcon align={opt.align} />
        </button>
      ))}

      <span className="tb-divider" aria-hidden="true" />

      <button
        type="button"
        className="tb-btn"
        title="Remover imagem"
        onClick={() => editor.chain().focus().deleteSelection().run()}
      >
        <svg width="20" height="20" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M6 7h12l-1 13H7L6 7zm3-3h6l1 2H8l1-2zM4 6h16v1H4V6z"
          />
        </svg>
      </button>
    </div>
  );
}
