import type { MatchStatus, Score } from '../types';

const STATUS_LABELS: Record<MatchStatus, string> = {
  SCHEDULED: 'Запланирован',
  LIVE: 'В прямом эфире',
  IN_PLAY: 'В игре',
  PAUSED: 'Пауза',
  FINISHED: 'Завершён',
  POSTPONED: 'Отложен',
  SUSPENDED: 'Приостановлен',
  CANCELLED: 'Отменён',
  CANCELED: 'Отменён',
};

export function getStatusLabel(status: MatchStatus): string {
  return STATUS_LABELS[status] ?? status;
}

export function formatScore(score: Score | null | undefined): string {
  if (!score) return '—';

  const { fullTime, extraTime, penalties } = score;

  const ft =
    fullTime?.home !== null &&
    fullTime?.home !== undefined &&
    fullTime?.away !== null &&
    fullTime?.away !== undefined
      ? `${fullTime.home}:${fullTime.away}`
      : null;

  const et =
    extraTime?.home !== null &&
    extraTime?.home !== undefined &&
    extraTime?.away !== null &&
    extraTime?.away !== undefined
      ? `(${extraTime.home}:${extraTime.away})`
      : null;

  const pen =
    penalties?.home !== null &&
    penalties?.home !== undefined &&
    penalties?.away !== null &&
    penalties?.away !== undefined
      ? `[${penalties.home}:${penalties.away}]`
      : null;

  const parts = [ft, et, pen].filter(Boolean);
  return parts.length > 0 ? parts.join(' ') : '—';
}
