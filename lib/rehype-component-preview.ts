import fs from "fs";
import { u } from "unist-builder";
import { visit } from "unist-util-visit";

import { Index } from "../__registry__/";
import { UnistNode, UnistTree } from "types/unist";

function getNodeAttributeByName(node: UnistNode, name: string) {
  return node.attributes?.find((attribute) => attribute.name === name);
}

export function rehypeComponentPreview() {
  return (tree: UnistTree) => {
    visit(tree, (node: UnistNode) => {
      if (node.name === "ComponentPreview") {
        const name = getNodeAttributeByName(node, "name")?.value;
        const component = Index[name as string];

        const src = component.files[0]?.path;

        let source = fs.readFileSync(src, "utf8");

        source = source.replaceAll(
          `@/registry/`,
          "@/components/"
        );
        source = source.replaceAll("export default", "export");

        node.children?.push(
          u("element", {
            tagName: "pre",
            properties: {
              __src__: src,
            },
            children: [
              u("element", {
                tagName: "code",
                data: {
                  meta: "showLineNumbers",
                },
                properties: {
                  className: ["language-tsx"],
                  ['data-line-numbers']: ""
                },
                children: [
                  {
                    type: "text",
                    value: source,
                  },
                ],
              }),
            ],
          })
        );
      }
    });
  };
}
