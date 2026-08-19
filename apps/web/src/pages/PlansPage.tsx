import { fetchPlaceDetail, googleMapsItineraryUrl, type PlaceDetail, type RankedCandidate } from '@wanderly/contracts';
import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router';
import { estimatePlanBudget } from '../plan-budget';
import { buildBudgetWarning } from '../budget-warning';
import { cheaperReplacementCandidates } from '../budget-replacements';
import { validateDurations } from '../plan-duration';
import { DEFAULT_PLAN_META, parsePlanMeta } from '../plan-meta';
import { isOpenAt } from '../plan-opening-hours';
import { decodeSharedPlan, encodeSharedPlan } from '../plan-share';
import { buildRouteSummary } from '../plan-route';
import { parsePlanItems, sortPlanItems, type LocalPlanItem, type LocalPlanMeta } from '../plan-storage';
import { validateFinalPlan, type PlanValidationResult } from '../plan-validation';
import { detectWeatherConflicts, weatherIssues } from '../plan-weather';
import { fetchWeatherForecast } from '../weather-forecast';
import { weatherSuitableReplacements } from '../weather-replacements';
import { SmartReplacePanel } from '../components/SmartReplacePanel';
import { fetchReplacementCandidates } from '../replacement-candidates';
import { getReplacementSlotConstraints } from '../replacement-constraints';
import { previewReplacement, type ReplacementPreview } from '../replacement-preview';

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
  const [weatherLoading, setWeatherLoading] = useState(false);
  const [replacement, setReplacement] = useState<{ item: LocalPlanItem; candidates: RankedCandidate[]; loading: boolean; error: string } | null>(null);
  const [validation, setValidation] = useState<{ checked: boolean; result: PlanValidationResult }>({ checked: false, result: { valid: false, issues: [] } });

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

  async function openSmartReplace(item: LocalPlanItem) {
    const slot = getReplacementSlotConstraints(item.id, items, details, meta.endTime, meta.budget);
    if (!slot) {
      setMessage('Không thể xác định ràng buộc cho slot này.');
      return;
    }
    setReplacement({ item, candidates: [], loading: true, error: '' });
    try {
      const rankedCandidates = await fetchReplacementCandidates(API_URL, slot, meta.date, items.map(({ id }) => id));
      const hasWeatherConflict = detectWeatherConflicts(items, details, meta.weather).some(({ itemId }) => itemId === item.id);
      const weatherCandidates = hasWeatherConflict ? weatherSuitableReplacements(rankedCandidates, meta.weather) : rankedCandidates;
      const currentBudget = estimatePlanBudget(items, details, meta.budget);
      const candidates = currentBudget.exceededBy > 0
        ? cheaperReplacementCandidates(weatherCandidates, details[item.id]?.priceMin)
        : weatherCandidates;
      setReplacement({ item, candidates, loading: false, error: '' });
    } catch (error) {
      setReplacement({ item, candidates: [], loading: false, error: error instanceof Error ? error.message : 'Không thể tải địa điểm thay thế.' });
    }
  }

  function replacementPreview(candidate: RankedCandidate): ReplacementPreview | null {
    return replacement ? previewReplacement(replacement.item.id, candidate, items, details, meta.endTime, meta.budget) : null;
  }

  function confirmReplacement(preview: ReplacementPreview) {
    persistItems(preview.items);
    setReplacement(null);
    setMessage('Đã cập nhật địa điểm thay thế.');
  }

  const durationResult = validateDurations(
    items,
    Object.fromEntries(Object.entries(details).map(([id, place]) => [id, place.typicalDurationMinutes])),
    meta.endTime,
    Object.fromEntries(Object.entries(details).map(([id, place]) => [id, { latitude: place.latitude, longitude: place.longitude }])),
  );
  const budgetResult = estimatePlanBudget(items, details, meta.budget);
  const budgetWarning = buildBudgetWarning(budgetResult, budgetResult.limit, budgetResult.missing);
  const weatherWarnings = weatherIssues(items, details, meta.weather);

  function validatePlan() {
    const openingIssues = items.flatMap((item) => details[item.id] && isOpenAt(details[item.id]!.openingHours, meta.date, item.startTime) === false ? [`${item.name} nằm ngoài giờ mở cửa.`] : []);
    const budgetIssues = budgetResult.exceededBy > 0 ? [`Vượt ngân sách ${budgetResult.exceededBy.toLocaleString('vi-VN')}đ.`] : [];
    setValidation({
      checked: true,
      result: validateFinalPlan({
        title: meta.title,
        date: meta.date,
        endTime: meta.endTime,
        itemCount: items.length,
        loadedPlaceCount: Object.keys(details).length,
        groups: { openingHours: openingIssues, duration: durationResult.issues, budget: budgetIssues, weather: weatherWarnings },
      }),
    });
  }

  async function updateWeatherForecast() {
    const places = Object.values(details);
    if (!meta.date || places.length === 0) {
      setMessage('Hãy chọn ngày và thêm ít nhất một địa điểm trước khi lấy dự báo.');
      return;
    }
    const latitude = places.reduce((sum, place) => sum + place.latitude, 0) / places.length;
    const longitude = places.reduce((sum, place) => sum + place.longitude, 0) / places.length;
    setWeatherLoading(true);
    try {
      const forecast = await fetchWeatherForecast(API_URL, latitude, longitude, meta.date);
      setMeta((current) => ({ ...current, weather: forecast.weather }));
      setMessage(`Dự báo: ${forecast.maximumTemperature}°C, khả năng mưa ${forecast.precipitationProbability}%.`);
    } catch {
      setMessage('Không lấy được dự báo; bạn vẫn có thể chọn thời tiết thủ công.');
    } finally {
      setWeatherLoading(false);
    }
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
  const routeSummary = buildRouteSummary(routePlaces.map((place) => ({
    id: place.id,
    name: place.name,
    latitude: place.latitude,
    longitude: place.longitude,
  })));
  const mapUrl = googleMapsItineraryUrl(routePlaces.map(({ latitude, longitude }) => ({ latitude, longitude })));

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
          <button type="button" disabled={weatherLoading} onClick={() => void updateWeatherForecast()}>{weatherLoading ? 'Đang tải dự báo…' : 'Cập nhật dự báo'}</button>
          <button type="button" onClick={validatePlan}>Kiểm tra cuối cùng</button>
          <button type="button" onClick={() => void sharePlan()}>Chia sẻ</button>
          {message && <span role="status">{message}</span>}
        </form>
      )}
      {readOnly && <p>Đây là bản chụp chỉ đọc của lịch trình tại thời điểm được chia sẻ.</p>}
      {replacement && <SmartReplacePanel itemName={replacement.item.name} candidates={replacement.candidates} loading={replacement.loading} error={replacement.error} previewCandidate={replacementPreview} onConfirm={confirmReplacement} onClose={() => setReplacement(null)} />}
      {validation.checked && <section aria-label="Kết quả kiểm tra kế hoạch" role="status">{validation.result.valid ? <strong>Kế hoạch hợp lệ.</strong> : <><strong>Kế hoạch chưa hợp lệ.</strong><ul>{validation.result.issues.map((issue) => <li key={`${issue.category}:${issue.message}`}><span>{issue.category}</span>: {issue.message}</li>)}</ul></>}</section>}
      {items.length > 0 && <section aria-label="Kiểm tra thời lượng"><p>Tổng thời lượng dự kiến: {Math.floor(durationResult.totalMinutes / 60)} giờ {durationResult.totalMinutes % 60} phút (hoạt động {durationResult.activityMinutes} phút, di chuyển khoảng {durationResult.travelMinutes} phút).</p>{durationResult.issues.length > 0 && <ul>{durationResult.issues.map((issue) => <li key={issue}>{issue}</li>)}</ul>}</section>}
      {items.length > 0 && <section aria-label="Ước tính ngân sách"><h2>Chi tiết ngân sách</h2><ul>{budgetResult.lines.map((line) => <li key={`${line.type}:${line.label}`}>{line.label}: {line.amount.toLocaleString('vi-VN')}đ ({line.type})</li>)}</ul><p>Địa điểm: {budgetResult.byType.PLACE.toLocaleString('vi-VN')}đ · Ăn uống: {budgetResult.byType.FOOD.toLocaleString('vi-VN')}đ · Di chuyển: {budgetResult.byType.TRANSPORT.toLocaleString('vi-VN')}đ</p><p><strong>Tổng: {budgetResult.total.toLocaleString('vi-VN')}đ.</strong></p>{budgetWarning && <p role="alert" data-severity={budgetWarning.severity}><strong>{budgetWarning.message}</strong></p>}{budgetResult.missing.length > 0 && <p>Chưa có giá: {budgetResult.missing.join(', ')}.</p>}</section>}
      {weatherWarnings.length > 0 && <section aria-label="Cảnh báo thời tiết"><ul>{weatherWarnings.map((issue) => <li key={issue}>{issue}</li>)}</ul></section>}
      {routeSummary.points.length > 0 && (
        <section aria-label="Sơ đồ tuyến lịch trình">
          <h2>Tuyến lịch trình</h2>
          <p>Tổng khoảng cách đường chim bay: {routeSummary.totalDistanceKilometers.toFixed(1)} km.</p>
          <svg viewBox="0 0 640 280" role="img" aria-label="Các điểm và đường nối theo thứ tự timeline" style={{ width: '100%', maxWidth: 640, background: '#eef6f1', borderRadius: 16 }}>
            {routeSummary.points.length > 1 && <polyline points={routeSummary.points.map(({ x, y }) => `${x},${y}`).join(' ')} fill="none" stroke="currentColor" strokeWidth="4" />}
            {routeSummary.points.map((point, index) => <g key={point.id}><circle cx={point.x} cy={point.y} r="12" fill="#176b4d" /><text x={point.x} y={point.y + 4} textAnchor="middle" fill="white" fontSize="11">{index + 1}</text><text x={point.x} y={point.y - 18} textAnchor="middle" fontSize="12">{point.name}</text></g>)}
          </svg>
        </section>
      )}
      {mapUrl && <p><a className="home-link" href={mapUrl} target="_blank" rel="noreferrer">Mở toàn bộ tuyến đường trên Google Maps</a></p>}
      {items.length === 0 ? <p>Chưa có địa điểm trong kế hoạch.</p> : (
        <ol>{items.map((item) => {
          const open = details[item.id] ? isOpenAt(details[item.id]!.openingHours, meta.date, item.startTime) : null;
          return <li key={item.id}>{readOnly ? <time>{item.startTime}</time> : <input type="time" value={item.startTime} onChange={(event) => updateTime(item, event.target.value)} aria-label={`Giờ bắt đầu ${item.name}`} />} <Link to={`/places/${item.slug}`}>{item.name}</Link>{open === false && <strong> — Ngoài giờ mở cửa</strong>} {!readOnly && <><button type="button" onClick={() => void openSmartReplace(item)}>Thay thế</button><button type="button" onClick={() => persistItems(items.filter(({ id }) => id !== item.id))}>Xóa</button></>}</li>;
        })}</ol>
      )}
    </main>
  );
}
