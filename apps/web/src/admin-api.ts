export type AdminReviewReport = {
  id: string;
  reason: string;
  status: 'OPEN' | 'RESOLVED' | 'DISMISSED';
  createdAt: string;
  review: {
    id: string;
    rating: number;
    content: string | null;
    placeId: string;
    status: string;
  };
};

const headers = (accessToken: string): HeadersInit => ({
  Authorization: `Bearer ${accessToken}`,
});

export type AdminPlace = { id: string; name: string; slug: string };
export type AdminCategory = { id: string; name: string; slug: string; isActive: boolean };
export type AdminUser = { id: string; email: string; role: string; status: 'ACTIVE' | 'LOCKED'; profile: { displayName: string } | null };
export type AdminEvent = { id: string; title: string; status: string };

async function adminJson<T>(baseUrl: string, accessToken: string, path: string, init: RequestInit = {}, fetcher: typeof fetch = fetch): Promise<T> {
  const response = await fetcher(`${baseUrl}${path}`, {
    ...init,
    headers: { ...headers(accessToken), ...(init.body ? { 'Content-Type': 'application/json' } : {}), ...init.headers },
  });
  if (!response.ok) throw new Error('Không thể thực hiện thao tác quản trị.');
  return response.status === 204 ? undefined as T : await response.json() as T;
}

export const fetchAdminPlaces = (url: string, token: string, fetcher: typeof fetch = fetch) => adminJson<AdminPlace[]>(url, token, '/admin/catalog/places', {}, fetcher);
export const fetchAdminCategories = (url: string, token: string, fetcher: typeof fetch = fetch) => adminJson<AdminCategory[]>(url, token, '/admin/catalog/categories', {}, fetcher);
export const fetchAdminUsers = (url: string, token: string, fetcher: typeof fetch = fetch) => adminJson<AdminUser[]>(url, token, '/admin/users', {}, fetcher);
export const fetchAdminEvents = (url: string, token: string, fetcher: typeof fetch = fetch) => adminJson<AdminEvent[]>(url, token, '/events/admin', {}, fetcher);
export const createAdminPlace = (url: string, token: string, input: unknown) => adminJson<AdminPlace>(url, token, '/admin/catalog/places', { method: 'POST', body: JSON.stringify(input) });
export const createAdminCategory = (url: string, token: string, input: { slug: string; name: string }) => adminJson<AdminCategory>(url, token, '/admin/catalog/categories', { method: 'POST', body: JSON.stringify(input) });
export const createAdminEvent = (url: string, token: string, input: unknown) => adminJson<AdminEvent>(url, token, '/events', { method: 'POST', body: JSON.stringify(input) });
export const deleteAdminResource = (url: string, token: string, path: string) => adminJson<void>(url, token, path, { method: 'DELETE' });
export const updateAdminUserStatus = (url: string, token: string, id: string, status: AdminUser['status']) => adminJson<AdminUser>(url, token, `/admin/users/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }) });

export async function checkAdminAccess(
  baseUrl: string,
  accessToken: string,
  fetcher: typeof fetch = fetch,
) {
  const response = await fetcher(`${baseUrl}/auth/admin-check`, {
    headers: headers(accessToken),
  });
  return response.ok;
}

export async function fetchAdminReports(
  baseUrl: string,
  accessToken: string,
  status: AdminReviewReport['status'] = 'OPEN',
  fetcher: typeof fetch = fetch,
): Promise<AdminReviewReport[]> {
  const response = await fetcher(
    `${baseUrl}/admin/review-reports?status=${status}`,
    { headers: headers(accessToken) },
  );
  if (!response.ok) throw new Error('Không thể tải danh sách báo cáo.');
  return (await response.json()) as AdminReviewReport[];
}

export async function moderateAdminReport(
  baseUrl: string,
  accessToken: string,
  reportId: string,
  hideReview: boolean,
  fetcher: typeof fetch = fetch,
) {
  const response = await fetcher(`${baseUrl}/admin/review-reports/${reportId}`, {
    method: 'PATCH',
    headers: { ...headers(accessToken), 'Content-Type': 'application/json' },
    body: JSON.stringify({ status: 'RESOLVED', hideReview }),
  });
  if (!response.ok) throw new Error('Không thể xử lý báo cáo.');
}
