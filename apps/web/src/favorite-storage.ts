export type FavoritePlace = { id: string; slug: string };

export function parseFavorites(raw: string | null): FavoritePlace[] {
  if (!raw) return [];
  try {
    const value: unknown = JSON.parse(raw);
    if (!Array.isArray(value)) return [];
    const unique = new Map<string, FavoritePlace>();
    for (const item of value) {
      if (
        item &&
        typeof item === 'object' &&
        'id' in item &&
        'slug' in item &&
        typeof item.id === 'string' &&
        typeof item.slug === 'string'
      ) unique.set(item.id, { id: item.id, slug: item.slug });
    }
    return [...unique.values()];
  } catch {
    return [];
  }
}

export function toggleFavorite(
  favorites: FavoritePlace[],
  place: FavoritePlace,
): FavoritePlace[] {
  return favorites.some(({ id }) => id === place.id)
    ? favorites.filter(({ id }) => id !== place.id)
    : [...favorites, place];
}
