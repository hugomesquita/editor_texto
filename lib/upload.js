// Converte um arquivo de imagem em data URL (base64).
// Sem backend: a imagem fica embutida no conteúdo e persiste no localStorage.
export function fileToDataURL(file) {
  return new Promise((resolve, reject) => {
    if (!file || !file.type.startsWith("image/")) {
      reject(new Error("Arquivo não é uma imagem"));
      return;
    }
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

// Insere uma ou mais imagens (arquivos) no editor na posição informada.
export async function insertImageFiles(editor, files, pos) {
  const images = Array.from(files).filter((f) => f.type.startsWith("image/"));
  if (images.length === 0) return;

  for (const file of images) {
    try {
      const src = await fileToDataURL(file);
      const chain = editor.chain().focus();
      if (typeof pos === "number") {
        chain.insertContentAt(pos, {
          type: "image",
          attrs: { src, alt: file.name },
        });
      } else {
        chain.setImage({ src, alt: file.name });
      }
      chain.run();
    } catch (err) {
      // ignora arquivos inválidos
      console.warn("Falha ao carregar imagem:", err);
    }
  }
}
