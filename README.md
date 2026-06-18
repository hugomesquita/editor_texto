# Editor estilo Medium

Editor de texto para blog inspirado no editor do Medium, feito em **Next.js (App Router)** + **Tiptap**.

## Recursos

- **Barra flutuante de edição** ao selecionar texto: negrito, itálico, link, título (H2), subtítulo (H3), citação, lista e comentário.
- **Botão `+`** nas linhas vazias para inserir imagem (por URL), divisor (`···`) e citação.
- **Placeholders** "Título" e "Conte sua história…" como no Medium.
- **Autosave** do rascunho no `localStorage`.
- Tipografia serifada no corpo e sans-serif na interface, no estilo do Medium.

## Como rodar

```bash
npm install
npm run dev
```

Abra http://localhost:3000

## Estrutura

```
app/
  layout.js        # layout raiz + metadata
  page.js          # topbar + <Editor/>
  globals.css      # todo o estilo (Medium-like)
components/
  Editor.jsx       # título, corpo Tiptap, autosave
  Toolbar.jsx      # barra flutuante de seleção (BubbleMenu)
  PlusMenu.jsx     # menu "+" das linhas vazias (FloatingMenu)
```
