import { Box, Pagination } from '@mui/material';

interface AppPaginationProps {
  page: number;
  count: number;
  onChange: (event: React.ChangeEvent<unknown>, value: number) => void;
}

export function AppPagination({ page, count, onChange }: AppPaginationProps) {
  if (count <= 1) return null;

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
      <Pagination
        page={page}
        count={count}
        onChange={onChange}
        color="primary"
        shape="rounded"
        showFirstButton
        showLastButton
      />
    </Box>
  );
}
