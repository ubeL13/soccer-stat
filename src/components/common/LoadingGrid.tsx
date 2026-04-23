import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
import Card from '@mui/material/Card';

interface LoadingGridProps {
  count?: number;
}

export function LoadingGrid({ count = 8 }: LoadingGridProps) {
  return (
    <Grid container spacing={2}>
      {Array.from({ length: count }).map((_, i) => (
        <Grid size={{ xs: 6, sm: 4, md: 3 }} key={i}>
          <Card sx={{ p: 2, textAlign: 'center' }}>
            <Skeleton variant="rectangular" height={80} sx={{ mb: 1, borderRadius: 1 }} />
            <Skeleton variant="text" width="70%" sx={{ mx: 'auto' }} />
            <Skeleton variant="text" width="50%" sx={{ mx: 'auto' }} />
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
