"use client";

import type { Ad, AdPlacement } from "@/lib/types";
import { useAds } from "@/hooks/api/useAds";
import { getErrorMessage } from "@/services/client";
import AdView from "./AdView";

export default function AdSlot({
  placement,
  className = "",
}: {
  placement: AdPlacement;
  className?: string;
}) {
  const query = useAds(placement);
  const ad: Ad | undefined = query.data?.[0];
  if (query.isPending)
    return (
      <p
        role="status"
        className={
          className ? `text-sm text-mute ${className}` : "text-sm text-mute"
        }
      >
        Loading advertisement...
      </p>
    );
  if (query.error)
    return (
      <p
        role="alert"
        className={
          className
            ? `text-sm text-red-700 ${className}`
            : "text-sm text-red-700"
        }
      >
        {getErrorMessage(query.error)}
      </p>
    );
  if (!ad) return null;

  return (
    <aside aria-label="Advertisement" className={className}>
      <p className="mb-1 text-center text-[11px] font-semibold uppercase tracking-wider text-slate-400">
        Advertisement
      </p>
      <AdView ad={ad} width={placement === "sidebar" ? 420 : 1000} />
    </aside>
  );
}
