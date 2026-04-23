export interface Area {
  id: number;
  name: string;
  code: string;
  flag: string | null;
}

export interface Competition {
  id: number;
  name: string;
  code: string;
  type: string;
  emblem: string | null;
  area: Area;
}

export interface CompetitionsResponse {
  count: number;
  competitions: Competition[];
}

export interface Team {
  id: number;
  name: string;
  shortName?: string;
  tla?: string;
  crest: string | null;
  area?: Area;
}

export interface TeamsResponse {
  count: number;
  teams: Team[];
}

export interface ScoreDetail {
  home: number | null;
  away: number | null;
}

export interface Score {
  fullTime: ScoreDetail;
  extraTime: ScoreDetail;
  penalties: ScoreDetail;
}

export type MatchStatus =
  | 'SCHEDULED'
  | 'LIVE'
  | 'IN_PLAY'
  | 'PAUSED'
  | 'FINISHED'
  | 'POSTPONED'
  | 'SUSPENDED'
  | 'CANCELLED'
  | 'CANCELED';

export interface MatchTeam {
  id: number;
  name: string;
  shortName: string;
  tla: string;
  crest: string | null;
}

export interface Match {
  id: number;
  utcDate: string;
  status: MatchStatus;
  matchday: number | null;
  stage: string;
  homeTeam: MatchTeam;
  awayTeam: MatchTeam;
  score: Score;
  competition: Competition;
}

export interface MatchesResponse {
  count: number;
  competition?: Competition;
  matches: Match[];
}

export interface ApiError {
  message: string;
  errorCode?: number;
}
