import { Route, Routes } from 'react-router';
import { HomePage } from './pages/HomePage';
import { ExplorePage } from './pages/ExplorePage';
import { PlaceDetailPage } from './pages/PlaceDetailPage';
import { CollectionsPage } from './pages/CollectionsPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { AdminReportsPage } from './pages/AdminReportsPage';
import { AdminGuard } from './components/AdminGuard';
import { PlansPage } from './pages/PlansPage';
import { LoginPage } from './pages/LoginPage';
import { LogoutPage } from './pages/LogoutPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { ResetPasswordPage } from './pages/ResetPasswordPage';
import { ProfilePage } from './pages/ProfilePage';
import { RegisterPage } from './pages/RegisterPage';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/explore" element={<ExplorePage />} />
      <Route path="/places/:slug" element={<PlaceDetailPage />} />
      <Route path="/collections" element={<CollectionsPage />} />
      <Route path="/favorites" element={<FavoritesPage />} />
      <Route path="/admin/reports" element={<AdminGuard><AdminReportsPage /></AdminGuard>} />
      <Route path="/plans" element={<PlansPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/logout" element={<LogoutPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route path="/profile" element={<ProfilePage />} />
    </Routes>
  );
}
