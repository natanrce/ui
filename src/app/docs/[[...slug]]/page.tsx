import { navigation } from "@/lib/navigation";

interface ArticleProps {
  params: Promise<{
    slug: string[];
  }>;
}

export function generateStaticParams() {
  const paths = navigation
    .flatMap((item) => item.children)
    .map((item) => item.href)
    .map((item) => ({
      slug: item.split("/").slice(2),
    }));

  return paths;
}

export default async function Article({ params }: ArticleProps) {
  const { slug } = await params;

  const { default: MDXComponent, metadata } = await import(
    `@/docs/${slug.join("/")}.mdx`
  );

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
