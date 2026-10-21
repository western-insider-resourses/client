"use client";

import { cl } from "@/lib/utils";
import type { Ad } from "@/lib/types";

export default function AdView({
  ad,
  width = 900,
}: {
  ad: Ad;
  width?: number;
}) {
  if (ad.html_code) {
    return (
      <iframe
        title={`Advertisement: ${ad.name}`}
        srcDoc={ad.html_code}
        sandbox="allow-scripts"
        referrerPolicy="no-referrer"
        data-track={`ad:${ad.id}`}
        className="mx-auto min-h-24 w-full border-0"
      />
    );
  }

  if (!ad.image_url) return null;
  const image = (
    <img
      src={cl(ad.image_url, width)}
      alt={ad.name}
      loading="lazy"
      className="mx-auto h-auto max-w-full rounded-lg"
    />
  );
  return ad.link_url ? (
    <a
      href={ad.link_url}
      target="_blank"
      rel="sponsored noopener noreferrer"
      data-track={`ad:${ad.id}`}
    >
      {image}
    </a>
  ) : (
    image
  );
}
