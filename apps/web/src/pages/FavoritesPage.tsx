import { fetchPlaceDetail, formatPlacePrice, type PlaceDetail } from '@wanderly/contracts';
import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { parseFavorites } from '../favorite-storage';

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:4000';
const FAVORITES_KEY = 'wanderly:favorites';

export function FavoritesPage() {
  const [places, setPlaces] = useState<PlaceDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [unavailableCount, setUnavailableCount] = useState(0);

  useEffect(() => {
    const favorites = parseFavorites(localStorage.getItem(FAVORITES_KEY));
    void Promise.all(favorites.map(({ slug }) => fetchPlaceDetail(API_URL, slug).catch(() => null)))
      .then((results) => {
        setPlaces(results.filter((place): place is PlaceDetail => place !== null));
        setUnavailableCount(results.filter((place) => place === null).length);
      })
      .finally(() => setLoading(false));
  }, []);

  function removeFavorite(placeId: string) {
    const next = parseFavorites(localStorage.getItem(FAVORITES_KEY)).filter(({ id }) => id !== placeId);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(next));
    setPlaces((current) => current.filter(({ id }) => id !== placeId));
  }

  return (
    <main className="page-shell">
      <nav aria-label="Điều hướng Favorites"><Link className="home-link" to="/explore">Khám phá</Link> <Link className="home-link" to="/plans">Kế hoạch</Link></nav>
      <p className="eyebrow">Wanderly Favorites</p>
      <h1>Địa điểm đã lưu</h1>
      {loading && <p role="status">Đang tải...</p>}
      {unavailableCount > 0 && <p role="status">Đã bỏ qua {unavailableCount} địa điểm không còn khả dụng.</p>}
      {!loading && places.length === 0 && <p>Chưa có địa điểm nào được lưu.</p>}
      <div className="place-grid">
        {places.map((place) => (
          <article className="place-card" key={place.id}>
            <div className="place-card__body">
              <h2><Link to={`/places/${place.slug}`}>{place.name}</Link></h2>
              <p>{place.address}</p>
              <span>{formatPlacePrice(place.priceMin, place.priceMax)}</span>
              <button type="button" onClick={() => removeFavorite(place.id)}>Bỏ lưu</button>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
