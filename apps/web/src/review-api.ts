import type { Review } from '@wanderly/contracts';

export async function fetchReviews(baseUrl: string, placeId: string): Promise<Review[]> {
  const response = await fetch(`${baseUrl}/places/${placeId}/reviews`);
  if (!response.ok) throw new Error('Không thể tải đánh giá.');
  return response.json() as Promise<Review[]>;
}

export async function upsertReview(baseUrl: string, accessToken: string, placeId: string, rating: number, content: string): Promise<Review> {
  const response = await fetch(`${baseUrl}/places/${placeId}/reviews/me`, {
    method: 'PATCH',
    headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ rating, content: content || null }),
  });
  if (!response.ok) throw new Error('Không thể lưu đánh giá.');
  return response.json() as Promise<Review>;
}
