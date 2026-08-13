import { Route, Routes } from 'react-router';
import { HomePage } from './pages/HomePage';
import { ExplorePage } from './pages/ExplorePage';
import { PlaceDetailPage } from './pages/PlaceDetailPage';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/explore" element={<ExplorePage />} />
      <Route path="/places/:slug" element={<PlaceDetailPage />} />
    </Routes>
  );
}
