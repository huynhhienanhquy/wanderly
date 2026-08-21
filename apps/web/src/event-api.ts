import { eventListSchema, type WanderlyEvent } from '@wanderly/contracts';
export async function fetchEvents(baseUrl: string, fetcher: typeof fetch = fetch): Promise<WanderlyEvent[]> {
  const response = await fetcher(`${baseUrl}/events`);
  if (!response.ok) throw new Error('Không thể tải sự kiện.');
  return eventListSchema.parse(await response.json());
}
