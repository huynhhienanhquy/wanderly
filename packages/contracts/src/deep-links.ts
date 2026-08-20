export type WanderlyDeepLink =
  | { type: 'place'; slug: string }
  | { type: 'plan'; shareToken: string };

const cleanSegment = (value: string) => encodeURIComponent(value.trim());

export const toWebPath = (link: WanderlyDeepLink) => link.type === 'place'
  ? `/places/${cleanSegment(link.slug)}`
  : `/plans/shared/${cleanSegment(link.shareToken)}`;

export const toAppUrl = (link: WanderlyDeepLink) => `wanderly://${toWebPath(link).slice(1)}`;

export const toWebUrl = (origin: string, link: WanderlyDeepLink) =>
  new URL(toWebPath(link), origin.endsWith('/') ? origin : `${origin}/`).toString();

export const parseWanderlyLink = (value: string): WanderlyDeepLink | null => {
  let url: URL;
  try {
    url = new URL(value, 'https://wanderly.local');
  } catch {
    return null;
  }

  const segments = url.protocol === 'wanderly:'
    ? [url.hostname, ...url.pathname.split('/').filter(Boolean)]
    : url.pathname.split('/').filter(Boolean);
  const [resource, marker, identifier] = segments;
  if (resource === 'places' && marker) return { type: 'place', slug: decodeURIComponent(marker) };
  if (resource === 'plans' && marker === 'shared' && identifier) {
    return { type: 'plan', shareToken: decodeURIComponent(identifier) };
  }
  return null;
};
