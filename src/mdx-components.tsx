import type { MDXComponents } from "mdx/types";

import { Fence } from "@/components/fence";
import { ComponentPreview } from "@/components/component-preview";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    pre: Fence,
    ComponentPreview,
  };
}
