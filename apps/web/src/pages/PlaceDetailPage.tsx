import {
  fetchPlaceDetail,
  formatPlacePrice,
  type PlaceDetail,
} from '@wanderly/contracts';
import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useParams } from 'react-router';

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:4000';
const DAYS = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
const PLAN_KEY = 'wanderly:current-plan';
const FAVORITES_KEY = 'wanderly:favorites';
const REVIEWS_KEY = 'wanderly:reviews';
const REPORTS_KEY = 'wanderly:review-reports';

export function PlaceDetailPage() {
  const { slug } = useParams();
  const [place, setPlace] = useState<PlaceDetail | null>(null);
  const [error, setError] = useState('');
  const [shareMessage, setShareMessage] = useState('');
  const [planMessage, setPlanMessage] = useState('');
  const [favorite, setFavorite] = useState(false);
  const [reviewRating, setReviewRating] = useState('5');
  const [reviewContent, setReviewContent] = useState('');
  const [reviewMessage, setReviewMessage] = useState('');
  const [reviews, setReviews] = useState<Array<{ rating: number; content: string; createdAt: string }>>([]);
  const [reportedReviews, setReportedReviews] = useState<string[]>([]);
  useEffect(() => {
    if (place) {
      const ids = JSON.parse(localStorage.getItem(FAVORITES_KEY) ?? '[]') as string[];
      setFavorite(ids.includes(place.id));
    }
  }, [place]);
  useEffect(() => {
    if (!place) return;
    const all = JSON.parse(localStorage.getItem(REVIEWS_KEY) ?? '[]') as Array<{ placeId: string; rating: number; content: string; createdAt: string }>;
    setReviews(all.filter((review) => review.placeId === place.id).slice(-20).reverse());
    setReportedReviews(JSON.parse(localStorage.getItem(REPORTS_KEY) ?? '[]') as string[]);
  }, [place, reviewMessage]);
  function reportReview(review: { createdAt: string }) {
    const key = `${place?.id}:${review.createdAt}`;
    const reports = JSON.parse(localStorage.getItem(REPORTS_KEY) ?? '[]') as string[];
    if (reports.includes(key)) return;
    const next = [...reports, key];
    localStorage.setItem(REPORTS_KEY, JSON.stringify(next));
    setReportedReviews(next);
  }
  function toggleFavorite() {
    if (!place) return;
    const ids = JSON.parse(localStorage.getItem(FAVORITES_KEY) ?? '[]') as string[];
    const next = ids.includes(place.id) ? ids.filter((id) => id !== place.id) : [...ids, place.id];
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(next));
    setFavorite(next.includes(place.id));
  }
  function submitReview(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!place) return;
    const reviews = JSON.parse(localStorage.getItem(REVIEWS_KEY) ?? '[]') as unknown[];
    reviews.push({ placeId: place.id, rating: Number(reviewRating), content: reviewContent.trim(), createdAt: new Date().toISOString() });
    localStorage.setItem(REVIEWS_KEY, JSON.stringify(reviews));
    setReviewContent('');
    setReviewMessage('Đã lưu đánh giá nháp.');
  }
  function addToPlan() {
    if (!place) return;
    const current = JSON.parse(localStorage.getItem(PLAN_KEY) ?? '[]') as Array<{ id: string; slug: string; name: string }>;
    if (current.some((item) => item.id === place.id)) { setPlanMessage('Địa điểm đã có trong kế hoạch.'); return; }
    localStorage.setItem(PLAN_KEY, JSON.stringify([...current, { id: place.id, slug: place.slug, name: place.name }]));
    setPlanMessage('Đã thêm vào kế hoạch.');
  }
  function openDirections() {
    if (!place) return;
    const destination = encodeURIComponent(`${place.latitude},${place.longitude}`);
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${destination}`, '_blank', 'noopener,noreferrer');
  }
  async function sharePlace() {
    if (!place) return;
    const url = window.location.href;
    try {
      if (navigator.share) await navigator.share({ title: place.name, text: place.address, url });
      else { await navigator.clipboard.writeText(url); setShareMessage('Đã sao chép liên kết.'); }
    } catch { setShareMessage('Chia sẻ đã bị hủy.'); }
  }
  useEffect(() => {
    if (slug)
      void fetchPlaceDetail(API_URL, slug)
        .then(setPlace)
        .catch((e) =>
          setError(e instanceof Error ? e.message : 'Không thể tải địa điểm.'),
        );
  }, [slug]);
  if (error)
    return (
      <main className="detail-shell">
        <Link to="/explore" className="detail-back">
          ← Khám phá
        </Link>
        <p className="state-message">{error}</p>
      </main>
    );
  if (!place)
    return (
      <main className="detail-shell">
        <p className="state-message">Đang tải địa điểm…</p>
      </main>
    );
  return (
    <main className="detail-shell">
      <Link to="/explore" className="detail-back">
        ← Khám phá
      </Link>
      <section className="detail-hero">
        {place.coverImageUrl ? (
          <img src={place.coverImageUrl} alt={place.name} />
        ) : (
          <div className="detail-image-fallback">W</div>
        )}
      </section>
      <section className="detail-content">
        <p className="eyebrow">{place.district ?? place.city}</p>
        <h1>{place.name}</h1>
        <div className="detail-kpis">
          <span>
            ★ {place.rating?.toFixed(1) ?? 'Mới'} ({place.reviewCount})
          </span>
          <span>{formatPlacePrice(place.priceMin, place.priceMax)}</span>
        </div>
        <p className="detail-address">
          {place.address} · {place.city}
        </p>
        <div className="detail-actions">
          <button type="button" onClick={openDirections}>Chỉ đường</button>
          <button type="button" onClick={() => void sharePlace()}>Chia sẻ</button>
          {shareMessage && <span role="status">{shareMessage}</span>}
          <button type="button" onClick={addToPlan}>Thêm vào kế hoạch</button>
          {planMessage && <span role="status">{planMessage}</span>}
          <button type="button" onClick={toggleFavorite} aria-pressed={favorite}>{favorite ? 'Đã lưu' : 'Lưu địa điểm'}</button>
        </div>
        {place.description && (
          <p className="detail-description">{place.description}</p>
        )}
        <div className="detail-section">
          <h2>Thông tin</h2>
          <div className="category-list">
            {place.categories.map((category) => (
              <span className="category-pill" key={category.slug}>
                {category.name}
              </span>
            ))}
          </div>
        </div>
        <div className="detail-section"><h2>Đánh giá của bạn</h2><form onSubmit={submitReview}><label>Điểm <select value={reviewRating} onChange={(event) => setReviewRating(event.target.value)}>{[5, 4, 3, 2, 1].map((value) => <option key={value} value={value}>{value}/5</option>)}</select></label><textarea value={reviewContent} onChange={(event) => setReviewContent(event.target.value)} maxLength={1000} placeholder="Chia sẻ trải nghiệm của bạn" /><button type="submit">Gửi đánh giá</button>{reviewMessage && <span role="status">{reviewMessage}</span>}</form></div>
        <div className="detail-section"><h2>Đánh giá gần đây ({reviews.length})</h2>{reviews.length === 0 ? <p>Chưa có đánh giá nào.</p> : reviews.map((review, index) => { const key = `${place.id}:${review.createdAt}`; return <article key={`${review.createdAt}-${index}`}><b>{'★'.repeat(review.rating)}</b><p>{review.content || 'Không có nội dung.'}</p><small>{new Date(review.createdAt).toLocaleDateString('vi-VN')}</small><button type="button" onClick={() => reportReview(review)} disabled={reportedReviews.includes(key)}>{reportedReviews.includes(key) ? 'Đã báo cáo' : 'Báo cáo'}</button></article>; })}</div>
        <div className="detail-section">
          <h2>Giờ mở cửa</h2>
          <div className="hours-grid">
            {place.openingHours.map((hour) => (
              <div key={hour.dayOfWeek}>
                <b>{DAYS[hour.dayOfWeek]}</b>
                <span>
                  {hour.isClosed
                    ? 'Đóng cửa'
                    : `${hour.open ?? ''} – ${hour.close ?? ''}`}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
