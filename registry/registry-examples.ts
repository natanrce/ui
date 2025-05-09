import { type Registry } from "shadcn/registry"

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
]