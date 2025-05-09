interface Metadata {
  title: string,
  description?: string,
};

declare module "*.mdx" {
  let MDXComponent: () => JSX.Element;
  export default MDXComponent;

  export const metadata: ArticleMetadata;
};