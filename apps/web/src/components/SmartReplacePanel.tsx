import type { RankedCandidate } from '@wanderly/contracts';
import { useState } from 'react';
import type { ReplacementPreview } from '../replacement-preview';

type Props = {
  itemName: string;
  candidates: RankedCandidate[];
  loading: boolean;
  error: string;
  previewCandidate: (candidate: RankedCandidate) => ReplacementPreview | null;
  onConfirm: (preview: ReplacementPreview) => void;
  onClose: () => void;
};

export function SmartReplacePanel({ itemName, candidates, loading, error, previewCandidate, onConfirm, onClose }: Props) {
  const [selected, setSelected] = useState<RankedCandidate | null>(null);
  const preview = selected ? previewCandidate(selected) : null;

  return (
    <section role="dialog" aria-modal="true" aria-labelledby="smart-replace-title">
      <h2 id="smart-replace-title">Thay thế {itemName}</h2>
      <button type="button" onClick={onClose} aria-label="Đóng Smart Replace">Đóng</button>
      {loading && <p role="status">Đang tìm địa điểm phù hợp…</p>}
      {error && <p role="alert">{error}</p>}
      {!loading && !error && candidates.length === 0 && <p>Không có địa điểm thay thế phù hợp.</p>}
      {candidates.length > 0 && (
        <ul>
          {candidates.map((candidate) => (
            <li key={candidate.place.id}>
              <button type="button" aria-pressed={selected?.place.id === candidate.place.id} onClick={() => setSelected(candidate)}>
                <strong>{candidate.place.name}</strong> — {(candidate.score * 100).toFixed(0)}% phù hợp
              </button>
              <p>{candidate.reason}</p>
            </li>
          ))}
        </ul>
      )}
      {preview && (
        <section aria-label="Tác động thay thế">
          <h3>Preview tác động</h3>
          <p>Ngân sách: {preview.budgetTotal.toLocaleString('vi-VN')}đ ({preview.impact.budgetDelta >= 0 ? '+' : ''}{preview.impact.budgetDelta.toLocaleString('vi-VN')}đ).</p>
          <p>Thời lượng: {preview.durationMinutes} phút ({preview.impact.durationMinutesDelta >= 0 ? '+' : ''}{preview.impact.durationMinutesDelta} phút).</p>
          <p>Quãng đường: {preview.routeKilometers.toFixed(1)} km ({preview.impact.routeKilometersDelta >= 0 ? '+' : ''}{preview.impact.routeKilometersDelta.toFixed(1)} km).</p>
          {preview.issues.length > 0 && <ul>{preview.issues.map((issue) => <li key={issue}>{issue}</li>)}</ul>}
          <button type="button" disabled={!preview.valid} onClick={() => onConfirm(preview)}>Xác nhận thay thế</button>
        </section>
      )}
    </section>
  );
}
