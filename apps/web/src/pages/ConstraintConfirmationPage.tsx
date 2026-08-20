import { useState } from 'react';
import { useNavigate } from 'react-router';
import type { PlanningConstraints } from '@wanderly/contracts';
import { extractPlanningConstraints, generatePlanCandidates } from '../ai-api';
import { webConfig } from '../app-config';
import { candidatesToPlan } from '../ai-plan';
import { routes } from '../routes';

export function ConstraintConfirmationPage() {
  const navigate = useNavigate();
  const [input, setInput] = useState('');
  const [constraints, setConstraints] = useState<PlanningConstraints | null>(null);
  const [messages, setMessages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  async function extract() {
    try {
      setLoading(true);
      const result = await extractPlanningConstraints(webConfig.apiUrl, input);
      setConstraints(result.constraints);
      setMessages([...result.warnings, ...result.missingFields.map((field) => `Cần xác nhận: ${field}`)]);
    } catch (error) { setMessages([error instanceof Error ? error.message : 'Không thể phân tích yêu cầu.']); }
    finally { setLoading(false); }
  }

  async function confirm() {
    if (!constraints) return;
    try {
      setLoading(true);
      const candidates = await generatePlanCandidates(webConfig.apiUrl, constraints);
      const plan = candidatesToPlan(candidates);
      if (plan.length === 0) throw new Error('Không tìm thấy địa điểm phù hợp với yêu cầu.');
      sessionStorage.setItem('wanderly:confirmed-constraints', JSON.stringify(constraints));
      localStorage.setItem('wanderly:current-plan', JSON.stringify(plan));
      navigate(routes.plans);
    } catch (error) {
      setMessages([error instanceof Error ? error.message : 'Không thể tạo kế hoạch.']);
    } finally {
      setLoading(false);
    }
  }

  return <main className="page-shell"><p className="eyebrow">Wanderly AI Planner</p><h1>Mô tả chuyến đi của bạn</h1>
    <textarea value={input} onChange={(event) => setInput(event.target.value)} maxLength={2000} placeholder="Ví dụ: Chiều mai 2 người đi cafe và ăn tối, ngân sách 1 triệu" />
    <button type="button" disabled={loading || input.trim().length < 3} onClick={() => void extract()}>{loading ? 'Đang phân tích…' : 'Phân tích yêu cầu'}</button>
    {messages.length > 0 && <ul role="status">{messages.map((message) => <li key={message}>{message}</li>)}</ul>}
    {constraints && <section className="detail-section"><h2>Xác nhận thông tin</h2>
      <label>Số người <input type="number" min="1" value={constraints.peopleCount} onChange={(event) => setConstraints({ ...constraints, peopleCount: Number(event.target.value) })} /></label>
      <label>Ngân sách <input type="number" min="0" value={constraints.budget ?? ''} onChange={(event) => setConstraints({ ...constraints, budget: event.target.value ? Number(event.target.value) : null })} /></label>
      <label>Sở thích <input value={constraints.interests.join(', ')} onChange={(event) => setConstraints({ ...constraints, interests: event.target.value.split(',').map((item) => item.trim()).filter(Boolean) })} /></label>
      <button type="button" disabled={loading} onClick={() => void confirm()}>Xác nhận và tạo kế hoạch</button>
    </section>}
  </main>;
}
