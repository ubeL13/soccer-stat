import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import { PageLayout } from '../components/layout/PageLayout';
import { SearchField, ErrorMessage, LoadingGrid, AppPagination } from '../components/common';
import { useAsync, usePagination } from '../hooks';
import { fetchCompetitions } from '../api';
import type { Competition } from '../types';

export function LeaguesPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const { data, loading, error } = useAsync(() => fetchCompetitions(), []);

  const filtered = useMemo(() => {
    if (!data) return [];
    const query = search.toLowerCase();
    return data.competitions.filter(
      (c) => c.name.toLowerCase().includes(query) || c.area.name.toLowerCase().includes(query),
    );
  }, [data, search]);

  const { page, totalPages, currentItems, handlePageChange, reset } =
    usePagination<Competition>(filtered);

  const handleSearch = (value: string) => {
    setSearch(value);
    reset();
  };

  return (
    <PageLayout>
      <SearchField value={search} onChange={handleSearch} placeholder="Поиск лиги..." />

      {loading && <LoadingGrid count={8} />}
      {error && <ErrorMessage message={error} />}

      {!loading && !error && (
        <>
          <Grid container spacing={2}>
            {currentItems.map((competition) => (
              <Grid size={{ xs: 6, sm: 4, md: 3 }} key={competition.id}>
                <Card
                  elevation={0}
                  sx={{
                    border: '1px solid',
                    borderColor: 'divider',
                    height: '100%',
                    transition: 'box-shadow 0.2s',
                    '&:hover': { boxShadow: 3 },
                  }}
                >
                  <CardActionArea
                    onClick={() => navigate(`/leagues/${competition.id}`)}
                    sx={{ height: '100%' }}
                  >
                    <CardContent
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 1.5,
                        p: 2,
                      }}
                    >
                      <Box
                        sx={{
                          width: 80,
                          height: 80,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        {competition.emblem ? (
                          <Box
                            component="img"
                            src={competition.emblem}
                            alt={competition.name}
                            sx={{ maxWidth: 80, maxHeight: 80, objectFit: 'contain' }}
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = 'none';
                            }}
                          />
                        ) : (
                          <Avatar sx={{ width: 60, height: 60, bgcolor: 'primary.light' }}>
                            {competition.name[0]}
                          </Avatar>
                        )}
                      </Box>
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="body2" sx={{ fontWeight: 600 }} gutterBottom>
                          {competition.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {competition.area.name}
                        </Typography>
                      </Box>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>

          {filtered.length === 0 && !loading && (
            <Box sx={{ textAlign: 'center', py: 6 }}>
              <Typography color="text.secondary">Ничего не найдено</Typography>
            </Box>
          )}

          <AppPagination page={page} count={totalPages} onChange={handlePageChange} />
        </>
      )}
    </PageLayout>
  );
}
