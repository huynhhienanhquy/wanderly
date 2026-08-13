import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { parsePlanItems, sortPlanItems, type LocalPlanItem, type LocalPlanMeta } from '../plan-storage';

const PLAN_KEY = 'wanderly:current-plan';
const META_KEY = 'wanderly:plan-meta';

export function PlansPage() {
  const [items, setItems] = useState<LocalPlanItem[]>([]);
  const [meta, setMeta] = useState<LocalPlanMeta>({ title: 'Kế hoạch cuối tuần', date: '', budget: '' });
  const [message, setMessage] = useState('');
  useEffect(() => {
    setItems(sortPlanItems(parsePlanItems(localStorage.getItem(PLAN_KEY))));
    try { setMeta((current) => ({ ...current, ...JSON.parse(localStorage.getItem(META_KEY) ?? '{}') as Partial<LocalPlanMeta> })); } catch { /* use defaults */ }
  }, []);
  function persistItems(next: LocalPlanItem[]) { const sorted = sortPlanItems(next); localStorage.setItem(PLAN_KEY, JSON.stringify(sorted)); setItems(sorted); }
  function saveMeta() { localStorage.setItem(META_KEY, JSON.stringify(meta)); setMessage('Đã lưu thông tin kế hoạch.'); }
  function updateTime(id: string, startTime: string) { persistItems(items.map((item) => item.id === id ? { ...item, startTime } : item)); }
  return <main className="page-shell"><Link className="home-link" to="/explore">Khám phá</Link><p className="eyebrow">Wanderly Planner</p><h1>{meta.title}</h1><form onSubmit={(event) => { event.preventDefault(); saveMeta(); }}><input value={meta.title} onChange={(event) => setMeta({ ...meta, title: event.target.value })} aria-label="Tên kế hoạch" required /><input type="date" value={meta.date} onChange={(event) => setMeta({ ...meta, date: event.target.value })} aria-label="Ngày kế hoạch" /><input type="number" min="0" value={meta.budget} onChange={(event) => setMeta({ ...meta, budget: event.target.value })} aria-label="Ngân sách" placeholder="Ngân sách (VND)" /><button type="submit">Lưu</button>{message && <span role="status">{message}</span>}</form>{items.length === 0 ? <p>Chưa có địa điểm trong kế hoạch.</p> : <ol>{items.map((item) => <li key={item.id}><input type="time" value={item.startTime} onChange={(event) => updateTime(item.id, event.target.value)} aria-label={`Giờ bắt đầu ${item.name}`} /> <Link to={`/places/${item.slug}`}>{item.name}</Link> <button type="button" onClick={() => persistItems(items.filter(({ id }) => id !== item.id))}>Xóa</button></li>)}</ol>}</main>;
}
