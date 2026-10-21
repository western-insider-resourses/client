import { api } from '../client';
import { PUBLIC_ENDPOINT } from './public.api';
import type { CategoriesResponse } from './types';

export async function listCategoriesApi(): Promise<CategoriesResponse> {
  const { data } = await api.get<CategoriesResponse>(`${PUBLIC_ENDPOINT}/categories`);
  return data;
}
