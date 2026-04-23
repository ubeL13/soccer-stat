import { Routes, Route, Navigate } from 'react-router-dom';
import { AppHeader } from '../components/layout/AppHeader';
import {
  LeaguesPage,
  LeagueCalendarPage,
  TeamsPage,
  TeamCalendarPage,
  NotFoundPage,
} from '../pages';

export function AppRouter() {
  return (
    <>
      <AppHeader />
      <Routes>
        <Route path="/" element={<Navigate to="/leagues" replace />} />
        <Route path="/leagues" element={<LeaguesPage />} />
        <Route path="/leagues/:id" element={<LeagueCalendarPage />} />
        <Route path="/teams" element={<TeamsPage />} />
        <Route path="/teams/:id" element={<TeamCalendarPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}
