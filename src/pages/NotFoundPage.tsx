import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { PageLayout } from '../components/layout/PageLayout';

export function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <PageLayout>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          py: 10,
          gap: 2,
        }}
      >
        <Typography variant="h1" color="primary" sx={{ fontWeight: 700 }}>
          404
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Страница не найдена
        </Typography>
        <Button variant="contained" onClick={() => navigate('/leagues')}>
          На главную
        </Button>
      </Box>
    </PageLayout>
  );
}
