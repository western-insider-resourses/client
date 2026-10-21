"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui";

// Facebook, X, WhatsApp and Google (Gmail) have web share links.
// Instagram and TikTok have no web share link, so we copy the link and open the app/site.
export default function ShareBar({ title }: { title: string }) {
  const [note, setNote] = useState("");
  const [canShare, setCanShare] = useState(false);
  useEffect(() => setCanShare(!!navigator.share), []);

  const url = () => location.href.split("#")[0];
  const open = (href: string): void => {
    window.open(href, "_blank", "noopener,noreferrer,width=640,height=560");
  };
  const copy = async (msg: string) => {
    try {
      await navigator.clipboard.writeText(url());
      setNote(msg);
    } catch {
      setNote("Copy this link from the address bar.");
    }
    setTimeout(() => setNote(""), 4000);
  };

  const items: Array<[string, () => void | Promise<void>]> = [
    [
      "WhatsApp",
      () =>
        open(`https://wa.me/?text=${encodeURIComponent(`${title} ${url()}`)}`),
    ],
    [
      "Facebook",
      () =>
        open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url())}`,
        ),
    ],
    [
      "X",
      () =>
        open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url())}`,
        ),
    ],
    [
      "Google",
      () =>
        open(
          `https://mail.google.com/mail/?view=cm&su=${encodeURIComponent(title)}&body=${encodeURIComponent(url())}`,
        ),
    ],
    [
      "Instagram",
      async () => {
        await copy(
          "Link copied. Paste it into your Instagram story, bio or message.",
        );
        open("https://www.instagram.com/");
      },
    ],
    [
      "TikTok",
      async () => {
        await copy("Link copied. Paste it into your TikTok caption or bio.");
        open("https://www.tiktok.com/");
      },
    ],
    ["Copy link", () => copy("Link copied.")],
  ];

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {canShare && (
          <Button
            variant="primary"
            data-track="share:native"
            onClick={() =>
              navigator.share({ title, url: url() }).catch(() => {})
            }
          >
            Share
          </Button>
        )}
        {items.map(([name, fn]) => (
          <Button
            key={name}
            data-track={`share:${name.toLowerCase().replace(" ", "-")}`}
            onClick={fn}
          >
            {name}
          </Button>
        ))}
      </div>
      <p role="status" className="mt-2 min-h-5 text-sm text-mute">
        {note}
      </p>
    </div>
  );
}
