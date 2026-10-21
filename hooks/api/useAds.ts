"use client";

import { useQuery } from "@tanstack/react-query";
import { listAdsApi } from "../../services/api/ads.api";
import type { PublicAdPlacement } from "../../services/api/types";
import { clientQueryKeys } from "./clientQuery";

export function useAds(placement?: PublicAdPlacement) {
  return useQuery({
    queryKey: clientQueryKeys.ads(placement),
    queryFn: () => listAdsApi(placement),
  });
}
