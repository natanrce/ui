import { Book, BookBack, BookPages } from "@/registry/ui/3d-book";

const color = "#b8b42d";

export default function BookDemo() {
  return (
    <div className="flex gap-4">
      <Book
        color={color}
        href="/docs/components/3d-book"
        title="3D Book Component"
      >
        <BookPages />
        <BookBack color={color} />
      </Book>
    </div>
  );
}
