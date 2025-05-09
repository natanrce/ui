import { NextConfig } from "next";

import createMDX from "@next/mdx";

import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import { rehypePrettyCode, Options } from "rehype-pretty-code";

import { rehypeComponentPreview } from "./lib/rehype-component-preview";
import { rehypeRawCode, rehypeCodeLanguage } from "./lib/rehype-code";

const prettyCodeOptions: Options = {
  theme: "github-dark",
  keepBackground: false,
  onVisitLine(node) {
    if (node.children.length === 0) {
      node.children = [{ type: "text", value: " " }];
    }
  },
  filterMetaString: (meta) => meta.replace(/filename="[^"]*"/, ""),
};

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      rehypeRawCode,
      rehypeComponentPreview,
      ['rehype-pretty-code', prettyCodeOptions] as unknown as typeof rehypePrettyCode,
      rehypeCodeLanguage,
    ],
  },
});

const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  experimental: {
    optimizePackageImports: ["shiki"],
  },
} satisfies NextConfig;

export default withMDX(nextConfig);
