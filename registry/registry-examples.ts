import { type Registry } from "shadcn/registry";

export const examples: Registry["items"] = [
  {
    name: "animated-pixel-icon-demo",
    type: "registry:example",
    registryDependencies: ["animates-pixel-icon"],
    files: [
      {
        path: "examples/animated-pixel-icon-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "3d-book-demo",
    type: "registry:example",
    registryDependencies: ["3d-book"],
    files: [
      {
        path: "examples/3d-book-demo.tsx",
        type: "registry:example",
      },
    ],
  },
];
