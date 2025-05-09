import { visit } from "unist-util-visit";
import { UnistNode, UnistTree } from "types/unist";

export function rehypeRawCode() {
  return (tree: UnistTree) => {
    visit(tree, "element", (node: UnistNode) => {
      if (node?.type === "element" && node?.tagName === "pre") {
        const [codeEl] = node.children!;
        if (codeEl.tagName !== "code") return;

        node.__rawstring__ = codeEl.children?.[0].value;
      }
    });
  };
}

export function rehypeCodeLanguage() {
  return (tree: UnistTree) => {
    visit(tree, (node: UnistNode) => {
      if (node?.type === "element" && node?.tagName === "figure") {
        if (!("data-rehype-pretty-code-figure" in node.properties!)) {
          return;
        }

        const preElement = node.children!.at(-1) as UnistNode;
        if (preElement.tagName !== "pre") {
          return;
        }
        const codeElement = preElement.children![0];

        const meta = codeElement.data?.meta;
        const filename = meta?.match(/filename="([^"]*)"/);

        preElement.properties!.filename = filename?.[1] ?? null;
        preElement.properties!["__rawstring__"] = node.__rawstring__;
      }
    });
  };
}
