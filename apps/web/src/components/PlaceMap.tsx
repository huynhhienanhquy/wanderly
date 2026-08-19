import { googleMapsDirectionsUrl } from '@wanderly/contracts';

export function PlaceMap({ latitude, longitude, name }: { latitude: number; longitude: number; name: string }) {
  const query = encodeURIComponent(`${latitude},${longitude}`);
  return <section className="detail-section" aria-label={`Bản đồ ${name}`}><h2>Vị trí</h2><iframe title={`Bản đồ ${name}`} src={`https://www.google.com/maps?q=${query}&output=embed`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" style={{ border: 0, borderRadius: 16, width: '100%', height: 320 }} /><p><a className="home-link" href={googleMapsDirectionsUrl({ latitude, longitude })} target="_blank" rel="noreferrer">Mở trong Google Maps</a></p></section>;
}
