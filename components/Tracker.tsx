"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useTrackEvent } from "@/hooks/api/useTracking";
import { useVisitorId } from "@/hooks/useVisitorId";

export default function Tracker() {
  const pathname = usePathname();
  const visitorId = useVisitorId();
  const tracking = useTrackEvent();

  useEffect(() => {
    if (!visitorId) return;
    tracking.mutate({
      type: "view",
      path: pathname,
      referrer: document.referrer,
      visitorId,
    });
  }, [pathname, visitorId]);

  useEffect(() => {
    if (!visitorId) return;
    const onClick = (event: MouseEvent) => {
      const target = (event.target as Element | null)?.closest<HTMLElement>(
        "[data-track]",
      );
      if (target?.dataset.track) {
        tracking.mutate({
          type: "click",
          path: location.pathname,
          target: target.dataset.track,
          visitorId,
        });
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [tracking.mutate, visitorId]);

  useEffect(() => {
    if (!tracking.error) return;
    console.error("Analytics tracking failed:", tracking.error);
  }, [tracking.error]);

  return null;
}
