'use client';

import { useQuery } from '@tanstack/react-query';
import { listCategoriesApi } from '../../services/api/categories.api';
import { clientQueryKeys } from './clientQuery';

export function useCategories() {
  return useQuery({
    queryKey: clientQueryKeys.categories(),
    queryFn: listCategoriesApi,
  });
}
