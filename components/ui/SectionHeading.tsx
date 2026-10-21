import type { ReactNode } from "react";

// Serif heading with the crimson rule underneath, used for sidebar boxes, comments, related stories...
export default function SectionHeading({
  children,
  as: Tag = "h2",
  id,
}: {
  children: ReactNode;
  as?: "h1" | "h2" | "h3";
  id?: string;
}) {
  return (
    <>
      <Tag id={id} className="font-serif text-2xl font-bold">
        {children}
      </Tag>
      <div className="mb-3 mt-1 h-0.5 w-full bg-crimson" />
    </>
  );
}
