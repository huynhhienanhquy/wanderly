import { Navigate, Route, Routes } from 'react-router';
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
import { PreferenceOnboardingPage } from './pages/PreferenceOnboardingPage';
import { ConstraintConfirmationPage } from './pages/ConstraintConfirmationPage';
import { AuthGuard } from './components/AuthGuard';
import { routes } from './routes';

export function App() {
  return (
    <Routes>
      <Route path={routes.home} element={<HomePage />} />
      <Route path={routes.explore} element={<ExplorePage />} />
      <Route path={routes.place} element={<PlaceDetailPage />} />
      <Route path={routes.collections} element={<CollectionsPage />} />
      <Route path={routes.favorites} element={<AuthGuard><FavoritesPage /></AuthGuard>} />
      <Route path={routes.adminReports} element={<AdminGuard><AdminReportsPage /></AdminGuard>} />
      <Route path={routes.plans} element={<PlansPage />} />
      <Route path={routes.register} element={<RegisterPage />} />
      <Route path={routes.login} element={<LoginPage />} />
      <Route path={routes.logout} element={<LogoutPage />} />
      <Route path={routes.forgotPassword} element={<ForgotPasswordPage />} />
      <Route path={routes.resetPassword} element={<ResetPasswordPage />} />
      <Route path={routes.profile} element={<AuthGuard><ProfilePage /></AuthGuard>} />
      <Route path={routes.preferences} element={<AuthGuard><PreferenceOnboardingPage /></AuthGuard>} />
      <Route path={routes.newPlan} element={<ConstraintConfirmationPage />} />
      <Route path="*" element={<Navigate to={routes.home} replace />} />
    </Routes>
  );
}
