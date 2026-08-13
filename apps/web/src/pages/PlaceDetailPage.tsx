import {
  fetchPlaceDetail,
  formatPlacePrice,
  type PlaceDetail,
} from '@wanderly/contracts';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:4000';
const DAYS = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];

export function PlaceDetailPage() {
  const { slug } = useParams();
  const [place, setPlace] = useState<PlaceDetail | null>(null);
  const [error, setError] = useState('');
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
