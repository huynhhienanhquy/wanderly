import { fetchPlaceDetail, formatPlacePrice, type PlaceDetail } from '@wanderly/contracts';
import { useEffect, useState } from 'react';
import { Link } from 'react-router';

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:4000';
const FAVORITES_KEY = 'wanderly:favorites';

export function FavoritesPage() {
  const [places, setPlaces] = useState<PlaceDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  useEffect(() => {
    const ids = JSON.parse(localStorage.getItem(FAVORITES_KEY) ?? '[]') as string[];
    void Promise.all(ids.map(async (id) => {
      try { return await fetchPlaceDetail(API_URL, id); } catch { return null; }
    })).then((results) => setPlaces(results.filter((place): place is PlaceDetail => place !== null)))
      .catch(() => setError('Không thể tải địa điểm đã lưu.'))
      .finally(() => setLoading(false));
  }, []);
  return <main className="page-shell"><Link className="home-link" to="/explore">Khám phá</Link><p className="eyebrow">Wanderly Favorites</p><h1>Địa điểm đã lưu</h1>{loading && <p role="status">Đang tải...</p>}{error && <p role="alert">{error}</p>}{!loading && !error && places.length === 0 && <p>Chưa có địa điểm nào được lưu.</p>}<div className="place-grid">{places.map((place) => <article className="place-card" key={place.id}><div className="place-card__body"><h2><Link to={`/places/${place.slug}`}>{place.name}</Link></h2><p>{place.address}</p><span>{formatPlacePrice(place.priceMin, place.priceMax)}</span></div></article>)}</div></main>;
}
