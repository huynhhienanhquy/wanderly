import { Link } from 'react-router';
import { useEffect, useState } from 'react';

const PLAN_KEY = 'wanderly:current-plan';
const PLAN_META_KEY = 'wanderly:plan-meta';
type PlanItem = { id: string; slug: string; name: string };

export function PlansPage() {
  const [items, setItems] = useState<PlanItem[]>([]);
  const [title, setTitle] = useState('Kế hoạch cuối tuần');
  const [date, setDate] = useState('');
  useEffect(() => { setItems(JSON.parse(localStorage.getItem(PLAN_KEY) ?? '[]') as PlanItem[]); const meta = JSON.parse(localStorage.getItem(PLAN_META_KEY) ?? '{}') as { title?: string; date?: string }; setTitle(meta.title ?? 'Kế hoạch cuối tuần'); setDate(meta.date ?? ''); }, []);
  function saveMeta() { localStorage.setItem(PLAN_META_KEY, JSON.stringify({ title, date })); }
  function remove(id: string) {
    const next = items.filter((item) => item.id !== id);
    localStorage.setItem(PLAN_KEY, JSON.stringify(next));
    setItems(next);
  }
  return <main className="page-shell"><Link className="home-link" to="/explore">Khám phá</Link><p className="eyebrow">Wanderly Plan</p><h1>Kế hoạch của tôi</h1><form onSubmit={(event) => { event.preventDefault(); saveMeta(); }}><input value={title} onChange={(event) => setTitle(event.target.value)} aria-label="Tên kế hoạch" /><input type="date" value={date} onChange={(event) => setDate(event.target.value)} aria-label="Ngày kế hoạch" /><button type="submit">Lưu thông tin</button></form>{items.length === 0 ? <p>Chưa có địa điểm trong kế hoạch.</p> : <ol>{items.map((item, index) => <li key={item.id}><Link to={`/places/${item.slug}`}>{index + 1}. {item.name}</Link><button type="button" onClick={() => remove(item.id)}>Xóa</button></li>)}</ol>}</main>;
}
