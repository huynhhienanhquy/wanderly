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
