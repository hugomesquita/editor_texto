"use client";

import { useRef } from "react";
import { NodeViewWrapper } from "@tiptap/react";

export default function ImageView({ node, updateAttributes, selected, editor }) {
  const { src, alt, align, width } = node.attrs;
  const imgRef = useRef(null);
  const wrapRef = useRef(null);

  const startResize = (e, side) => {
    e.preventDefault();
    e.stopPropagation();
    const startX = e.clientX;
    const startWidth = imgRef.current.offsetWidth;
    // largura máxima = largura da coluna do editor
    const maxWidth =
      editor?.view?.dom?.clientWidth || wrapRef.current?.parentElement?.clientWidth || 740;

    const onMove = (ev) => {
      const dx = ev.clientX - startX;
      const delta = side === "right" ? dx : -dx;
      let next = startWidth + delta;
      next = Math.max(80, Math.min(next, maxWidth));
      updateAttributes({ width: Math.round(next) });
    };

    const onUp = () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };

    document.body.style.cursor = "ew-resize";
    document.body.style.userSelect = "none";
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
  };

  const isFull = align === "full";

  return (
    <NodeViewWrapper
      ref={wrapRef}
      className={`editor-image-wrap align-${align} ${
        selected ? "is-selected" : ""
      }`}
      data-align={align}
    >
      <div className="image-frame">
        <img
          ref={imgRef}
          src={src}
          alt={alt || ""}
          className="editor-image"
          style={{ width: isFull ? "100%" : width ? `${width}px` : "auto" }}
          draggable={false}
        />

        {selected && !isFull && (
          <>
            <span
              className="resize-handle left"
              onMouseDown={(e) => startResize(e, "left")}
            />
            <span
              className="resize-handle right"
              onMouseDown={(e) => startResize(e, "right")}
            />
          </>
        )}
      </div>
    </NodeViewWrapper>
  );
}
