import { useState, useMemo } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Box, CircularProgress, Paper } from '@mui/material';
import type { Dayjs } from 'dayjs';
import { PageLayout } from '../components/layout/PageLayout';
import {
  Breadcrumbs,
  ErrorMessage,
  DateRangeFilter,
  MatchesTable,
  AppPagination,
} from '../components/common';
import { useAsync, usePagination } from '../hooks';
import { fetchCompetitionMatches } from '../api';
import { toApiDate, isValidDateRange } from '../utils';
import type { Match } from '../types';

const MATCHES_PER_PAGE = 10;

export function LeagueCalendarPage() {
  const { id } = useParams<{ id: string }>();
  const competitionId = Number(id);
  const isValidId = Number.isFinite(competitionId) && competitionId > 0;

  const [dateFrom, setDateFrom] = useState<Dayjs | null>(null);
  const [dateTo, setDateTo] = useState<Dayjs | null>(null);

  const apiParams = useMemo(() => {
    if (isValidDateRange(dateFrom, dateTo)) {
      return { dateFrom: toApiDate(dateFrom!), dateTo: toApiDate(dateTo!) };
    }
    return undefined;
  }, [dateFrom, dateTo]);

  const { data, loading, error } = useAsync(
    () => fetchCompetitionMatches(competitionId, apiParams),
    [competitionId, apiParams],
  );

  const { page, totalPages, currentItems, handlePageChange, reset } = usePagination<Match>(
    data?.matches ?? [],
    MATCHES_PER_PAGE,
  );

  const competitionName = data?.competition?.name ?? data?.matches[0]?.competition?.name ?? 'Лига';

  const handleDateFromChange = (date: Dayjs | null) => {
    setDateFrom(date);
    reset();
  };

  const handleDateToChange = (date: Dayjs | null) => {
    setDateTo(date);
    reset();
  };

  if (!isValidId) return <Navigate to="/leagues" replace />;

  return (
    <PageLayout>
      <Breadcrumbs items={[{ label: 'Лиги', href: '/leagues' }, { label: competitionName }]} />

      <DateRangeFilter
        dateFrom={dateFrom}
        dateTo={dateTo}
        onDateFromChange={handleDateFromChange}
        onDateToChange={handleDateToChange}
      />

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
          <CircularProgress />
        </Box>
      )}

      {error && <ErrorMessage message={error} />}

      {!loading && !error && (
        <>
          <Paper
            elevation={0}
            sx={{ border: '1px solid', borderColor: 'divider', overflow: 'hidden' }}
          >
            <MatchesTable matches={currentItems} />
          </Paper>
          <AppPagination page={page} count={totalPages} onChange={handlePageChange} />
        </>
      )}
    </PageLayout>
  );
}
