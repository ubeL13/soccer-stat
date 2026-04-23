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
import { fetchTeams } from '../api';
import type { Team } from '../types';

export function TeamsPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const { data, loading, error } = useAsync(() => fetchTeams(), []);

  const filtered = useMemo(() => {
    if (!data) return [];
    const query = search.toLowerCase();
    return data.teams.filter((t) => t.name.toLowerCase().includes(query));
  }, [data, search]);

  const { page, totalPages, currentItems, handlePageChange, reset } = usePagination<Team>(filtered);

  const handleSearch = (value: string) => {
    setSearch(value);
    reset();
  };

  return (
    <PageLayout>
      <SearchField value={search} onChange={handleSearch} placeholder="Поиск команды..." />

      {loading && <LoadingGrid count={8} />}
      {error && <ErrorMessage message={error} />}

      {!loading && !error && (
        <>
          <Grid container spacing={2}>
            {currentItems.map((team) => (
              <Grid size={{ xs: 6, sm: 4, md: 3 }} key={team.id}>
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
                    onClick={() => navigate(`/teams/${team.id}`)}
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
                        {team.crest ? (
                          <Box
                            component="img"
                            src={team.crest}
                            alt={team.name}
                            sx={{ maxWidth: 80, maxHeight: 80, objectFit: 'contain' }}
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = 'none';
                            }}
                          />
                        ) : (
                          <Avatar sx={{ width: 60, height: 60, bgcolor: 'primary.light' }}>
                            {team.name[0]}
                          </Avatar>
                        )}
                      </Box>
                      <Typography variant="body2" sx={{ fontWeight: 600, textAlign: 'center' }}>
                        {team.name}
                      </Typography>
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
