import { useCallback, useEffect, useState, type FormEvent } from 'react';
import { Link } from 'react-router';
import { createAdminCategory, createAdminEvent, createAdminPlace, deleteAdminResource, fetchAdminCategories, fetchAdminEvents, fetchAdminPlaces, fetchAdminUsers, updateAdminUserStatus, type AdminCategory, type AdminEvent, type AdminPlace, type AdminUser } from '../admin-api';
import { getAccessToken } from '../auth-session';
import { webConfig } from '../app-config';
import { routes } from '../routes';

const parseJson = (value: FormDataEntryValue | null) => JSON.parse(String(value ?? '{}')) as unknown;

export function AdminDashboardPage() {
  const token = getAccessToken(sessionStorage) ?? '';
  const [places, setPlaces] = useState<AdminPlace[]>([]);
  const [categories, setCategories] = useState<AdminCategory[]>([]);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [events, setEvents] = useState<AdminEvent[]>([]);
  const [message, setMessage] = useState('');
  const load = useCallback(async () => {
    try {
      const [nextPlaces, nextCategories, nextUsers, nextEvents] = await Promise.all([
        fetchAdminPlaces(webConfig.apiUrl, token), fetchAdminCategories(webConfig.apiUrl, token),
        fetchAdminUsers(webConfig.apiUrl, token), fetchAdminEvents(webConfig.apiUrl, token),
      ]);
      setPlaces(nextPlaces); setCategories(nextCategories); setUsers(nextUsers); setEvents(nextEvents);
    } catch (error) { setMessage(error instanceof Error ? error.message : 'Không tải được dữ liệu.'); }
  }, [token]);
  useEffect(() => { void load(); }, [load]);

  async function submit(event: FormEvent<HTMLFormElement>, kind: 'category' | 'place' | 'event') {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    try {
      if (kind === 'category') await createAdminCategory(webConfig.apiUrl, token, { slug: String(data.get('slug')), name: String(data.get('name')) });
      if (kind === 'place') await createAdminPlace(webConfig.apiUrl, token, parseJson(data.get('json')));
      if (kind === 'event') await createAdminEvent(webConfig.apiUrl, token, parseJson(data.get('json')));
      event.currentTarget.reset(); setMessage('Đã lưu dữ liệu quản trị.'); await load();
    } catch (error) { setMessage(error instanceof Error ? error.message : 'Dữ liệu không hợp lệ.'); }
  }

  async function remove(path: string) { await deleteAdminResource(webConfig.apiUrl, token, path); await load(); }

  return <main className="page-shell"><p className="eyebrow">Wanderly Admin</p><h1>Quản trị nội dung</h1>
    <nav><Link to={routes.adminReports}>Báo cáo review</Link> · <Link to={routes.home}>Trang chủ</Link></nav>
    {message && <p role="status">{message}</p>}
    <section className="detail-section"><h2>Danh mục</h2><form onSubmit={(event) => void submit(event, 'category')}><input name="slug" placeholder="slug" required /><input name="name" placeholder="Tên" required /><button>Thêm</button></form><ul>{categories.map((item) => <li key={item.id}>{item.name} <button onClick={() => void remove(`/admin/catalog/categories/${item.id}`)}>Ẩn</button></li>)}</ul></section>
    <section className="detail-section"><h2>Địa điểm</h2><form onSubmit={(event) => void submit(event, 'place')}><textarea name="json" aria-label="Place JSON" placeholder='{"name":"...","slug":"..."}' required /><button>Thêm địa điểm</button></form><ul>{places.map((item) => <li key={item.id}>{item.name} <button onClick={() => void remove(`/admin/catalog/places/${item.id}`)}>Xóa</button></li>)}</ul></section>
    <section className="detail-section"><h2>Sự kiện</h2><form onSubmit={(event) => void submit(event, 'event')}><textarea name="json" aria-label="Event JSON" placeholder='{"title":"..."}' required /><button>Thêm sự kiện</button></form><ul>{events.map((item) => <li key={item.id}>{item.title} ({item.status}) <button onClick={() => void remove(`/events/${item.id}`)}>Xóa</button></li>)}</ul></section>
    <section className="detail-section"><h2>Người dùng</h2><ul>{users.map((user) => <li key={user.id}>{user.profile?.displayName ?? user.email} — {user.role}/{user.status} <button onClick={() => void updateAdminUserStatus(webConfig.apiUrl, token, user.id, user.status === 'ACTIVE' ? 'LOCKED' : 'ACTIVE').then(load)}>{user.status === 'ACTIVE' ? 'Khóa' : 'Mở khóa'}</button></li>)}</ul></section>
  </main>;
}
