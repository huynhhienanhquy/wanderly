import { fetchPlaceDetail, type PlaceDetail } from '@wanderly/contracts';
import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { isOpenAt } from '../plan-opening-hours';
import { parsePlanItems, sortPlanItems, type LocalPlanItem, type LocalPlanMeta } from '../plan-storage';

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:4000';
const PLAN_KEY = 'wanderly:current-plan';
const META_KEY = 'wanderly:plan-meta';

export function PlansPage() {
  const [items, setItems] = useState<LocalPlanItem[]>([]);
  const [details, setDetails] = useState<Record<string, PlaceDetail>>({});
  const [meta, setMeta] = useState<LocalPlanMeta>({ title: 'Kế hoạch cuối tuần', date: '', budget: '' });
  const [message, setMessage] = useState('');
  useEffect(() => {
    setItems(sortPlanItems(parsePlanItems(localStorage.getItem(PLAN_KEY))));
    try { setMeta((current) => ({ ...current, ...JSON.parse(localStorage.getItem(META_KEY) ?? '{}') as Partial<LocalPlanMeta> })); } catch { /* use defaults */ }
  }, []);
  useEffect(() => {
    void Promise.all(items.map((item) => fetchPlaceDetail(API_URL, item.slug).catch(() => null))).then((places) =>
      setDetails(Object.fromEntries(places.filter((place): place is PlaceDetail => place !== null).map((place) => [place.id, place]))),
    );
  }, [items]);
  function persistItems(next: LocalPlanItem[]) { const sorted = sortPlanItems(next); localStorage.setItem(PLAN_KEY, JSON.stringify(sorted)); setItems(sorted); }
  function saveMeta() { localStorage.setItem(META_KEY, JSON.stringify(meta)); setMessage('Đã lưu thông tin kế hoạch.'); }
  function updateTime(item: LocalPlanItem, startTime: string) {
    const detail = details[item.id];
    if (detail && isOpenAt(detail.openingHours, meta.date, startTime) === false) { setMessage(`${item.name} không mở cửa vào giờ đã chọn.`); return; }
    persistItems(items.map((current) => current.id === item.id ? { ...current, startTime } : current));
    setMessage('');
  }
  return (
    <main className="page-shell">
      <Link className="home-link" to="/explore">Khám phá</Link><p className="eyebrow">Wanderly Planner</p><h1>{meta.title}</h1>
      <form onSubmit={(event) => { event.preventDefault(); saveMeta(); }}><input value={meta.title} onChange={(event) => setMeta({ ...meta, title: event.target.value })} aria-label="Tên kế hoạch" required /><input type="date" value={meta.date} onChange={(event) => setMeta({ ...meta, date: event.target.value })} aria-label="Ngày kế hoạch" /><input type="number" min="0" value={meta.budget} onChange={(event) => setMeta({ ...meta, budget: event.target.value })} aria-label="Ngân sách" placeholder="Ngân sách (VND)" /><button type="submit">Lưu</button>{message && <span role="status">{message}</span>}</form>
      {items.length === 0 ? <p>Chưa có địa điểm trong kế hoạch.</p> : <ol>{items.map((item) => { const open = details[item.id] ? isOpenAt(details[item.id]!.openingHours, meta.date, item.startTime) : null; return <li key={item.id}><input type="time" value={item.startTime} onChange={(event) => updateTime(item, event.target.value)} aria-label={`Giờ bắt đầu ${item.name}`} /> <Link to={`/places/${item.slug}`}>{item.name}</Link>{open === false && <strong> — Ngoài giờ mở cửa</strong>} <button type="button" onClick={() => persistItems(items.filter(({ id }) => id !== item.id))}>Xóa</button></li>; })}</ol>}
    </main>
  );
}
