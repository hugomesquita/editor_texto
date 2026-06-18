import Editor from "@/components/Editor";

export default function Home() {
  return (
    <main>
      <header className="topbar">
        <div className="topbar-inner">
          <div className="brand">
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
