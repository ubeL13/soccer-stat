import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Chip,
  Box,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import type { Match, MatchStatus } from '../../types';
import { formatMatchDate, formatMatchTime, getStatusLabel, formatScore } from '../../utils';

const STATUS_COLORS: Partial<
  Record<MatchStatus, 'success' | 'error' | 'warning' | 'default' | 'primary'>
> = {
  FINISHED: 'default',
  LIVE: 'error',
  IN_PLAY: 'success',
  SCHEDULED: 'primary',
  POSTPONED: 'warning',
  CANCELLED: 'default',
  CANCELED: 'default',
};

interface MatchesTableProps {
  matches: Match[];
}

export function MatchesTable({ matches }: MatchesTableProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  if (matches.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 6 }}>
        <Typography color="text.secondary">Матчи не найдены</Typography>
      </Box>
    );
  }

  return (
    <TableContainer
      component={Paper}
      elevation={0}
      sx={{ border: '1px solid', borderColor: 'divider' }}
    >
      <Table size={isMobile ? 'small' : 'medium'}>
        <TableBody>
          {matches.map((match) => (
            <TableRow key={match.id} hover>
              <TableCell sx={{ width: isMobile ? 80 : 110, fontWeight: 500, whiteSpace: 'nowrap' }}>
                {formatMatchDate(match.utcDate)}
              </TableCell>
              <TableCell sx={{ width: 60, color: 'text.secondary' }}>
                {formatMatchTime(match.utcDate)}
              </TableCell>
              <TableCell sx={{ width: isMobile ? 90 : 140 }}>
                <Chip
                  label={getStatusLabel(match.status)}
                  size="small"
                  color={STATUS_COLORS[match.status] ?? 'default'}
                  variant="outlined"
                  sx={{ fontSize: isMobile ? '0.65rem' : '0.75rem' }}
                />
              </TableCell>
              <TableCell>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {match.homeTeam.name} — {match.awayTeam.name}
                </Typography>
              </TableCell>
              {!isMobile && (
                <TableCell
                  align="right"
                  sx={{ fontFamily: 'monospace', fontWeight: 600, whiteSpace: 'nowrap' }}
                >
                  {formatScore(match.score)}
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
