export type RemoteFavorite = { id: string; slug: string };

function headers(accessToken: string): HeadersInit {
  return { Authorization: `Bearer ${accessToken}` };
}

export async function fetchRemoteFavorites(baseUrl: string, accessToken: string): Promise<RemoteFavorite[]> {
  const response = await fetch(`${baseUrl}/favorites`, { headers: headers(accessToken) });
  if (!response.ok) throw new Error('Không thể tải địa điểm đã lưu.');
  return response.json() as Promise<RemoteFavorite[]>;
}

export async function addRemoteFavorite(baseUrl: string, accessToken: string, placeId: string): Promise<void> {
  const response = await fetch(`${baseUrl}/favorites/${placeId}`, { method: 'POST', headers: headers(accessToken) });
  if (!response.ok) throw new Error('Không thể lưu địa điểm.');
}

export async function removeRemoteFavorite(baseUrl: string, accessToken: string, placeId: string): Promise<void> {
  const response = await fetch(`${baseUrl}/favorites/${placeId}`, { method: 'DELETE', headers: headers(accessToken) });
  if (!response.ok) throw new Error('Không thể bỏ lưu địa điểm.');
}
