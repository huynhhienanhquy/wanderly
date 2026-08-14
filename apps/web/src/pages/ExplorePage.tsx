import {
  fetchPlacePage,
  formatPlacePrice,
  type PlaceSummary,
} from '@wanderly/contracts';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import { Link } from 'react-router';

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:4000';

function PlaceCard({ place }: { place: PlaceSummary }) {
  return (
    <article className="place-card">
      <div className="place-card__image">
        {place.coverImageUrl ? (
          <img src={place.coverImageUrl} alt="" />
        ) : (
          <span>W</span>
        )}
      </div>
      <div className="place-card__body">
        <div className="place-card__meta">
          <span>{place.district ?? place.city}</span>
          <span>★ {place.rating?.toFixed(1) ?? 'Mới'}</span>
        </div>
        <h2>
          <Link to={`/places/${place.slug}`}>{place.name}</Link>
        </h2>
        <p>{place.description ?? place.address}</p>
        <div className="place-card__footer">
          <span>{formatPlacePrice(place.priceMin, place.priceMax)}</span>
          <span>
            {place.categories
              .slice(0, 2)
              .map(({ name }) => name)
              .join(' · ')}
          </span>
        </div>
      </div>
    </article>
  );
}

export function ExplorePage() {
  const [places, setPlaces] = useState<PlaceSummary[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get('q') ?? '';
  const priceMax = searchParams.get('priceMax') ?? '';
  const category = searchParams.get('category') ?? '';
  const minRating = searchParams.get('minRating') ?? '';
  const indoorOutdoor = searchParams.get('indoorOutdoor') ?? '';
  const latitude = searchParams.get('latitude') ?? '';
  const longitude = searchParams.get('longitude') ?? '';
  const radiusMeters = searchParams.get('radiusMeters') ?? '';

  async function load(nextCursor?: string | null) {
    nextCursor ? setLoadingMore(true) : setLoading(true);
    setError('');
    try {
      const page = await fetchPlacePage(API_URL, {
        cursor: nextCursor,
        limit: 12,
        q: q || undefined,
        priceMax: priceMax ? Number(priceMax) : undefined,
        category: category || undefined,
        minRating: minRating ? Number(minRating) : undefined,
        indoorOutdoor: indoorOutdoor ? indoorOutdoor as 'INDOOR' | 'OUTDOOR' | 'MIXED' : undefined,
        latitude: latitude ? Number(latitude) : undefined,
        longitude: longitude ? Number(longitude) : undefined,
        radiusMeters: radiusMeters ? Number(radiusMeters) : undefined,
      });
      setPlaces((current) =>
        nextCursor ? [...current, ...page.data] : page.data,
      );
      setCursor(page.nextCursor);
    } catch (caught) {
      setError(
        caught instanceof Error ? caught.message : 'Không thể tải địa điểm.',
      );
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }

  useEffect(() => {
    void load();
  }, [q, priceMax, category, minRating, indoorOutdoor, latitude, longitude, radiusMeters]);

  function useCurrentLocation() {
    if (!navigator.geolocation) {
      setError('Trình duyệt không hỗ trợ định vị.');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => setSearchParams((current) => {
        const next = new URLSearchParams(current);
        next.set('latitude', String(coords.latitude));
        next.set('longitude', String(coords.longitude));
        next.set('radiusMeters', next.get('radiusMeters') ?? '5000');
        return next;
      }),
      () => setError('Không thể lấy vị trí hiện tại.'),
    );
  }

  return (
    <main className="explore-shell">
      <header className="explore-header">
        <div>
          <p className="eyebrow">Wanderly Explore</p>
          <h1>Đi đâu hôm nay?</h1>
          <p>Khám phá những nơi phù hợp với nhịp điệu và ngân sách của bạn.</p>
        </div>
        <Link className="home-link" to="/">
          Trang chủ
        </Link>
      </header>
      <form className="explore-filters" onSubmit={(event) => { event.preventDefault(); const form = new FormData(event.currentTarget); const next = new URLSearchParams(); ['q', 'priceMax', 'category', 'minRating', 'indoorOutdoor', 'radiusMeters'].forEach((key) => { const value = String(form.get(key) ?? ''); if (value) next.set(key, value); }); if (latitude && longitude && next.has('radiusMeters')) { next.set('latitude', latitude); next.set('longitude', longitude); } setSearchParams(next); }}>
        <input name="q" defaultValue={q} placeholder="Tìm theo tên, quận..." aria-label="Tìm kiếm địa điểm" />
        <select name="priceMax" defaultValue={priceMax} aria-label="Giá tối đa"><option value="">Mọi mức giá</option><option value="100000">Dưới 100k</option><option value="300000">Dưới 300k</option></select>
        <input name="category" defaultValue={category} placeholder="Danh mục (ví dụ: cafe)" aria-label="Danh mục" />
        <select name="minRating" defaultValue={minRating} aria-label="Đánh giá tối thiểu"><option value="">Mọi đánh giá</option><option value="4">Từ 4 sao</option><option value="4.5">Từ 4.5 sao</option></select>
        <select name="indoorOutdoor" defaultValue={indoorOutdoor} aria-label="Không gian"><option value="">Mọi không gian</option><option value="INDOOR">Trong nhà</option><option value="OUTDOOR">Ngoài trời</option><option value="MIXED">Kết hợp</option></select>
        <select name="radiusMeters" defaultValue={radiusMeters} aria-label="Bán kính"><option value="">Không giới hạn khoảng cách</option><option value="2000">Trong 2 km</option><option value="5000">Trong 5 km</option><option value="10000">Trong 10 km</option></select>
        <button type="button" onClick={useCurrentLocation}>{latitude && longitude ? 'Đã dùng vị trí hiện tại' : 'Dùng vị trí hiện tại'}</button>
        <button type="submit">Lọc</button>
        <button type="button" onClick={() => setSearchParams({})}>Xóa bộ lọc</button>
      </form>
      {loading && (
        <p className="state-panel" role="status">
          Đang tìm những địa điểm thú vị…
        </p>
      )}
      {error && (
        <div className="state-panel state-panel--error" role="alert">
          <p>{error}</p>
          <button onClick={() => void load()}>Thử lại</button>
        </div>
      )}
      {!loading && !error && places.length === 0 && (
        <p className="state-panel">Chưa có địa điểm nào để khám phá.</p>
      )}
      <section className="place-grid" aria-label="Danh sách địa điểm">
        {places.map((place) => (
          <PlaceCard key={place.id} place={place} />
        ))}
      </section>
      {cursor && (
        <button
          className="load-more"
          disabled={loadingMore}
          onClick={() => void load(cursor)}
        >
          {loadingMore ? 'Đang tải…' : 'Xem thêm'}
        </button>
      )}
    </main>
  );
}
