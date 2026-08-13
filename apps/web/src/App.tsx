import { Route, Routes } from 'react-router';
import { HomePage } from './pages/HomePage';
import { ExplorePage } from './pages/ExplorePage';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/explore" element={<ExplorePage />} />
    </Routes>
  );
}
