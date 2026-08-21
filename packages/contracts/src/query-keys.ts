export type QueryKeyFilters = Readonly<Record<string, string | number | boolean | undefined>>;

const stableQuery = (query: QueryKeyFilters) => Object.fromEntries(
  Object.entries(query).filter((entry) => entry[1] !== undefined).sort(([left], [right]) => left.localeCompare(right)),
);

export const queryKeys = {
  places: {
    all: ['places'] as const,
    lists: () => ['places', 'list'] as const,
    list: (query: QueryKeyFilters) => ['places', 'list', stableQuery(query)] as const,
    detail: (slug: string) => ['places', 'detail', slug] as const,
  },
  plans: {
    all: ['plans'] as const,
    list: () => ['plans', 'list'] as const,
    detail: (id: string) => ['plans', 'detail', id] as const,
  },
  profile: (userId: string) => ['users', userId, 'profile'] as const,
  preferences: (userId: string) => ['users', userId, 'preferences'] as const,
  favorites: (userId: string) => ['users', userId, 'favorites'] as const,
  events: (query: QueryKeyFilters = {}) => ['events', stableQuery(query)] as const,
} as const;
