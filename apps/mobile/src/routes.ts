export const mobileRoutes = {
  home: '/' as const,
  explore: '/explore' as const,
  map: '/map' as const,
  login: '/login' as const,
  register: '/register' as const,
  profile: '/profile' as const,
  plan: '/plan' as const,
  place: (slug: string) => ({ pathname: '/places/[slug]' as const, params: { slug } }),
} as const;
