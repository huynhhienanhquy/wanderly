export const routes = {
  home: '/',
  explore: '/explore',
  place: '/places/:slug',
  placeDetail: (slug: string) => `/places/${encodeURIComponent(slug)}`,
  collections: '/collections',
  favorites: '/favorites',
  plans: '/plans',
  sharedPlan: '/plans/shared/:shareToken',
  newPlan: '/plan/new',
  register: '/register',
  login: '/login',
  logout: '/logout',
  forgotPassword: '/forgot-password',
  resetPassword: '/reset-password',
  profile: '/profile',
  preferences: '/onboarding/preferences',
  adminReports: '/admin/reports',
  admin: '/admin',
} as const;

export const hasWebSession = (storage: Pick<Storage, 'getItem'>) =>
  Boolean(storage.getItem('wanderlyAccessToken'));
