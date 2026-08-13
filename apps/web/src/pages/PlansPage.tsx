import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router';

const PLAN_KEY = 'wanderly:current-plan';
type PlanItem = { id: string; slug: string; name: string };
type SharedPlan = { title: string; date: string; budget: string; items: PlanItem[] };

function readItems(): PlanItem[] {
  try {
    const value: unknown = JSON.parse(localStorage.getItem(PLAN_KEY) ?? '[]');
    return Array.isArray(value)
      ? value.filter((item): item is PlanItem =>
          Boolean(item && typeof item.id === 'string' && typeof item.slug === 'string' && typeof item.name === 'string'),
        )
      : [];
  } catch {
    return [];
  }
}

export function PlansPage() {
  const [searchParams] = useSearchParams();
  const sharedPlan = useMemo<SharedPlan | null>(() => {
    const raw = searchParams.get('shared');
    if (!raw) return null;
    try {
      const value = JSON.parse(raw) as Partial<SharedPlan>;
      if (typeof value.title !== 'string' || !Array.isArray(value.items)) return null;
      return { title: value.title, date: value.date ?? '', budget: value.budget ?? '', items: value.items };
    } catch {
      return null;
    }
  }, [searchParams]);
  const readOnly = sharedPlan !== null;
  const [items, setItems] = useState<PlanItem[]>(sharedPlan?.items ?? []);
  const [title, setTitle] = useState(sharedPlan?.title ?? 'Kế hoạch cuối tuần');
  const [date, setDate] = useState(sharedPlan?.date ?? '');
  const [budget, setBudget] = useState(sharedPlan?.budget ?? '');
  const [shareMessage, setShareMessage] = useState('');

  useEffect(() => {
    if (!readOnly) setItems(readItems());
  }, [readOnly]);

  function persist(next: PlanItem[]) {
    localStorage.setItem(PLAN_KEY, JSON.stringify(next));
    setItems(next);
  }

  function move(index: number, direction: -1 | 1) {
    const target = index + direction;
    if (target < 0 || target >= items.length) return;
    const next = [...items];
    const currentItem = next[index];
    const targetItem = next[target];
    if (!currentItem || !targetItem) return;
    next[index] = targetItem;
    next[target] = currentItem;
    persist(next);
  }

  async function sharePlan() {
    const url = new URL(window.location.href);
    url.search = '';
    url.searchParams.set('shared', JSON.stringify({ title, date, budget, items } satisfies SharedPlan));
    try {
      if (navigator.share) await navigator.share({ title, url: url.toString() });
      else {
        await navigator.clipboard.writeText(url.toString());
        setShareMessage('Đã sao chép liên kết chỉ đọc.');
      }
    } catch {
      setShareMessage('Chia sẻ đã bị hủy.');
    }
  }

  return (
    <main className="page-shell">
      <Link className="home-link" to="/explore">Khám phá</Link>
      <p className="eyebrow">{readOnly ? 'Shared Wanderly Plan' : 'Wanderly Plan'}</p>
      <h1>{title}</h1>
      {!readOnly && (
        <form onSubmit={(event) => event.preventDefault()}>
          <input value={title} onChange={(event) => setTitle(event.target.value)} aria-label="Tên kế hoạch" />
          <input type="date" value={date} onChange={(event) => setDate(event.target.value)} aria-label="Ngày kế hoạch" />
          <input type="number" min="0" value={budget} onChange={(event) => setBudget(event.target.value)} placeholder="Ngân sách (VND)" aria-label="Ngân sách" />
          <button type="button" onClick={() => void sharePlan()}>Chia sẻ kế hoạch</button>
          {shareMessage && <span role="status">{shareMessage}</span>}
        </form>
      )}
      {date && <p>Ngày: {date}</p>}
      {budget && <p>Ngân sách: {Number(budget).toLocaleString('vi-VN')}đ</p>}
      {items.length === 0 ? <p>Chưa có địa điểm trong kế hoạch.</p> : (
        <ol>
          {items.map((item, index) => (
            <li key={item.id}>
              {!readOnly && <><button type="button" onClick={() => move(index, -1)} disabled={index === 0}>↑</button><button type="button" onClick={() => move(index, 1)} disabled={index === items.length - 1}>↓</button></>}
              {' '}<Link to={`/places/${item.slug}`}>{item.name}</Link>{' '}
              {!readOnly && <button type="button" onClick={() => persist(items.filter(({ id }) => id !== item.id))}>Xóa</button>}
            </li>
          ))}
        </ol>
      )}
    </main>
  );
}
