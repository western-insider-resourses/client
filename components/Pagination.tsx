import { Button } from "@/components/ui";

export default function Pagination({
  page,
  pages,
  base,
}: {
  page: number;
  pages: number;
  base: string;
}) {
  if (pages <= 1) return null;
  const href = (p: number) =>
    `${base}${base.includes("?") ? "&" : "?"}page=${p}`;
  return (
    <nav aria-label="Pages" className="mt-8 flex items-center justify-between">
      {page > 1 ? (
        <Button href={href(page - 1)}>Newer stories</Button>
      ) : (
        <span />
      )}
      <span className="text-sm text-mute">
        Page {page} of {pages}
      </span>
      {page < pages ? (
        <Button variant="primary" href={href(page + 1)}>
          Older stories
        </Button>
      ) : (
        <span />
      )}
    </nav>
  );
}
