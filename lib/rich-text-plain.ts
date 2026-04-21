import type { Block, Document, Inline, Text } from "@contentful/rich-text-types";

function isText(node: unknown): node is Text {
  return (
    typeof node === "object" &&
    node !== null &&
    (node as Text).nodeType === "text"
  );
}

function nodeToPlain(node: Block | Inline | Text): string {
  if (isText(node)) {
    return node.value;
  }
  if (
    typeof node === "object" &&
    node !== null &&
    "content" in node &&
    Array.isArray((node as Block).content)
  ) {
    return (node as Block).content
      .map((c) => nodeToPlain(c as Block | Inline | Text))
      .join("");
  }
  return "";
}

/** Flatten rich text to plain string for JSON-LD / meta (paragraphs separated by newlines). */
export function documentToPlainText(doc: Document): string {
  if (!doc?.content?.length) return "";
  return doc.content
    .map((block) => nodeToPlain(block as Block))
    .filter(Boolean)
    .join("\n\n")
    .replace(/\s+\n/g, "\n")
    .trim();
}
