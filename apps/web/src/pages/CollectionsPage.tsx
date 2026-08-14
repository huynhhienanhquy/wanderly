import { fetchPlacePage, formatPlacePrice, type PlaceSummary } from '@wanderly/contracts';
import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { collections } from '../collections';

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:4000';

export function CollectionsPage() {
  const [data, setData] = useState<Record<string, PlaceSummary[]>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  useEffect(() => {
    for (const collection of collections) {
      void fetchPlacePage(API_URL, { ...collection.options, limit: 4 })
        .then((page) => setData((current) => ({ ...current, [collection.key]: page.data })))
        .catch(() => setErrors((current) => ({ ...current, [collection.key]: 'Không thể tải bộ sưu tập này.' })));
    }
  }, []);
  return <main className="page-shell"><Link className="home-link" to="/explore">Khám phá</Link><p className="eyebrow">Wanderly Collections</p><h1>Gợi ý cho hôm nay</h1>{collections.map((collection) => <section key={collection.key}><h2>{collection.title}</h2><p>{collection.description}</p>{errors[collection.key] && <p role="alert">{errors[collection.key]}</p>}<div className="place-grid">{(data[collection.key] ?? []).map((place) => <article className="place-card" key={place.id}><div className="place-card__body"><h3><Link to={`/places/${place.slug}`}>{place.name}</Link></h3><p>{place.district ?? place.city}</p><span>{formatPlacePrice(place.priceMin, place.priceMax)}</span></div></article>)}</div></section>)}</main>;
}
