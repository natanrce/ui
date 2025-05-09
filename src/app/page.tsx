import MDXComponent, { metadata } from "@/docs/index.mdx";

export { metadata };

export default function Home() {
  return (
    <main className="prose prose-invert">
      <div className="space-y-2">
        <h1 className="scroll-m-20 text-3xl font-bold tracking-tight">
          {metadata.title}
        </h1>
        {metadata.description && (
          <p className="text-base text-muted-foreground">
            {metadata.description}
          </p>
        )}
      </div>
      <MDXComponent />
    </main>
  );
}
