import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import type { Dayjs } from 'dayjs';

interface DateRangeFilterProps {
  dateFrom: Dayjs | null;
  dateTo: Dayjs | null;
  onDateFromChange: (date: Dayjs | null) => void;
  onDateToChange: (date: Dayjs | null) => void;
}

export function DateRangeFilter({
  dateFrom,
  dateTo,
  onDateFromChange,
  onDateToChange,
}: DateRangeFilterProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: isMobile ? 'flex-start' : 'center',
        flexDirection: isMobile ? 'column' : 'row',
        gap: 1.5,
        mb: 3,
      }}
    >
      <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: 'nowrap' }}>
        Матчи с
      </Typography>
      <DatePicker
        value={dateFrom}
        onChange={onDateFromChange}
        maxDate={dateTo ?? undefined}
        slotProps={{
          textField: {
            size: 'small',
            sx: { backgroundColor: '#fff', width: isMobile ? '100%' : 180 },
          },
        }}
        format="DD.MM.YYYY"
      />
      <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: 'nowrap' }}>
        по
      </Typography>
      <DatePicker
        value={dateTo}
        onChange={onDateToChange}
        minDate={dateFrom ?? undefined}
        slotProps={{
          textField: {
            size: 'small',
            sx: { backgroundColor: '#fff', width: isMobile ? '100%' : 180 },
          },
        }}
        format="DD.MM.YYYY"
      />
    </Box>
  );
}
