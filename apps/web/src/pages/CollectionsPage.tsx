import { fetchPlacePage, formatPlacePrice, type PlaceSummary } from '@wanderly/contracts';
import { useEffect, useState } from 'react';
import { Link } from 'react-router';

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:4000';
const collections = [
  { key: 'trending', title: 'Đang được yêu thích', options: { sort: 'popular' as const } },
  { key: 'budget', title: 'Dưới 100k', options: { sort: 'priceAsc' as const, priceMax: 100000 } },
  { key: 'newest', title: 'Mới khám phá', options: { sort: 'newest' as const } },
];

export function CollectionsPage() {
  const [data, setData] = useState<Record<string, PlaceSummary[]>>({});
  const [error, setError] = useState('');
  useEffect(() => { void Promise.all(collections.map(async (collection) => { try { const page = await fetchPlacePage(API_URL, { ...collection.options, limit: 4 }); setData((current) => ({ ...current, [collection.key]: page.data })); } catch { setError('Không thể tải các bộ sưu tập.'); } })); }, []);
  return <main className="page-shell"><Link className="home-link" to="/explore">Khám phá</Link><p className="eyebrow">Wanderly Collections</p><h1>Gợi ý cho hôm nay</h1>{error && <p role="alert">{error}</p>}{collections.map((collection) => <section key={collection.key}><h2>{collection.title}</h2><div className="place-grid">{(data[collection.key] ?? []).map((place) => <article className="place-card" key={place.id}><div className="place-card__body"><h3><Link to={`/places/${place.slug}`}>{place.name}</Link></h3><p>{place.district ?? place.city}</p><span>{formatPlacePrice(place.priceMin, place.priceMax)}</span></div></article>)}</div></section>)}</main>;
}
