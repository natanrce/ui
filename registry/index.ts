import { type Registry } from "shadcn/registry"

import { ui } from "./registry-ui"
import { examples } from "./registry-examples"

export const registry = {
  name: "shadcn/ui",
  homepage: "https://ui.shadcn.com",
  items: [
    ...ui,
    ...examples,
  ],
} satisfies Registry