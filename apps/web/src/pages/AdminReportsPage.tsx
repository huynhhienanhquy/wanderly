import { useEffect, useState } from 'react';
import { Link } from 'react-router';

const REPORTS_KEY = 'wanderly:review-reports';
const RESOLVED_KEY = 'wanderly:resolved-reports';

export function AdminReportsPage() {
  const [reports, setReports] = useState<string[]>([]);
  const [resolved, setResolved] = useState<string[]>([]);
  useEffect(() => {
    setReports(JSON.parse(localStorage.getItem(REPORTS_KEY) ?? '[]') as string[]);
    setResolved(JSON.parse(localStorage.getItem(RESOLVED_KEY) ?? '[]') as string[]);
  }, []);
  function resolve(report: string) {
    const next = [...new Set([...resolved, report])];
    localStorage.setItem(RESOLVED_KEY, JSON.stringify(next));
    setResolved(next);
  }
  return <main className="page-shell"><Link className="home-link" to="/">Trang chủ</Link><p className="eyebrow">Wanderly Admin</p><h1>Báo cáo review</h1>{reports.length === 0 ? <p>Chưa có báo cáo nào.</p> : <div>{reports.map((report) => <article className="detail-section" key={report}><p>{report}</p><button type="button" onClick={() => resolve(report)} disabled={resolved.includes(report)}>{resolved.includes(report) ? 'Đã xử lý' : 'Đánh dấu đã xử lý'}</button></article>)}</div>}</main>;
}
