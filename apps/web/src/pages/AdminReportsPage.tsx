import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router';
import {
  fetchAdminReports,
  moderateAdminReport,
  type AdminReviewReport,
} from '../admin-api';

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:4000';

export function AdminReportsPage() {
  const [reports, setReports] = useState<AdminReviewReport[]>([]);
  const [error, setError] = useState('');
  const [processing, setProcessing] = useState<string | null>(null);
  const accessToken = sessionStorage.getItem('wanderlyAccessToken') ?? '';

  const loadReports = useCallback(async () => {
    try {
      setError('');
      setReports(await fetchAdminReports(API_URL, accessToken));
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : 'Đã có lỗi xảy ra.');
    }
  }, [accessToken]);

  useEffect(() => {
    void loadReports();
  }, [loadReports]);

  async function resolve(reportId: string, hideReview: boolean) {
    try {
      setProcessing(reportId);
      setError('');
      await moderateAdminReport(API_URL, accessToken, reportId, hideReview);
      setReports((current) => current.filter((report) => report.id !== reportId));
    } catch (moderateError) {
      setError(moderateError instanceof Error ? moderateError.message : 'Đã có lỗi xảy ra.');
    } finally {
      setProcessing(null);
    }
  }

  return (
    <main className="page-shell">
      <nav><Link className="home-link" to="/">Trang chủ</Link></nav>
      <p className="eyebrow">Wanderly Admin</p>
      <h1>Kiểm duyệt báo cáo review</h1>
      {error && <p role="alert">{error}</p>}
      {reports.length === 0 ? <p>Không có báo cáo đang chờ xử lý.</p> : (
        <section aria-label="Báo cáo đang chờ xử lý">
          {reports.map((report) => (
            <article className="detail-section" key={report.id}>
              <h2>Review {report.review.id}</h2>
              <p><strong>Lý do:</strong> {report.reason}</p>
              <p>{report.review.content ?? 'Review không có nội dung chữ.'}</p>
              <p>Đánh giá: {report.review.rating}/5 · Địa điểm: {report.review.placeId}</p>
              <button type="button" disabled={processing === report.id} onClick={() => void resolve(report.id, false)}>
                Giữ review và đóng báo cáo
              </button>{' '}
              <button type="button" disabled={processing === report.id} onClick={() => void resolve(report.id, true)}>
                Ẩn review và đóng báo cáo
              </button>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}
