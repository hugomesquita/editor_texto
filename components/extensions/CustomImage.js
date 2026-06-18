import Image from "@tiptap/extension-image";
import { ReactNodeViewRenderer } from "@tiptap/react";
import ImageView from "../ImageView";

// Extensão de imagem com atributo de alinhamento.
// align: "left" | "center" | "right" | "full"
//  - left/right: imagem flutua e o texto contorna ao lado
//  - center: bloco centralizado
//  - full: largura total do conteúdo
export const CustomImage = Image.extend({
  draggable: true,

  addAttributes() {
    return {
      ...this.parent?.(),
      align: {
        default: "center",
        parseHTML: (element) => element.getAttribute("data-align") || "center",
        renderHTML: (attributes) => {
          return {
            "data-align": attributes.align,
            class: `editor-image align-${attributes.align}`,
          };
        },
      },
      width: {
        default: null,
        parseHTML: (element) => element.getAttribute("width"),
        renderHTML: (attributes) =>
          attributes.width ? { width: attributes.width } : {},
      },
    };
  },

  addCommands() {
    return {
      ...this.parent?.(),
      setImageAlign:
        (align) =>
        ({ commands }) =>
          commands.updateAttributes(this.name, { align }),
    };
  },

  addNodeView() {
    return ReactNodeViewRenderer(ImageView);
  },
});
