import { fetchPlaceDetail, type PlaceDetail } from '@wanderly/contracts';
import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router';
import { estimatePlanBudget } from '../plan-budget';
import { validateDurations } from '../plan-duration';
import { DEFAULT_PLAN_META, parsePlanMeta } from '../plan-meta';
import { isOpenAt } from '../plan-opening-hours';
import { decodeSharedPlan, encodeSharedPlan } from '../plan-share';
import { parsePlanItems, sortPlanItems, type LocalPlanItem, type LocalPlanMeta } from '../plan-storage';
import { finalPlanIssues } from '../plan-validation';
import { weatherIssues } from '../plan-weather';

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:4000';
const PLAN_KEY = 'wanderly:current-plan';
const META_KEY = 'wanderly:plan-meta';
export function PlansPage() {
  const [searchParams] = useSearchParams();
  const sharedPlan = useMemo(() => decodeSharedPlan(searchParams.get('shared')), [searchParams]);
  const readOnly = sharedPlan !== null;
  const [items, setItems] = useState<LocalPlanItem[]>([]);
  const [details, setDetails] = useState<Record<string, PlaceDetail>>({});
  const [meta, setMeta] = useState<LocalPlanMeta>(DEFAULT_PLAN_META);
  const [message, setMessage] = useState('');
  const [validation, setValidation] = useState<{ checked: boolean; issues: string[] }>({ checked: false, issues: [] });

  useEffect(() => {
    if (sharedPlan) {
      setItems(sortPlanItems(sharedPlan.items));
      setMeta(sharedPlan.meta);
      return;
    }

    setItems(sortPlanItems(parsePlanItems(localStorage.getItem(PLAN_KEY))));
    setMeta(parsePlanMeta(localStorage.getItem(META_KEY)));
  }, [sharedPlan]);

  useEffect(() => {
    void Promise.all(items.map((item) => fetchPlaceDetail(API_URL, item.slug).catch(() => null))).then((places) =>
      setDetails(Object.fromEntries(places.filter((place): place is PlaceDetail => place !== null).map((place) => [place.id, place]))),
    );
  }, [items]);

  function persistItems(next: LocalPlanItem[]) {
    const sorted = sortPlanItems(next);
    localStorage.setItem(PLAN_KEY, JSON.stringify(sorted));
    setItems(sorted);
  }

  function saveMeta() {
    localStorage.setItem(META_KEY, JSON.stringify(meta));
    setMessage('Đã lưu thông tin kế hoạch.');
  }

  function updateTime(item: LocalPlanItem, startTime: string) {
    const detail = details[item.id];
    if (detail && isOpenAt(detail.openingHours, meta.date, startTime) === false) {
      setMessage(`${item.name} không mở cửa vào giờ đã chọn.`);
      return;
    }
    persistItems(items.map((current) => current.id === item.id ? { ...current, startTime } : current));
    setMessage('');
  }

  const durationResult = validateDurations(
    items,
    Object.fromEntries(Object.entries(details).map(([id, place]) => [id, place.typicalDurationMinutes])),
    meta.endTime,
    Object.fromEntries(Object.entries(details).map(([id, place]) => [id, { latitude: place.latitude, longitude: place.longitude }])),
  );
  const budgetResult = estimatePlanBudget(items, details, meta.budget);
  const weatherWarnings = weatherIssues(items, details, meta.weather);

  function validatePlan() {
    const openingIssues = items.flatMap((item) => details[item.id] && isOpenAt(details[item.id]!.openingHours, meta.date, item.startTime) === false ? [`${item.name} nằm ngoài giờ mở cửa.`] : []);
    const budgetIssues = budgetResult.exceededBy > 0 ? [`Vượt ngân sách ${budgetResult.exceededBy.toLocaleString('vi-VN')}đ.`] : [];
    setValidation({ checked: true, issues: finalPlanIssues([openingIssues, durationResult.issues, budgetIssues, weatherWarnings], items.length) });
  }

  async function sharePlan() {
    const url = new URL(window.location.href);
    url.search = '';
    url.searchParams.set('shared', encodeSharedPlan({ meta, items }));
    const shareData = { title: meta.title, text: `Lịch trình ${meta.title}`, url: url.toString() };
    const canShare = typeof navigator.share === 'function';
    try {
      if (canShare) await navigator.share(shareData);
      else await navigator.clipboard.writeText(shareData.url);
      setMessage(canShare ? 'Đã mở bảng chia sẻ.' : 'Đã sao chép liên kết chia sẻ.');
    } catch {
      setMessage('Không thể chia sẻ kế hoạch lúc này.');
    }
  }

  const routePlaces = items.map((item) => details[item.id]).filter((place): place is PlaceDetail => Boolean(place));
  const mapUrl = routePlaces.length > 0
    ? `https://www.google.com/maps/dir/${routePlaces.map((place) => `${place.latitude},${place.longitude}`).join('/')}`
    : null;

  return (
    <main className="page-shell">
      <Link className="home-link" to="/explore">Khám phá</Link>
      <p className="eyebrow">{readOnly ? 'Lịch trình Wanderly được chia sẻ' : 'Wanderly Planner'}</p>
      <h1>{meta.title}</h1>
      {!readOnly && (
        <form onSubmit={(event) => { event.preventDefault(); saveMeta(); }}>
          <input value={meta.title} onChange={(event) => setMeta({ ...meta, title: event.target.value })} aria-label="Tên kế hoạch" required />
          <input type="date" value={meta.date} onChange={(event) => setMeta({ ...meta, date: event.target.value })} aria-label="Ngày kế hoạch" />
          <input type="time" value={meta.endTime} onChange={(event) => setMeta({ ...meta, endTime: event.target.value })} aria-label="Giờ kết thúc" />
          <input type="number" min="0" value={meta.budget} onChange={(event) => setMeta({ ...meta, budget: event.target.value })} aria-label="Ngân sách" placeholder="Ngân sách (VND)" />
          <select value={meta.weather} onChange={(event) => setMeta({ ...meta, weather: event.target.value as LocalPlanMeta['weather'] })} aria-label="Thời tiết">
            <option value="CLEAR">Trời quang</option><option value="RAIN">Mưa</option><option value="HEAT">Nắng nóng</option>
          </select>
          <button type="submit">Lưu</button>
          <button type="button" onClick={validatePlan}>Kiểm tra cuối cùng</button>
          <button type="button" onClick={() => void sharePlan()}>Chia sẻ</button>
          {message && <span role="status">{message}</span>}
        </form>
      )}
      {readOnly && <p>Đây là bản chụp chỉ đọc của lịch trình tại thời điểm được chia sẻ.</p>}
      {validation.checked && <section aria-label="Kết quả kiểm tra kế hoạch" role="status">{validation.issues.length === 0 ? <strong>Kế hoạch hợp lệ.</strong> : <><strong>Kế hoạch chưa hợp lệ.</strong><ul>{validation.issues.map((issue) => <li key={issue}>{issue}</li>)}</ul></>}</section>}
      {items.length > 0 && <section aria-label="Kiểm tra thời lượng"><p>Tổng thời lượng dự kiến: {Math.floor(durationResult.totalMinutes / 60)} giờ {durationResult.totalMinutes % 60} phút (hoạt động {durationResult.activityMinutes} phút, di chuyển khoảng {durationResult.travelMinutes} phút).</p>{durationResult.issues.length > 0 && <ul>{durationResult.issues.map((issue) => <li key={issue}>{issue}</li>)}</ul>}</section>}
      {items.length > 0 && <section aria-label="Ước tính ngân sách"><p>Chi phí tối thiểu: {budgetResult.total.toLocaleString('vi-VN')}đ.</p>{budgetResult.exceededBy > 0 && <strong>Vượt ngân sách {budgetResult.exceededBy.toLocaleString('vi-VN')}đ.</strong>}{budgetResult.missing.length > 0 && <p>Chưa có giá: {budgetResult.missing.join(', ')}.</p>}</section>}
      {weatherWarnings.length > 0 && <section aria-label="Cảnh báo thời tiết"><ul>{weatherWarnings.map((issue) => <li key={issue}>{issue}</li>)}</ul></section>}
      {mapUrl && <p><a className="home-link" href={mapUrl} target="_blank" rel="noreferrer">Mở toàn bộ tuyến đường trên Google Maps</a></p>}
      {items.length === 0 ? <p>Chưa có địa điểm trong kế hoạch.</p> : (
        <ol>{items.map((item) => {
          const open = details[item.id] ? isOpenAt(details[item.id]!.openingHours, meta.date, item.startTime) : null;
          return <li key={item.id}>{readOnly ? <time>{item.startTime}</time> : <input type="time" value={item.startTime} onChange={(event) => updateTime(item, event.target.value)} aria-label={`Giờ bắt đầu ${item.name}`} />} <Link to={`/places/${item.slug}`}>{item.name}</Link>{open === false && <strong> — Ngoài giờ mở cửa</strong>} {!readOnly && <button type="button" onClick={() => persistItems(items.filter(({ id }) => id !== item.id))}>Xóa</button>}</li>;
        })}</ol>
      )}
    </main>
  );
}
