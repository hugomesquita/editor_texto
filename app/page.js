import Editor from "@/components/Editor";

export default function Home() {
  return (
    <main>
      <header className="topbar">
        <div className="topbar-inner">
          <div className="brand">
            <svg width="28" height="28" viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill="currentColor"
                d="M3 4h2.2l3.3 8 3.3-8H14v16h-2V8.6l-3.5 8.4L5 8.6V20H3V4zm14 0h2l3 6-3 6h-2l3-6-3-6z"
              />
            </svg>
            <span className="brand-label">Draft</span>
          </div>
          <button className="publish-btn" type="button">
            Publicar
          </button>
        </div>
      </header>

      <Editor />
    </main>
  );
}
